/**
 * AI Directory Auto-Crawler
 *
 * Sources:
 * 1. Product Hunt RSS — daily new launches (AI-filtered)
 * 2. MarkTechPost RSS — AI/ML news with tool mentions
 * 3. DailyAI RSS — AI industry news and tool launches
 *
 * Flow: Fetch RSS → Filter AI tools → Deduplicate → Categorize → INSERT
 */

import "dotenv/config";
import RssParser from "rss-parser";
import { neon } from "@neondatabase/serverless";

// ── Config ──────────────────────────────────────────────────────────────────

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("[CRAWL] DATABASE_URL is not set. Check .env.local");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const rssParser = new RssParser();

// AI-related keywords for filtering Product Hunt items
const AI_KEYWORDS = [
  "ai",
  "artificial intelligence",
  "machine learning",
  "gpt",
  "llm",
  "chatbot",
  "generative",
  "neural",
  "deep learning",
  "nlp",
  "computer vision",
  "text-to",
  "speech-to",
  "image generat",
  "voice ai",
  "ai agent",
  "ai assistant",
  "ai-powered",
  "copilot",
  "automation ai",
];

// Category mapping based on description keywords
const CATEGORY_RULES: { keywords: string[]; category: string }[] = [
  {
    keywords: [
      "write",
      "writing",
      "copywriting",
      "blog",
      "content creat",
      "text generat",
      "essay",
      "article",
      "grammar",
      "translate",
      "translation",
    ],
    category: "writing",
  },
  {
    keywords: [
      "image",
      "photo",
      "design",
      "illustration",
      "graphic",
      "logo",
      "art generat",
      "visual",
      "picture",
      "draw",
    ],
    category: "image",
  },
  {
    keywords: [
      "code",
      "coding",
      "developer",
      "programming",
      "debug",
      "ide",
      "software develop",
      "github",
      "api",
      "devtool",
    ],
    category: "coding",
  },
  {
    keywords: [
      "marketing",
      "seo",
      "advertis",
      "social media",
      "email market",
      "campaign",
      "brand",
      "ads",
      "lead gen",
      "newsletter",
    ],
    category: "marketing",
  },
  {
    keywords: [
      "video",
      "film",
      "clip",
      "editing video",
      "animation",
      "avatar",
      "deepfake",
      "text-to-video",
      "subtitle",
    ],
    category: "video",
  },
  {
    keywords: [
      "audio",
      "voice",
      "speech",
      "music",
      "podcast",
      "tts",
      "text-to-speech",
      "sound",
      "transcri",
      "song",
    ],
    category: "audio",
  },
  {
    keywords: [
      "productiv",
      "workflow",
      "automat",
      "task",
      "schedul",
      "note",
      "meeting",
      "calendar",
      "email",
      "organiz",
    ],
    category: "productivity",
  },
  {
    keywords: [
      "data",
      "analytics",
      "dashboard",
      "spreadsheet",
      "chart",
      "visualiz",
      "insight",
      "report",
      "bi ",
      "database",
    ],
    category: "data",
  },
  {
    keywords: [
      "learn",
      "education",
      "tutor",
      "course",
      "study",
      "quiz",
      "language learn",
      "teach",
      "student",
      "school",
    ],
    category: "education",
  },
  {
    keywords: [
      "customer",
      "support",
      "chatbot",
      "helpdesk",
      "ticket",
      "crm",
      "live chat",
      "service desk",
      "conversational",
    ],
    category: "customer_service",
  },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface CrawledTool {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category: string;
  pricing_type: string;
  url: string;
  tags: string[];
  source: string;
}

interface CrawlStats {
  source: string;
  fetched: number;
  ai_filtered: number;
  duplicates: number;
  inserted: number;
  errors: string[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function isAiRelated(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();
  return AI_KEYWORDS.some((kw) => text.includes(kw));
}

function categorize(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => text.includes(kw))) {
      return rule.category;
    }
  }
  return "productivity"; // default
}

function extractTags(title: string, description: string): string[] {
  const tags: string[] = ["AI"];
  const text = `${title} ${description}`.toLowerCase();
  if (text.includes("free") || text.includes("무료")) tags.push("무료");
  if (text.includes("open source") || text.includes("오픈소스"))
    tags.push("오픈소스");
  if (text.includes("api")) tags.push("API");
  if (text.includes("no-code") || text.includes("nocode"))
    tags.push("노코드");
  if (text.includes("saas")) tags.push("SaaS");
  return tags;
}

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + "...";
}

