/* Multiplayer (v0): presença por polling em /api/rpg/presence.
   Botão "Online" na barra do topo → escolhe nome + personagem → você aparece no mapa dos outros
   (andando, de carro ou de helicóptero) e vê quem está online. Se a API não responde (jogo fora do
   portfólio), o botão não aparece. Lê o estado do jogo pelas globais de index.html (playerPos, pilot, …). */
(() => {
  const bar = document.getElementById('quick-actions');
  if (!bar || !window.CITY) return;
  const API = '/api/rpg/presence', POLL_MS = 700;
  const CHARS = [['joao', 'João'], ['kauan', 'Kauan'], ['fernando', 'Fernando'], ['vargas', 'Vargas'], ['felipe', 'Felipe']];
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };
  const sid = (() => { let s = store.get('rpg-sid'); if (!s) { s = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now()); store.set('rpg-sid', s); } return s; })();
  const me = { name: store.get('rpg-name') || '', ch: store.get('rpg-char') || 'joao' };
  let online = false, timer = null, inflight = false, count = 1;
  const remotes = new Map();
  const post = (body, extra) => fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), ...extra });

  const css = document.createElement('style');
  css.textContent = `
  .mp-label { position:absolute; transform:translate(-50%,-100%); font:700 10px/1 var(--mono, monospace); color:#fff; background:rgba(8,12,20,.78); border:1px solid rgba(255,255,255,.18); padding:3px 6px; border-radius:6px; white-space:nowrap; pointer-events:none; letter-spacing:.04em; }
  #worldPan .mp-char { position:absolute; width:60px; height:72px; transform:translate(-50%,-91.67%); pointer-events:none; }
  #mp-modal { position:fixed; inset:0; z-index:100000; display:none; align-items:center; justify-content:center; background:rgba(4,8,14,.72); backdrop-filter:blur(4px); }
  #mp-modal.on { display:flex; }
  #mp-box { width:min(460px,92vw); background:#0b111b; border:1px solid rgba(255,230,0,.35); border-radius:14px; padding:22px; color:#dfe7f1; font-family:var(--mono, monospace); }
  #mp-box h3 { margin:0 0 4px; color:var(--accent,#FFE600); font-size:16px; letter-spacing:.06em; }
  #mp-box p { margin:0 0 14px; font-size:11px; color:#8794a6; line-height:1.5; }
  #mp-name { width:100%; box-sizing:border-box; padding:10px 12px; border-radius:8px; border:1px solid rgba(255,255,255,.18); background:#05080e; color:#fff; font:inherit; font-size:13px; margin-bottom:14px; }
  #mp-chars { display:grid; grid-template-columns:repeat(5,1fr); gap:8px; margin-bottom:16px; }
  .mp-pick { border:1px solid rgba(255,255,255,.14); border-radius:10px; background:#0f1724; padding:6px 2px 4px; cursor:pointer; text-align:center; color:#9fb0c3; font:700 9px var(--mono, monospace); }
  .mp-pick canvas { width:48px; height:57px; display:block; margin:0 auto 3px; }
  .mp-pick.sel { border-color:var(--accent,#FFE600); color:#fff; background:#1a2234; }
  #mp-actions { display:flex; gap:8px; justify-content:flex-end; }
  #mp-actions button { all:unset; cursor:pointer; padding:9px 14px; border-radius:8px; font:700 11px var(--mono, monospace); letter-spacing:.08em; }
  #mp-go { background:var(--accent,#FFE600); color:#000; }
  #mp-cancel { color:#9fb0c3; border:1px solid rgba(255,255,255,.18); }`;
  document.head.appendChild(css);

  /* ── button (inserted once the API answers) ── */
  const btn = document.createElement('button');
  btn.className = 'qa-btn'; btn.type = 'button';
  const GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg>';
  const paintBtn = () => {
    btn.innerHTML = `${GLOBE}<span>${online ? count + ' online' : 'Online'}</span>`;
    btn.style.color = online ? '#00ff88' : '';
    btn.title = online ? 'Sair do modo online' : 'Jogar online com outras pessoas';
  };
  paintBtn();
  btn.addEventListener('click', () => (online ? leave() : openModal()));
  const sep = document.createElement('i'); sep.className = 'qa-sep';
  post({ sid, leave: true }).then(r => { if (r.ok) { bar.insertBefore(btn, bar.firstChild); bar.insertBefore(sep, btn.nextSibling); } }).catch(() => {});

  /* ── join modal ── */
  const modal = document.createElement('div'); modal.id = 'mp-modal';
  modal.innerHTML = `<div id="mp-box"><h3>JOGAR ONLINE</h3><p>Escolha um nome e um personagem. Quem estiver online no mesmo momento aparece no mapa — a pé, de carro ou de helicóptero.</p>
    <input id="mp-name" maxlength="16" placeholder="Seu nome" autocomplete="off"><div id="mp-chars"></div>
    <div id="mp-actions"><button id="mp-cancel" type="button">CANCELAR</button><button id="mp-go" type="button">ENTRAR</button></div></div>`;
  document.body.appendChild(modal);
  const nameIn = modal.querySelector('#mp-name'), charsEl = modal.querySelector('#mp-chars');
  // typing a name must not walk the player around
  for (const t of ['keydown', 'keyup']) nameIn.addEventListener(t, e => e.stopPropagation());
  function openModal() {
    const G = CITY.getGL();
    if (!G?.personFrame) { alert('O modo online precisa de WebGL (modelos 3D carregados). Tente de novo em alguns segundos.'); return; }
    nameIn.value = me.name; charsEl.innerHTML = '';
    for (const [id, label] of CHARS) {
      const d = document.createElement('div'); d.className = 'mp-pick' + (id === me.ch ? ' sel' : '');
      const cv = document.createElement('canvas'); cv.width = 60 * G.DPR; cv.height = 72 * G.DPR;
      cv.getContext('2d').drawImage(G.personFrame(id, Math.PI / 4, -1), 0, 0, cv.width, cv.height);
      d.append(cv, label); charsEl.appendChild(d);
      d.addEventListener('click', () => { me.ch = id; charsEl.querySelectorAll('.mp-pick').forEach(x => x.classList.toggle('sel', x === d)); });
    }
    modal.classList.add('on'); setTimeout(() => nameIn.focus(), 30);
  }
  modal.querySelector('#mp-cancel').addEventListener('click', () => modal.classList.remove('on'));
  modal.querySelector('#mp-go').addEventListener('click', () => {
    me.name = nameIn.value.replace(/[^\p{L}\p{N} ._-]/gu, '').trim().slice(0, 16) || 'Visitante';
    store.set('rpg-name', me.name); store.set('rpg-char', me.ch);
    modal.classList.remove('on'); join();
  });

  /* ── online loop ── */
  function join() {
    online = true; window.MP_CHAR = me.ch; count = 1;
    CHARS_3D = true; playerKey = '';              // everybody is drawn as a 3D character while online
    paintBtn(); tick(); timer = setInterval(tick, POLL_MS);
    showToast('ONLINE · VOCÊ É ' + me.name.toUpperCase(), 'city');
  }
  function leave() {
    online = false; clearInterval(timer); timer = null;
    for (const r of remotes.values()) dispose(r);
    remotes.clear(); count = 1; paintBtn();
    post({ sid, leave: true }, { keepalive: true }).catch(() => {});
  }
  addEventListener('pagehide', () => { if (online) navigator.sendBeacon?.(API, new Blob([JSON.stringify({ sid, leave: true })], { type: 'application/json' })); });

  function myState() {
    if (pilot) return { m: 'h', a: heli.angle, h: heli.h };
    if (drivingCar) return { m: 'c', model: drivingCar.model || null, color: drivingCar.color, special: !!drivingCar.special, a: drivingCar.angle, st: drivingCar.steer || 0 };
    return { m: 'w', d: spriteDir, mv: moving };
  }
  async function tick() {
    if (!online || inflight || document.hidden) return;
    inflight = true;
    try {
      const r = await post({ sid, name: me.name, ch: me.ch, x: playerPos.x, y: playerPos.y, s: myState() });
      if (!r.ok) throw 0;
      const d = await r.json(); count = d.count; paintBtn(); sync(d.players);
    } catch { /* keep the last picture; try again next tick */ }
    inflight = false;
  }

  /* ── remote players ── */
  function makeEl(r) {
    const G = CITY.getGL();
    if (r.m === 'w') {
      const cv = document.createElement('canvas'); cv.className = 'mp-char'; cv.width = Math.round(60 * G.DPR); cv.height = Math.round(72 * G.DPR);
      r.el = cv; r.canvas = cv;
    } else {
      const div = document.createElement('div'); div.className = 'obj gl ' + (r.m === 'h' ? 'heli' : 'car');
      div.style.cssText = 'position:absolute;width:260px;height:170px;pointer-events:none';
      const cv = document.createElement('canvas'); cv.className = 'veh-canvas'; cv.width = Math.round(G.W * G.DPR); cv.height = Math.round(G.H * G.DPR);
      div.appendChild(cv); r.el = div; r.canvas = cv;
      r.fake = { el: { classList: { contains: c => c === 'spinning' && r.m === 'h' } }, canvas: cv, angle: 0, steer: 0, speed: 0, wheelRot: 0, vx: 0, vy: 0 };
    }
    r.label = document.createElement('div'); r.label.className = 'mp-label'; r.label.textContent = r.name;
    worldPanEl.append(r.el, r.label); r.drawnKey = '';
  }
  function dispose(r) { r.el?.remove(); r.label?.remove(); }
  function sync(list) {
    const seen = new Set();
    for (const p of list) {
      seen.add(p.id);
      let r = remotes.get(p.id);
      if (r && r.m !== p.s.m) { dispose(r); remotes.delete(p.id); r = null; }
      if (!r) {
        r = { id: p.id, m: p.s.m, x: p.x, y: p.y, a: p.s.a || 0, name: p.name, ch: p.ch };
        makeEl(r); remotes.set(p.id, r);
        showToast(p.name.toUpperCase() + ' ENTROU', 'city');
      }
      r.tx = p.x; r.ty = p.y; r.s = p.s; r.ta = p.s.a || 0; r.ch = p.ch;
      if (r.name !== p.name) { r.name = p.name; r.label.textContent = p.name; }
    }
    for (const [id, r] of remotes) if (!seen.has(id)) { dispose(r); remotes.delete(id); }
  }

  // the garage's GLB models load on demand; ask for them as soon as someone shows up in a car
  const modelsReady = () => { const g = window.JOPES_GARAGE; if (!g) return false; g.loadModels?.(); return (g.traffic?.() || []).length > 0; };
  const angDiff = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));
  let last = performance.now();
  window.MP = {
    frame(now) {
      if (!online || !remotes.size) { last = now; return; }
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      const k = 1 - Math.exp(-9 * dt), G = CITY.getGL();
      for (const r of remotes.values()) {
        const moved = Math.hypot(r.tx - r.x, r.ty - r.y);
        r.x += (r.tx - r.x) * k; r.y += (r.ty - r.y) * k;
        r.a += angDiff(r.a, r.ta) * k;
        r.label.style.left = r.x + 'px';
        if (r.m === 'w') {
          const frame = (r.s.mv || moved > 2) ? Math.floor(now / 125) % 6 : -1;
          const dirKey = r.s.d || 'south', key = r.ch + ':' + dirKey + ':' + frame;
          if (key !== r.drawnKey) {
            r.drawnKey = key;
            const c = r.canvas.getContext('2d'); c.clearRect(0, 0, r.canvas.width, r.canvas.height);
            c.drawImage(G.personFrame(r.ch, dirAngle(dirKey), frame), 0, 0, r.canvas.width, r.canvas.height);
          }
          r.el.style.left = r.x + 'px'; r.el.style.top = r.y + 'px'; r.el.style.zIndex = spriteDepth(r.x, r.y, null);
          r.label.style.top = (r.y - 80) + 'px'; r.label.style.zIndex = r.el.style.zIndex;
        } else if (r.m === 'c') {
          const f = r.fake, st = r.s.st || 0;
          const ready = !!r.s.model && modelsReady();   // real models are downloaded lazily: until then draw the plain car
          const key = Math.round(r.a * 20) + ':' + Math.round(st * 8) + ':' + r.s.model + r.s.color + ready;
          if (key !== r.drawnKey) {
            r.drawnKey = key;
            Object.assign(f, { angle: r.a, steer: st, model: ready ? r.s.model : undefined, color: r.s.color || '#2AFADF', special: r.s.special });
            try { G.drawCar(f); } catch { f.model = undefined; try { G.drawCar(f); } catch {} }
          }
          r.el.style.left = (r.x - 130) + 'px'; r.el.style.top = (r.y - 95) + 'px'; r.el.style.zIndex = Math.round(r.y);
          r.label.style.top = (r.y - 60) + 'px'; r.label.style.zIndex = Math.round(r.y) + 1;
        } else {
          const f = r.fake, h = r.s.h || 0; f.angle = r.a; G.drawHeli(f);
          r.el.style.left = (r.x - 130) + 'px'; r.el.style.top = (r.y - h - 95) + 'px'; r.el.style.zIndex = 90000 + Math.round(r.y);
          r.label.style.top = (r.y - h - 70) + 'px'; r.label.style.zIndex = 90001 + Math.round(r.y);
        }
      }
    },
  };
})();
