import { NextRequest, NextResponse } from 'next/server';

const MODE_COOKIE = 'portfolio_mode';
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get('mode');

  if (mode !== 'serious' && mode !== 'rpg') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const destination = mode === 'rpg' ? '/rpg/index.html' : '/pt';
  const response = NextResponse.redirect(new URL(destination, request.url));
  response.cookies.set(MODE_COOKIE, mode, {
    maxAge: ONE_YEAR,
    path: '/',
  });
  return response;
}
