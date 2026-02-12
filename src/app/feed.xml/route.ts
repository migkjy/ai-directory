import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const BASE_URL = "https://ai-directory-seven.vercel.app";

export async function GET() {
  const { rows } = await pool.query(
    `SELECT name, slug, short_description, description, category, created_at
     FROM ai_tools
     WHERE published = true
     ORDER BY created_at DESC
     LIMIT 20`
  );

  const items = rows
    .map(
      (tool: {
        name: string;
        slug: string;
        short_description: string | null;
        description: string;
        category: string;
        created_at: string;
      }) => `    <item>
      <title><![CDATA[${tool.name}]]></title>
      <link>${BASE_URL}/tools/${tool.slug}</link>
      <description><![CDATA[${tool.short_description || tool.description}]]></description>
      <category>${tool.category}</category>
      <pubDate>${new Date(tool.created_at).toUTCString()}</pubDate>
      <guid>${BASE_URL}/tools/${tool.slug}</guid>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI AppPro - AI 도구 디렉토리</title>
    <link>${BASE_URL}</link>
    <description>소상공인과 중소기업을 위한 AI 도구 가이드. 최신 AI 도구를 확인하세요.</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