/** Filter out news articles — only keep actual tool/product names */
function looksLikeToolName(title: string): boolean {
  // Article-like patterns (reject)
  const articlePatterns = [
    /^(how|why|what|when|who|where|the|a |an |is |are |was |were |will |can |could |should |would |did |do |does )/i,
    /\?$/,
    /\d{4}/,  // years in title
    /(says|report|study|research|announce|launch|reveal|update|news|trend|threat|rights|declare|speak|attend|murder|replica)/i,
    /['"\u201C\u201D]/,  // quotes
    /\.\.\./,  // ellipsis
  ];
  if (title.length > 60) return false;
  if (title.split(" ").length > 8) return false;
  return !articlePatterns.some((p) => p.test(title));
}

// ── Source: Product Hunt RSS ────────────────────────────────────────────────

async function fetchProductHunt(): Promise<CrawledTool[]> {
  console.log("[PH] Fetching Product Hunt RSS...");
  const tools: CrawledTool[] = [];

  try {
    const feed = await rssParser.parseURL("https://www.producthunt.com/feed");
    console.log(`[PH] Got ${feed.items.length} items`);

    for (const item of feed.items) {
      const title = item.title?.trim() || "";
      const desc = item.contentSnippet?.trim() || item.content?.trim() || "";
      const link = item.link || "";

      if (!title || !isAiRelated(title, desc)) continue;

      tools.push({
        name: title,
        slug: slugify(title),
        description: truncate(desc, 500) || `${title} — AI-powered tool from Product Hunt.`,
        short_description: truncate(desc, 120) || `${title} — AI tool.`,
        category: categorize(title, desc),
        pricing_type: "freemium",
        url: link,
        tags: extractTags(title, desc),
        source: "producthunt",
      });
    }
  } catch (err) {
    console.error(
      "[PH] Error:",
      err instanceof Error ? err.message : err
    );
  }

  console.log(`[PH] Found ${tools.length} AI-related tools`);
  return tools;
}

// ── Source: MarkTechPost RSS (AI/ML news with tool mentions) ─────────────────

async function fetchMarkTechPost(): Promise<CrawledTool[]> {
  console.log("[MTP] Fetching MarkTechPost RSS...");
  const tools: CrawledTool[] = [];

  try {
    const feed = await rssParser.parseURL("https://www.marktechpost.com/feed/");
    console.log(`[MTP] Got ${feed.items.length} items`);

    for (const item of feed.items) {
      const title = item.title?.trim() || "";
      const desc = item.contentSnippet?.trim() || item.content?.trim() || "";
      const link = item.link || "";

      if (!title || !isAiRelated(title, desc)) continue;
      if (!looksLikeToolName(title)) continue;

      tools.push({
        name: title,
        slug: slugify(title),
        description: truncate(desc, 500) || `${title} — AI tool.`,
        short_description: truncate(desc, 120) || `${title} — AI tool.`,
        category: categorize(title, desc),
        pricing_type: "freemium",
        url: link,
        tags: extractTags(title, desc),
        source: "marktechpost",
      });
    }
  } catch (err) {
    console.error(
      "[MTP] Error (non-critical):",
      err instanceof Error ? err.message : err
    );
  }

  console.log(`[MTP] Found ${tools.length} AI tools`);
  return tools;
}

// ── Source: Daily AI RSS ─────────────────────────────────────────────────────

async function fetchDailyAI(): Promise<CrawledTool[]> {
  console.log("[DAI] Fetching Daily AI RSS...");
  const tools: CrawledTool[] = [];

  try {
    const feed = await rssParser.parseURL("https://dailyai.com/feed/");
    console.log(`[DAI] Got ${feed.items.length} items`);

    for (const item of feed.items) {
      const title = item.title?.trim() || "";
      const desc = item.contentSnippet?.trim() || item.content?.trim() || "";
      const link = item.link || "";

      if (!title || !isAiRelated(title, desc)) continue;
      if (!looksLikeToolName(title)) continue;

      tools.push({
        name: title,
        slug: slugify(title),
        description: truncate(desc, 500) || `${title} — AI tool.`,
        short_description: truncate(desc, 120) || `${title} — AI tool.`,
        category: categorize(title, desc),
        pricing_type: "freemium",
        url: link,
        tags: extractTags(title, desc),
        source: "dailyai",
      });
    }
  } catch (err) {
    console.error(
      "[DAI] Error (non-critical):",
      err instanceof Error ? err.message : err
    );
  }

  console.log(`[DAI] Found ${tools.length} AI tools`);
  return tools;
}

// ── Deduplication ───────────────────────────────────────────────────────────

async function getExistingSlugsAndNames(): Promise<{
  slugs: Set<string>;
  names: Set<string>;
}> {
  const rows = await sql`SELECT slug, LOWER(name) as name FROM ai_tools`;
  return {
    slugs: new Set(rows.map((r) => r.slug as string)),
    names: new Set(rows.map((r) => r.name as string)),
  };
}

function deduplicateTools(
  tools: CrawledTool[],
  existingSlugs: Set<string>,
  existingNames: Set<string>
): { unique: CrawledTool[]; duplicateCount: number } {
  const seen = new Set<string>();
  const unique: CrawledTool[] = [];
  let duplicateCount = 0;

  for (const tool of tools) {
    const nameKey = tool.name.toLowerCase();

    // Skip if already in DB (by slug or name)
    if (existingSlugs.has(tool.slug) || existingNames.has(nameKey)) {
      duplicateCount++;
      continue;
    }

    // Skip if already seen in this batch
    if (seen.has(tool.slug) || seen.has(nameKey)) {
      duplicateCount++;
      continue;
    }

    // Skip tools with very short or empty names
    if (tool.name.length < 2) {
      continue;
    }

    seen.add(tool.slug);
    seen.add(nameKey);
    unique.push(tool);
  }

  return { unique, duplicateCount };
}

// ── DB Insert ───────────────────────────────────────────────────────────────

async function insertTools(tools: CrawledTool[]): Promise<number> {
  let inserted = 0;

  for (const tool of tools) {
    try {
      await sql`
        INSERT INTO ai_tools (name, slug, description, short_description, category, pricing_type, url, tags, published)
        VALUES (${tool.name}, ${tool.slug}, ${tool.description}, ${tool.short_description}, ${tool.category}, ${tool.pricing_type}, ${tool.url}, ${tool.tags}, ${true})
        ON CONFLICT (slug) DO NOTHING`;
      inserted++;
      console.log(`  + ${tool.name} [${tool.category}] (${tool.source})`);
    } catch (err) {
      console.error(
        `  ! Failed: ${tool.name} —`,
        err instanceof Error ? err.message : err
      );
    }
  }

  return inserted;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=".repeat(60));
  console.log("AI Directory Crawler — Starting");
  console.log(`Time: ${new Date().toISOString()}`);
  console.log("=".repeat(60));

  // 1. Fetch from all sources in parallel
  const [phTools, mtpTools, daiTools] = await Promise.all([
    fetchProductHunt(),
    fetchMarkTechPost(),
    fetchDailyAI(),
  ]);

  const allTools = [...phTools, ...mtpTools, ...daiTools];
  console.log(`\n[TOTAL] Fetched ${allTools.length} tools from all sources`);

  if (allTools.length === 0) {
    console.log("[DONE] No tools found. Exiting.");
    return;
    return;
  }

  // 2. Deduplicate against DB
  const { slugs, names } = await getExistingSlugsAndNames();
  console.log(`[DB] Existing tools: ${slugs.size}`);

  const { unique, duplicateCount } = deduplicateTools(allTools, slugs, names);
  console.log(`[DEDUP] Unique new tools: ${unique.length}, Duplicates skipped: ${duplicateCount}`);

  if (unique.length === 0) {
    console.log("[DONE] No new tools to insert. DB is up to date.");
    return;
    return;
  }

  // 3. Insert into DB
  console.log(`\n[INSERT] Adding ${unique.length} new tools...`);
  const inserted = await insertTools(unique);

  // 4. Summary
  const countRows = await sql`SELECT count(*)::int as total FROM ai_tools`;
  const totalAfter = countRows[0].total;

  console.log("\n" + "=".repeat(60));
  console.log("CRAWL SUMMARY");
  console.log("=".repeat(60));
  console.log(`Sources fetched:     3 (Product Hunt, MarkTechPost, DailyAI)`);
  console.log(`Total fetched:       ${allTools.length}`);
  console.log(`AI-filtered:         ${allTools.length}`);
  console.log(`Duplicates skipped:  ${duplicateCount}`);
  console.log(`New tools inserted:  ${inserted}`);
  console.log(`Total tools in DB:   ${totalAfter}`);
  console.log("=".repeat(60));
}

main().catch((err) => {
  console.error("[FATAL]", err);
  process.exit(1);
});
