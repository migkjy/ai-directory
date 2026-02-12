/**
 * AI SaaS Idea Report Generator v2 — "증권가 수준" Premium Reports
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... tsx --env-file=.env.local scripts/generate-report.ts "AI 리뷰 자동 답변 봇"
 *   ANTHROPIC_API_KEY=sk-ant-... tsx --env-file=.env.local scripts/generate-report.ts --topic "AI-powered code review SaaS"
 *   ANTHROPIC_API_KEY=sk-ant-... tsx --env-file=.env.local scripts/generate-report.ts --tier lite "AI 메뉴 최적화"
 *
 * Env:
 *   DATABASE_URL  — NeonDB connection string (from .env.local)
 *   ANTHROPIC_API_KEY — Claude API key
 */

import "dotenv/config";
import { neon } from "@neondatabase/serverless";

// ── Config ──────────────────────────────────────────────────────────────────

const DATABASE_URL = process.env.DATABASE_URL;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!DATABASE_URL) {
  console.error("[ERROR] DATABASE_URL not set");
  process.exit(1);
}
if (!ANTHROPIC_API_KEY) {
  console.error("[ERROR] ANTHROPIC_API_KEY not set");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const MODEL = "claude-sonnet-4-5-20250514";

// ── Types ───────────────────────────────────────────────────────────────────

interface SourceLink {
  title: string;
  url: string;
  type: string;
}

interface OverseasCase {
  name: string;
  url: string;
  description: string;
  metrics: string;
}

interface Feasibility {
  score: number;
  timeline: string;
  team_size: string;
  tech_complexity: string;
  notes: string;
}

interface ReportData {
  title: string;
  slug: string;
  summary: string;
  category: string;
  difficulty: string;
  revenue_model: string;
  estimated_revenue: string;
  tech_stack: string[];
  target_market: string;
  problem: string;
  solution: string;
  how_it_works: string;
  monetization: string;
  competition: string;
  unique_angle: string;
  content: string;
  overseas_cases: OverseasCase[];
  korea_localization: string;
  risk_analysis: string;
  feasibility: Feasibility;
  customer_analysis: string;
  source_links: SourceLink[];
  profitability_analysis: string;
}

// ── Claude API Call ─────────────────────────────────────────────────────────

async function callClaude(
  systemPrompt: string,
  userPrompt: string
): Promise<{ text: string; inputTokens: number; outputTokens: number }> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text =
    data.content?.[0]?.type === "text" ? data.content[0].text : "";
  return {
    text,
    inputTokens: data.usage?.input_tokens ?? 0,
    outputTokens: data.usage?.output_tokens ?? 0,
  };
}

// ── Prompts ─────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT_PREMIUM = `당신은 글로벌 AI SaaS 시장을 분석하는 증권사 수준의 리서치 애널리스트입니다.
한국어로 AI SaaS 비즈니스 아이디어에 대한 심층 분석 리포트를 작성합니다.

반드시 아래 JSON 형식으로만 응답하세요. JSON 외의 텍스트는 절대 포함하지 마세요.

