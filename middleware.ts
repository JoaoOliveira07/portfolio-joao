import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n/request';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'always'
});

const MODE_COOKIE = 'portfolio_mode';

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const mode = request.cookies.get(MODE_COOKIE)?.value;
    if (mode === 'rpg') {
      return NextResponse.redirect(new URL('/rpg/index.html', request.url));
    }
    // sem escolha salva: abre direto no portfólio (o modo RPG fica em destaque no topo da home)
    return intlMiddleware(request);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*']
};
