// Popular comparison pairs for programmatic SEO
// Format: [slug1, slug2] — always alphabetically ordered for canonical URLs
export const POPULAR_COMPARISONS: [string, string][] = [
  ["chatgpt", "claude"],
  ["chatgpt", "gemini"],
  ["claude", "gemini"],
  ["chatgpt", "perplexity"],
  ["claude", "grok"],
  ["cursor", "github-copilot"],
  ["cursor", "windsurf"],
  ["bolt", "v0"],
  ["bolt", "lovable"],
  ["lovable", "v0"],
  ["midjourney", "dall-e-3"],
  ["midjourney", "stable-diffusion"],
  ["dall-e-3", "flux"],
  ["midjourney", "leonardo-ai"],
  ["runway", "sora"],
  ["pika", "sora"],
  ["kling", "sora"],
  ["suno", "udio"],
  ["elevenlabs", "murf"],
  ["jasper", "writesonic"],
  ["copy-ai", "jasper"],
  ["grammarly", "deepl-write"],
  ["notion-ai", "mem-ai"],
  ["zapier-ai", "reclaim-ai"],
  ["intercom-fin", "zendesk-ai"],
  ["channel-talk", "tidio"],
  ["julius-ai", "rows-ai"],
  ["tableau-ai", "power-bi-copilot"],
  ["heygen", "synthesia"],
  ["duolingo-max", "khanmigo"],
  ["codeium", "github-copilot"],
  ["cursor", "devin"],
  ["quillbot", "wordtune"],
  ["grammarly", "quillbot"],
  ["fireflies-ai", "otter-ai"],
  ["elevenlabs", "resemble-ai"],
  ["chatbot-com", "voiceflow"],
  ["akkio", "julius-ai"],
  ["opus-clip", "runway"],
  // New comparisons (batch 3)
  ["canva-ai-image", "midjourney"],       // 디자인 AI vs 이미지 생성 AI
  ["duolingo-max", "elsa-speak"],          // AI 언어 학습 비교
  ["descript", "opus-clip"],               // AI 영상 편집 비교
  ["chatgpt", "grok"],                     // LLM 챗봇 비교
  ["claude", "perplexity"],                // AI 검색 vs AI 어시스턴트
  ["github-copilot", "tabnine"],           // AI 코딩 자동완성 비교
  ["cursor", "codeium"],                   // AI 코딩 에디터 비교
  ["surfer-seo", "semrush-ai"],            // AI SEO 도구 비교
  ["hubspot-ai", "mailchimp-ai"],          // AI 마케팅 자동화 비교
  ["adcreative-ai", "canva-ai"],           // AI 광고/디자인 비교
  ["tidio", "freshdesk-ai"],               // AI 고객서비스 비교
  ["captions-ai", "descript"],             // AI 자막/편집 비교
  ["flux", "stable-diffusion"],            // 오픈소스 이미지 AI 비교
  ["ideogram", "midjourney"],              // AI 이미지 생성 비교
  ["notion-ai", "coda-ai"],               // AI 생산성 도구 비교
  ["play-ht", "elevenlabs"],               // AI TTS 비교
  ["pika", "runway"],                      // AI 영상 생성 비교
  ["heygen", "captions-ai"],               // AI 영상 제작 비교
];

export function canonicalComparisonSlug(slug1: string, slug2: string): string {
  return [slug1, slug2].sort().join("-vs-");
}

export function parseComparisonSlug(slug: string): [string, string] | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return [match[1], match[2]];
}
