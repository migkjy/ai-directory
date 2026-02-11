import { Pool } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();
    const userAgent = req.headers.get('user-agent') || '';
    const referrer = req.headers.get('referer') || '';

    if (/bot|crawler|spider|slurp|googlebot|bingbot/i.test(userAgent)) {
      return NextResponse.json({ ok: true });
    }

    await pool.query(
      'INSERT INTO page_views (site, path, user_agent, referrer) VALUES ($1, $2, $3, $4)',
      ['directory', path || '/', userAgent, referrer]
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
