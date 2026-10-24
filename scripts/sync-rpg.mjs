// Copia o jogo (JOPES.EXE) do repositório ../jopes-rpg para public/rpg e aplica
// os ajustes de quando ele roda dentro do portfólio:
//  • botão de curtir + contador de acessos (public/rpg/likes.js, via /api/site/*)
//  • botão "← SÉRIO" (volta pro modo sério via /api/mode)
//  • links "ver no portfólio" relativos ao próprio site
// O conteúdo (assets/portfolio/data.json) é gerado no build por scripts/generate-rpg-content.ts.
// Uso: npm run sync:rpg [-- caminho/para/jopes-rpg]
import { readFileSync, writeFileSync, existsSync, rmSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(process.argv[2] || resolve(root, '../jopes-rpg'));
const out = resolve(root, 'public/rpg');
if (!existsSync(resolve(src, 'index.html'))) throw new Error(`sync-rpg: não achei o jogo em ${src}`);

const skip = (p) => ['.DS_Store', '.git', '.github', '.vercel', '.claude', 'scripts', 'README.md', '.gitignore'].includes(basename(p));
// copia arquivo a arquivo (sobrescreve no lugar, sem apagar nada)
const copy = (a, b) => {
  if (skip(a)) return;
  if (statSync(a).isDirectory()) { mkdirSync(b, { recursive: true }); for (const n of readdirSync(a)) copy(resolve(a, n), resolve(b, n)); }
  else writeFileSync(b, readFileSync(a));
};
for (const f of ['index.html', 'city.js', 'vehicles.js', 'world3d.js', 'cars', 'cv', 'assets']) copy(resolve(src, f), resolve(out, f));
try { rmSync(resolve(out, 'content.json'), { force: true }); } catch {}   // formato do jogo antigo

const idx = resolve(out, 'index.html');
let html = readFileSync(idx, 'utf8');
const anchor = '<div id="quick-actions" class="glass">';
if (!html.includes(anchor)) throw new Error('sync-rpg: barra de ações rápidas não encontrada no index.html');
html = html.replace(anchor, `${anchor}
  <a id="serious-mode-link" class="qa-btn" href="/api/mode?mode=serious" title="Voltar pro portfólio sério" style="text-decoration:none">← Sério</a>
  <i class="qa-sep"></i>`);
html = html.replaceAll('https://jopes.com.br/pt/projects/', '/pt/projects/');
// curtida + contador de acessos (likes.js fica em public/rpg e não é sobrescrito pela cópia)
if (!html.includes('likes.js')) html = html.replace('</body>', '<script src="likes.js"></script></body>');
if (!html.includes('multiplayer.js')) html = html.replace('<script src="likes.js"></script>', '<script src="multiplayer.js"></script><script src="likes.js"></script>');
writeFileSync(idx, html);
console.log(`✓ jogo copiado de ${src} para public/rpg`);
