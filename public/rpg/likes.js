/* Curtida + contador de acessos do projeto (usa /api/site/* do portfólio).
   Entra na barra de ações rápidas; se a API não responde (jogo rodando fora do portfólio), não aparece. */
(() => {
  const bar = document.getElementById('quick-actions');
  if (!bar) return;
  let counted = false; try { counted = sessionStorage.getItem('rpg-visit-counted') === '1'; } catch {}
  const first = counted ? fetch('/api/site/stats') : fetch('/api/site/visit?source=rpg', { method: 'POST' });
  first.then(r => { if (!r.ok) throw 0; try { sessionStorage.setItem('rpg-visit-counted', '1'); } catch {} return r.json(); }).then(init).catch(() => {});

  function init(stats) {
    const heart = on => `<svg viewBox="0 0 24 24" fill="${on ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 21s-7-4.6-9.3-9.1C1 8.4 3 5 6.4 5c2 0 3.6 1.1 4.6 2.7h2C14 6.1 15.6 5 17.6 5 21 5 23 8.4 21.3 11.9 19 16.4 12 21 12 21z"/></svg>`;
    const sep = document.createElement('i'); sep.className = 'qa-sep';
    const btn = document.createElement('button'); btn.className = 'qa-btn'; btn.type = 'button';
    const views = document.createElement('span'); views.className = 'qa-btn'; views.style.cursor = 'default'; views.title = 'Acessos';
    const paint = () => {
      btn.innerHTML = `${heart(stats.liked)}<span>${stats.likes}</span>`;
      btn.style.color = stats.liked ? '#ff5c8a' : '';
      btn.title = stats.liked ? 'Remover curtida' : 'Curtir o projeto';
      btn.setAttribute('aria-pressed', stats.liked);
      views.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg><span>${stats.visits}</span>`;
    };
    let busy = false;
    btn.addEventListener('click', async () => {
      if (busy) return; busy = true;
      const prev = { ...stats };
      stats.liked = !stats.liked; stats.likes += stats.liked ? 1 : -1; paint();
      try { const r = await fetch('/api/site/like', { method: 'POST' }); if (!r.ok) throw 0; stats = await r.json(); }
      catch { stats = prev; }
      busy = false; paint();
    });
    paint();
    bar.append(sep, btn, views);
  }
})();
