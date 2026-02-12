import { Pool } from "@neondatabase/serverless";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface AiTool {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;
  category: string;
  subcategory: string | null;
  tags: string[];
  pricing_type: string;
  pricing_detail: string | null;
  url: string | null;
  image_url: string | null;
  features: string[];
  alternatives: string[];
  rating: number | null;
  is_featured: boolean;
  published: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export async function getAllTools(): Promise<AiTool[]> {
  const { rows } = await pool.query(
    "SELECT * FROM ai_tools WHERE published = true ORDER BY is_featured DESC, name ASC"
  );
  return rows;
}

export async function getToolsPaginated(
  offset: number = 0,
  limit: number = 30,
  category?: string,
): Promise<AiTool[]> {
  if (category) {
    const { rows } = await pool.query(
      "SELECT * FROM ai_tools WHERE published = true AND category = $1 ORDER BY is_featured DESC, name ASC LIMIT $2 OFFSET $3",
      [category, limit, offset],
    );
    return rows;
  }
  const { rows } = await pool.query(
    "SELECT * FROM ai_tools WHERE published = true ORDER BY is_featured DESC, name ASC LIMIT $1 OFFSET $2",
    [limit, offset],
  );
  return rows;
}

export async function getToolsCount(category?: string): Promise<number> {
  if (category) {
    const { rows } = await pool.query(
      "SELECT COUNT(*)::int as count FROM ai_tools WHERE published = true AND category = $1",
      [category],
    );
    return rows[0].count;
  }
  const { rows } = await pool.query(
    "SELECT COUNT(*)::int as count FROM ai_tools WHERE published = true",
  );
  return rows[0].count;
}

export async function getToolBySlug(slug: string): Promise<AiTool | null> {
  const { rows } = await pool.query(
    "SELECT * FROM ai_tools WHERE slug = $1 AND published = true",
    [slug]
  );
  return rows[0] || null;
}

export async function getToolsByCategory(category: string): Promise<AiTool[]> {
  const { rows } = await pool.query(
    "SELECT * FROM ai_tools WHERE category = $1 AND published = true ORDER BY is_featured DESC, name ASC",
    [category]
  );
  return rows;
}

export async function getCategories(): Promise<
  { category: string; count: number }[]
> {
  const { rows } = await pool.query(
    "SELECT category, COUNT(*)::int as count FROM ai_tools WHERE published = true GROUP BY category ORDER BY count DESC"
  );
  return rows;
}

export async function searchTools(query: string): Promise<AiTool[]> {
  const { rows } = await pool.query(
    `SELECT * FROM ai_tools WHERE published = true AND (
      name ILIKE $1 OR description ILIKE $1 OR short_description ILIKE $1
      OR category ILIKE $1 OR $2 = ANY(tags)
    ) ORDER BY is_featured DESC, name ASC`,
    [`%${query}%`, query.toLowerCase()]
  );
  return rows;
}

export async function getAllSlugs(): Promise<string[]> {
  const { rows } = await pool.query(
    "SELECT slug FROM ai_tools WHERE published = true"
  );
  return rows.map((r: { slug: string }) => r.slug);
}

export async function getAlternativeTools(
  alternativeSlugs: string[]
): Promise<AiTool[]> {
  if (alternativeSlugs.length === 0) return [];
  const { rows } = await pool.query(
    "SELECT * FROM ai_tools WHERE slug = ANY($1) AND published = true",
    [alternativeSlugs]
  );
  return rows;
}

export async function getTwoToolsBySlugs(
  slug1: string,
  slug2: string
): Promise<[AiTool | null, AiTool | null]> {
  const { rows } = await pool.query(
    "SELECT * FROM ai_tools WHERE slug = ANY($1) AND published = true",
    [[slug1, slug2]]
  );
  const tool1 = rows.find((r: AiTool) => r.slug === slug1) || null;
  const tool2 = rows.find((r: AiTool) => r.slug === slug2) || null;
  return [tool1, tool2];
}

export async function getFeaturedTools(limit: number = 6): Promise<AiTool[]> {
  const { rows } = await pool.query(
    "SELECT * FROM ai_tools WHERE published = true AND is_featured = true ORDER BY rating DESC NULLS LAST LIMIT $1",
    [limit]
  );
  return rows;
}

export async function getStats(): Promise<{
  totalTools: number;
  totalCategories: number;
}> {
  const toolsRes = await pool.query(
    "SELECT COUNT(*)::int as count FROM ai_tools WHERE published = true"
  );
  const catRes = await pool.query(
    "SELECT COUNT(DISTINCT category)::int as count FROM ai_tools WHERE published = true"
  );
  return {
    totalTools: toolsRes.rows[0].count,
    totalCategories: catRes.rows[0].count,
  };
}

export async function getToolsBySameCategory(
  category: string,
  excludeSlugs: string[],
  limit: number = 4
): Promise<AiTool[]> {
  const { rows } = await pool.query(
    "SELECT * FROM ai_tools WHERE category = $1 AND slug != ALL($2) AND published = true ORDER BY is_featured DESC, rating DESC NULLS LAST LIMIT $3",
    [category, excludeSlugs, limit]
  );
  return rows;
}
