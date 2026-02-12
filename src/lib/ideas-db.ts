import { Pool } from "@neondatabase/serverless";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface SourceLink {
  title: string;
  url: string;
  type: string; // "article" | "service" | "report" | "data"
}

export interface OverseasCase {
  name: string;
  url: string;
  description: string;
  metrics: string;
}

export interface Feasibility {
  score: number; // 1-10
  timeline: string;
  team_size: string;
  tech_complexity: string;
  notes: string;
}

export interface TokenCost {
  input_tokens: number;
  output_tokens: number;
  model: string;
  estimated_cost_usd: number;
}

export interface ReportImage {
  url: string;
  alt: string;
  type: string; // "og" | "chart" | "screenshot" | "diagram"
}

export interface AiIdea {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  difficulty: string | null;
  revenue_model: string | null;
  estimated_revenue: string | null;
  tech_stack: string[];
  target_market: string | null;
  source_tool: string | null;
  source_tool_url: string | null;
  problem: string;
  solution: string;
  how_it_works: string | null;
  monetization: string | null;
  competition: string | null;
  unique_angle: string | null;
  content: string;
  published: boolean;
  published_at: string;
  created_at: string;
  // v2 premium fields
  tier: "premium" | "lite";
  overseas_cases: OverseasCase[];
  korea_localization: string | null;
  risk_analysis: string | null;
  feasibility: Feasibility | null;
  customer_analysis: string | null;
  source_links: SourceLink[];
  images: ReportImage[];
  token_cost: TokenCost | null;
  profitability_analysis: string | null;
}

export async function getLatestIdeas(limit: number = 10): Promise<AiIdea[]> {
  const { rows } = await pool.query(
    "SELECT * FROM ai_ideas WHERE published = true ORDER BY published_at DESC LIMIT $1",
    [limit]
  );
  return rows;
}

export async function getIdeaBySlug(slug: string): Promise<AiIdea | null> {
  const { rows } = await pool.query(
    "SELECT * FROM ai_ideas WHERE slug = $1 AND published = true",
    [slug]
  );
  return rows[0] || null;
}

export async function getAllIdeaSlugs(): Promise<string[]> {
  const { rows } = await pool.query(
    "SELECT slug FROM ai_ideas WHERE published = true ORDER BY published_at DESC"
  );
  return rows.map((r: { slug: string }) => r.slug);
}

export async function getIdeaCategories(): Promise<
  { category: string; count: number }[]
> {
  const { rows } = await pool.query(
    "SELECT category, COUNT(*)::int as count FROM ai_ideas WHERE published = true GROUP BY category ORDER BY count DESC"
  );
  return rows;
}

export async function getIdeasByCategory(category: string): Promise<AiIdea[]> {
  const { rows } = await pool.query(
    "SELECT * FROM ai_ideas WHERE category = $1 AND published = true ORDER BY published_at DESC",
    [category]
  );
  return rows;
}
