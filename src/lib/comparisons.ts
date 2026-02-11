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
];

export function canonicalComparisonSlug(slug1: string, slug2: string): string {
  return [slug1, slug2].sort().join("-vs-");
}

export function parseComparisonSlug(slug: string): [string, string] | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return [match[1], match[2]];
}
