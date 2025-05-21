import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function middleware(_req: NextRequest, _ev: NextFetchEvent) {
  const res = NextResponse.next();

  res.headers.set(
    'Access-Control-Allow-Origin',
    'https://xmc-sourceved15434-jsitecorexmc413-dev0494.sitecorecloud.io'
  );
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return res;
}
/* eslint-enable @typescript-eslint/no-unused-vars */
