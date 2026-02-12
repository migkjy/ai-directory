// Cross-links from AI Directory tools to Blog posts
// Blog base URL: https://content-pipeline-sage.vercel.app

const BLOG_BASE = "https://content-pipeline-sage.vercel.app/posts";

export interface BlogLink {
  title: string;
  slug: string;
  url: string;
}

// Map tool slugs to related blog posts
const TOOL_BLOG_MAP: Record<string, { title: string; slug: string }[]> = {
  chatgpt: [
    { title: "ChatGPT 완벽 가이드 2026", slug: "chatgpt-complete-guide-2026" },
    { title: "1인 창업자를 위한 AI 자동화 스택", slug: "ai-automation-stack-for-solopreneurs-2026" },
  ],
  claude: [
    { title: "Claude AI 실전 활용법", slug: "claude-ai-practical-guide-2026" },
    { title: "법률사무소 AI 활용 가이드", slug: "ai-guide-for-law-firms-2026" },
  ],
  midjourney: [
    { title: "Midjourney 소상공인 가이드 2026", slug: "midjourney-beginner-guide-2026" },
    { title: "AI 이미지 생성 프롬프트 가이드", slug: "ai-image-generation-prompt-guide" },
  ],
  "canva-ai": [
    { title: "Canva AI 마케팅 디자인 가이드 2026", slug: "canva-ai-design-guide-2026" },
    { title: "AI 마케팅 도구 완전 가이드", slug: "ai-marketing-tools-complete-guide-2026" },
  ],
  "canva-ai-image": [
    { title: "Canva AI 마케팅 디자인 가이드 2026", slug: "canva-ai-design-guide-2026" },
  ],
  "notion-ai": [
    { title: "Notion AI 업무 자동화 가이드 2026", slug: "notion-ai-complete-guide-2026" },
    { title: "1인 창업자를 위한 AI 자동화 스택", slug: "ai-automation-stack-for-solopreneurs-2026" },
  ],
  codeium: [
    { title: "Codeium 무료 AI 코딩 가이드", slug: "codeium-free-ai-coding-guide-2026" },
  ],
  devin: [
    { title: "Devin AI 소프트웨어 엔지니어 리뷰", slug: "devin-ai-software-engineer-review-2026" },
  ],
  elevenlabs: [
    { title: "ElevenLabs AI 음성 완벽 가이드", slug: "elevenlabs-ai-voice-complete-guide-2026" },
    { title: "AI 음성/오디오 도구 TOP 10", slug: "ai-audio-tools-top-10-guide-2026" },
  ],
  gamma: [
    { title: "Gamma AI 프레젠테이션 가이드", slug: "gamma-ai-presentation-10min-guide-2026" },
  ],
  "gamma-app": [
    { title: "Gamma AI 프레젠테이션 가이드", slug: "gamma-ai-presentation-10min-guide-2026" },
  ],
  "fireflies-ai": [
    { title: "Fireflies.ai 회의록 활용법", slug: "fireflies-ai-meeting-notes-guide-2026" },
  ],
  sora: [
    { title: "Sora 완벽 가이드 2026", slug: "sora-complete-guide-2026" },
  ],
  perplexity: [
    { title: "Perplexity AI 완벽 가이드", slug: "perplexity-ai-complete-guide" },
  ],
  "perplexity-ai": [
    { title: "Perplexity AI 완벽 가이드", slug: "perplexity-ai-complete-guide" },
  ],
  "github-copilot": [
    { title: "Codeium 무료 AI 코딩 가이드 (vs Copilot 비교)", slug: "codeium-free-ai-coding-guide-2026" },
  ],
  cursor: [
    { title: "Devin AI 리뷰 (Cursor와 비교)", slug: "devin-ai-software-engineer-review-2026" },
  ],
  tidio: [
    { title: "AI 고객서비스 도구 비교", slug: "ai-customer-service-tools-comparison-2026" },
    { title: "치과/동물병원 AI 가이드", slug: "ai-guide-for-dental-vet-clinics-2026" },
  ],
  "julius-ai": [
    { title: "AI 데이터 분석 도구 비교", slug: "ai-data-analysis-tools-guide-2026" },
    { title: "회계사무소 AI 자동화 가이드", slug: "ai-guide-for-accounting-firms-2026" },
  ],
  "copy-ai": [
    { title: "AI 마케팅 도구 완전 가이드", slug: "ai-marketing-tools-complete-guide-2026" },
  ],
  jasper: [
    { title: "AI 마케팅 도구 완전 가이드", slug: "ai-marketing-tools-complete-guide-2026" },
    { title: "쇼핑몰 매출 2배 올리기 AI 가이드", slug: "ai-ecommerce-sales-double-guide-2026" },
  ],
  grammarly: [
    { title: "2026 무료 AI 도구 BEST 15", slug: "best-free-ai-tools-2026" },
  ],
  "duolingo-max": [
    { title: "AI 교육 도구 완전 가이드", slug: "ai-education-tools-complete-guide-2026" },
  ],
};

// Map comparison slugs to related blog posts
const COMPARE_BLOG_MAP: Record<string, { title: string; slug: string }[]> = {
  "chatgpt-vs-claude": [
    { title: "ChatGPT 완벽 가이드", slug: "chatgpt-complete-guide-2026" },
    { title: "Claude AI 실전 활용법", slug: "claude-ai-practical-guide-2026" },
  ],
  "codeium-vs-github-copilot": [
    { title: "Codeium 무료 AI 코딩 가이드", slug: "codeium-free-ai-coding-guide-2026" },
  ],
  "cursor-vs-devin": [
    { title: "Devin AI 소프트웨어 엔지니어 리뷰", slug: "devin-ai-software-engineer-review-2026" },
  ],
  "copy-ai-vs-jasper": [
    { title: "AI 마케팅 도구 완전 가이드", slug: "ai-marketing-tools-complete-guide-2026" },
  ],
  "intercom-fin-vs-zendesk-ai": [
    { title: "AI 고객서비스 도구 비교", slug: "ai-customer-service-tools-comparison-2026" },
  ],
  "julius-ai-vs-rows-ai": [
    { title: "AI 데이터 분석 도구 비교", slug: "ai-data-analysis-tools-guide-2026" },
  ],
  "elevenlabs-vs-murf": [
    { title: "ElevenLabs AI 음성 완벽 가이드", slug: "elevenlabs-ai-voice-complete-guide-2026" },
    { title: "AI 음성/오디오 도구 TOP 10", slug: "ai-audio-tools-top-10-guide-2026" },
  ],
  "duolingo-max-vs-elsa-speak": [
    { title: "AI 교육 도구 완전 가이드", slug: "ai-education-tools-complete-guide-2026" },
  ],
  "power-bi-copilot-vs-tableau-ai": [
    { title: "AI 데이터 분석 도구 비교", slug: "ai-data-analysis-tools-guide-2026" },
  ],
};

export function getToolBlogLinks(toolSlug: string): BlogLink[] {
  const entries = TOOL_BLOG_MAP[toolSlug];
  if (!entries) return [];
  return entries.map((e) => ({
    title: e.title,
    slug: e.slug,
    url: `${BLOG_BASE}/${e.slug}`,
  }));
}

export function getCompareBlogLinks(compareSlug: string): BlogLink[] {
  const entries = COMPARE_BLOG_MAP[compareSlug];
  if (!entries) return [];
  return entries.map((e) => ({
    title: e.title,
    slug: e.slug,
    url: `${BLOG_BASE}/${e.slug}`,
  }));
}