{
  "title": "한국어 리포트 제목 (구체적, SEO 친화적)",
  "slug": "영문-kebab-case-slug",
  "summary": "2-3문장 핵심 요약. 이 아이디어가 왜 지금 유망한지.",
  "category": "카테고리 (마케팅 AI, 생산성 AI, 법률 AI, 교육 AI, 외식업 AI, 헬스케어 AI, 금융 AI, 커머스 AI, 부동산 AI, HR AI, 크리에이티브 AI, 개발자 도구 중 선택)",
  "difficulty": "초급/중급/고급",
  "revenue_model": "SaaS 구독/프리미엄/광고/거래수수료/API 과금 중 적합한 것",
  "estimated_revenue": "현실적 월 매출 범위 (예: 월 500~2,000만원)",
  "tech_stack": ["필요한 기술 스택 배열"],
  "target_market": "핵심 타겟 고객",
  "problem": "해결하려는 문제를 구체적 데이터/사례와 함께 3-5문장으로",
  "solution": "제안하는 솔루션을 구체적으로 3-5문장으로",
  "how_it_works": "기술적 작동 방식을 비전문가도 이해할 수 있게 설명",
  "monetization": "구체적인 가격 체계와 수익화 전략. 프리/프로/엔터프라이즈 티어별 가격",
  "competition": "경쟁사 3-5개를 구체적으로 나열하고 각각의 강/약점 분석",
  "unique_angle": "경쟁사 대비 명확한 차별화 포인트 2-3가지",
  "content": "본문 전체 (마크다운 형식, 3000~5000자). 아래 섹션을 반드시 포함:\\n## 시장 분석\\n시장 규모, 성장률, 트렌드를 구체적 수치와 함께\\n## 핵심 기능 상세\\n주요 기능 5-7개를 상세히\\n## 수익성 분석\\nUnit Economics, CAC, LTV, 마진율 등\\n## 구현 로드맵\\nMVP(1개월) → 베타(3개월) → 정식(6개월) 단계별 계획\\n## 성장 전략\\n초기 고객 확보부터 스케일업까지\\n## 리스크와 대응\\n주요 리스크 3-5개와 각각의 대응 전략",
  "overseas_cases": [
    {"name": "서비스명", "url": "https://서비스URL", "description": "서비스 설명 2-3문장", "metrics": "MAU 10만, ARR $5M 등 구체적 지표"},
    {"name": "서비스명2", "url": "https://서비스URL2", "description": "설명", "metrics": "지표"}
  ],
  "korea_localization": "한국 시장에 맞는 현지화 전략. 한국 특수 상황(네이버/카카오 생태계, 결제 시스템, 규제 등)을 반영한 구체적 제안 3-5가지",
  "risk_analysis": "주요 리스크 5가지와 각각의 발생 확률(상/중/하), 영향도(상/중/하), 대응 전략을 표 형식으로",
  "feasibility": {"score": 7, "timeline": "MVP 4주, 정식 3개월", "team_size": "1-2인 (AI+풀스택)", "tech_complexity": "중간 - Claude API + Next.js + NeonDB", "notes": "핵심 기술적 챌린지와 해결 방안"},
  "customer_analysis": "고객 세그먼트 3-4개를 페르소나 형태로. 각각의 Pain Point, 지불 의향, 획득 채널을 구체적으로",
  "source_links": [
    {"title": "참고 자료 제목", "url": "https://실제URL", "type": "article"},
    {"title": "참고 자료 제목2", "url": "https://실제URL2", "type": "report"}
  ],
  "profitability_analysis": "BEP 분석, 초기 투자 비용, 월 운영 비용, 예상 마진율, 1년차/2년차 수익 전망을 구체적 수치로"
}

중요 규칙:
- 모든 해외 사례는 실제 존재하는 서비스여야 합니다. 가상의 서비스를 만들지 마세요.
- source_links의 URL은 실제 접근 가능한 URL이어야 합니다. 확실하지 않으면 서비스 공식 홈페이지 URL을 사용하세요.
- 수치(시장 규모, 매출 등)는 합리적 추정치를 사용하되, 추정임을 명시하세요.
- content는 반드시 3000자 이상이어야 합니다.
- JSON만 반환하세요. \`\`\`json 같은 마크다운 코드 블록을 사용하지 마세요.`;

