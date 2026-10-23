import { redirect } from 'next/navigation';

// A tela de escolha saiu: o site abre direto no portfólio e o modo RPG fica em destaque
// no topo da home. Links antigos para /gate continuam funcionando.
export default function GatePage() {
  redirect('/');
}
