// ─────────────────────────────────────────────────────────────────────────────
// proxy.js — password gate for the weekly dashboard
//
// WHERE THIS GOES: the repo ROOT, alongside package.json. Not in app/,
// not in app/components/. Next.js only looks for this file at the root.
//
// FILENAME MATTERS: on Next.js 16+ the convention is proxy.js with an exported
// function named `proxy`. The older middleware.js / `middleware` name is
// ignored at build time with NO error — the site deploys and the gate silently
// never runs. If a middleware.js still exists in this repo, delete it.
//
// CREDENTIALS: set DASH_USER and DASH_PASSWORD in
// Vercel → Project → Settings → Environment Variables
// (check Production, Preview, AND Development). Changing them requires a
// redeploy to take effect.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server';

export function proxy(req) {
  const user = process.env.DASH_USER;
  const pass = process.env.DASH_PASSWORD;

  // Fail closed. If the env vars are missing, lock the site rather than
  // letting everyone through — a misconfiguration should be loud, not silent.
  if (!user || !pass) {
    return new NextResponse(
      'Dashboard auth is not configured. Set DASH_USER and DASH_PASSWORD in Vercel.',
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const auth = req.headers.get('authorization');

  if (auth?.startsWith('Basic ')) {
    let decoded = '';
    try {
      decoded = atob(auth.slice(6));
    } catch {
      decoded = ''; // malformed base64 — fall through to the 401
    }

    // Split on the FIRST colon only, so passwords may contain colons.
    const i = decoded.indexOf(':');
    if (i !== -1) {
      const givenUser = decoded.slice(0, i);
      const givenPass = decoded.slice(i + 1);
      if (givenUser === user && givenPass === pass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Weekly Dashboard"',
      'Cache-Control': 'no-store',
    },
  });
}

// Gate everything.
//
// Deliberately no exclusion list. The usual templates exclude _next/static,
// favicon.ico, etc., but dashboard_data.json is served from public/ at the site
// root — one loose pattern and the entire dataset stays publicly readable even
// though the page itself prompts for a password. Gating all paths costs
// nothing here: the browser resends the auth header automatically on every
// same-origin request.
export const config = {
  matcher: ['/(.*)'],
};