const SYSTEM_PROMPT_LITE = `당신은 AI SaaS 비즈니스 아이디어 요약 전문가입니다.
한국어로 간결한 아이디어 요약 리포트를 작성합니다.

반드시 아래 JSON 형식으로만 응답하세요. JSON 외의 텍스트는 절대 포함하지 마세요.

{
  "title": "한국어 리포트 제목",
  "slug": "영문-kebab-case-slug",
  "summary": "1-2문장 핵심 요약",
  "category": "카테고리",
  "difficulty": "초급/중급/고급",
  "revenue_model": "수익 모델",
  "estimated_revenue": "예상 월 매출",
  "tech_stack": ["기술 스택"],
  "target_market": "타겟 고객",
  "problem": "해결하려는 문제 2-3문장",
  "solution": "솔루션 2-3문장",
  "how_it_works": "작동 방식 간략 설명",
  "monetization": "가격 체계 요약",
  "competition": "주요 경쟁사 2-3개 간략 비교",
  "unique_angle": "차별화 포인트 1-2가지",
  "content": "본문 (마크다운, 1000~1500자). ## 서비스 소개\\n## 핵심 기능\\n## 수익 모델\\n## 시작 방법",
  "overseas_cases": [{"name": "서비스명", "url": "URL", "description": "한줄 설명", "metrics": "핵심 지표 1개"}],
  "korea_localization": "한국 현지화 핵심 포인트 1-2가지",
  "risk_analysis": "주요 리스크 2-3가지 간략히",
  "feasibility": {"score": 7, "timeline": "MVP 기간", "team_size": "필요 인력", "tech_complexity": "난이도", "notes": "핵심 포인트"},
  "customer_analysis": "핵심 타겟 1-2개 간략히",
  "source_links": [{"title": "참고", "url": "URL", "type": "article"}],
  "profitability_analysis": "BEP와 예상 수익 간략히"
}

JSON만 반환하세요. \`\`\`json 같은 마크다운 코드 블록을 사용하지 마세요.`;

// ── Slug Helper ─────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/[가-힣]+/g, (match) => {
      // Simple transliteration for common Korean tech terms
      return match;
    })
    .replace(/[가-힣\s]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  let tier: "premium" | "lite" = "premium";
  let topic = "";

  // Parse args
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--tier" && args[i + 1]) {
      tier = args[i + 1] as "premium" | "lite";
      i++;
    } else if (args[i] === "--topic" && args[i + 1]) {
      topic = args[i + 1];
      i++;
    } else if (!args[i].startsWith("--")) {
      topic = args[i];
    }
  }

  if (!topic) {
    console.error("Usage: tsx scripts/generate-report.ts [--tier premium|lite] <topic>");
    console.error('Example: tsx scripts/generate-report.ts "AI 리뷰 자동 답변 봇"');
    process.exit(1);
  }

  console.log("=".repeat(60));
  console.log(`Report Generator v2 — ${tier.toUpperCase()}`);
  console.log(`Topic: ${topic}`);
  console.log(`Model: ${MODEL}`);
  console.log("=".repeat(60));

  // Generate report
  const systemPrompt = tier === "premium" ? SYSTEM_PROMPT_PREMIUM : SYSTEM_PROMPT_LITE;
  const userPrompt = `다음 주제에 대한 ${tier === "premium" ? "심층 분석" : "요약"} 리포트를 작성해주세요:\n\n"${topic}"\n\n${tier === "premium" ? "반드시 해외에서 이미 성공한 유사 서비스 사례를 3개 이상 포함하고, 한국 시장 진입 전략을 구체적으로 제시하세요. 모든 수치는 현실적이어야 합니다." : "간결하고 핵심만 담아주세요."}`;

  console.log("\n[1/3] Calling Claude API...");
  const startTime = Date.now();
  const { text, inputTokens, outputTokens } = await callClaude(systemPrompt, userPrompt);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`  Done in ${elapsed}s (input: ${inputTokens} tokens, output: ${outputTokens} tokens)`);

  // Calculate cost (Sonnet 4.5 pricing)
  const inputCost = (inputTokens / 1_000_000) * 3;
  const outputCost = (outputTokens / 1_000_000) * 15;
  const totalCost = inputCost + outputCost;
  console.log(`  Cost: $${totalCost.toFixed(4)} (input: $${inputCost.toFixed(4)}, output: $${outputCost.toFixed(4)})`);

  // Parse response
  console.log("\n[2/3] Parsing response...");
  let report: ReportData;
  try {
    // Strip potential markdown code block wrappers
    let cleaned = text.trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith("```")) {
      cleaned = cleaned.slice(0, -3);
    }
    report = JSON.parse(cleaned.trim());
  } catch (err) {
    console.error("[ERROR] Failed to parse JSON response");
    console.error("Raw response (first 500 chars):", text.slice(0, 500));
    process.exit(1);
  }

  // Validate required fields
  if (!report.title || !report.content || !report.problem || !report.solution) {
    console.error("[ERROR] Missing required fields in report");
    process.exit(1);
  }

  // Generate slug if empty
  if (!report.slug) {
    report.slug = slugify(report.title);
  }

  console.log(`  Title: ${report.title}`);
  console.log(`  Slug: ${report.slug}`);
  console.log(`  Category: ${report.category}`);
  console.log(`  Content length: ${report.content.length} chars`);
  console.log(`  Overseas cases: ${report.overseas_cases?.length ?? 0}`);
  console.log(`  Source links: ${report.source_links?.length ?? 0}`);

  // Insert into DB
  console.log("\n[3/3] Inserting into DB...");

  const tokenCost = {
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    model: MODEL,
    estimated_cost_usd: parseFloat(totalCost.toFixed(4)),
  };

  try {
    await sql`
      INSERT INTO ai_ideas (
        slug, title, summary, category, difficulty, revenue_model, estimated_revenue,
        tech_stack, target_market, problem, solution, how_it_works, monetization,
        competition, unique_angle, content, published, tier,
        overseas_cases, korea_localization, risk_analysis, feasibility,
        customer_analysis, source_links, images, token_cost, profitability_analysis
      ) VALUES (
        ${report.slug},
        ${report.title},
        ${report.summary},
        ${report.category},
        ${report.difficulty},
        ${report.revenue_model},
        ${report.estimated_revenue},
        ${report.tech_stack},
        ${report.target_market},
        ${report.problem},
        ${report.solution},
        ${report.how_it_works},
        ${report.monetization},
        ${report.competition},
        ${report.unique_angle},
        ${report.content},
        ${true},
        ${tier},
        ${JSON.stringify(report.overseas_cases || [])},
        ${report.korea_localization},
        ${report.risk_analysis},
        ${JSON.stringify(report.feasibility || null)},
        ${report.customer_analysis},
        ${JSON.stringify(report.source_links || [])},
        ${"[]"},
        ${JSON.stringify(tokenCost)},
        ${report.profitability_analysis}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        summary = EXCLUDED.summary,
        content = EXCLUDED.content,
        tier = EXCLUDED.tier,
        overseas_cases = EXCLUDED.overseas_cases,
        korea_localization = EXCLUDED.korea_localization,
        risk_analysis = EXCLUDED.risk_analysis,
        feasibility = EXCLUDED.feasibility,
        customer_analysis = EXCLUDED.customer_analysis,
        source_links = EXCLUDED.source_links,
        token_cost = EXCLUDED.token_cost,
        profitability_analysis = EXCLUDED.profitability_analysis,
        updated_at = now()
    `;
    console.log("  Inserted successfully!");
  } catch (err) {
    console.error("[ERROR] DB insert failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("REPORT GENERATION SUMMARY");
  console.log("=".repeat(60));
  console.log(`Tier:               ${tier}`);
  console.log(`Title:              ${report.title}`);
  console.log(`Slug:               ${report.slug}`);
  console.log(`Category:           ${report.category}`);
  console.log(`Content Length:     ${report.content.length} chars`);
  console.log(`Overseas Cases:     ${report.overseas_cases?.length ?? 0}`);
  console.log(`Source Links:       ${report.source_links?.length ?? 0}`);
  console.log(`Token Cost:         $${totalCost.toFixed(4)}`);
  console.log(`  Input Tokens:     ${inputTokens}`);
  console.log(`  Output Tokens:    ${outputTokens}`);
  console.log("=".repeat(60));
}

main().catch((err) => {
  console.error("[FATAL]", err);
  process.exit(1);
});
