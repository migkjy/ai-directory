import { Metadata } from "next";
import Link from "next/link";
import {
  POPULAR_COMPARISONS,
  canonicalComparisonSlug,
} from "@/lib/comparisons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI 도구 비교 - 어떤 AI가 더 좋을까?",
  description:
    "인기 AI 도구를 나란히 비교하세요. ChatGPT vs Claude, Midjourney vs DALL-E, Cursor vs GitHub Copilot 등 기능, 가격, 장단점을 한눈에.",
  alternates: {
    canonical: "https://ai-directory-seven.vercel.app/compare",
  },
  openGraph: {
    title: "AI 도구 비교 - AI AppPro",
    description:
      "인기 AI 도구를 나란히 비교하세요. 기능, 가격, 장단점을 한눈에.",
    type: "website",
    url: "https://ai-directory-seven.vercel.app/compare",
    siteName: "AI AppPro",
    images: [
      {
        url: "/og?title=AI+%EB%8F%84%EA%B5%AC+%EB%B9%84%EA%B5%90&description=%EC%9D%B8%EA%B8%B0+AI+%EB%8F%84%EA%B5%AC%EB%A5%BC+%EB%82%98%EB%9E%80%ED%9E%88+%EB%B9%84%EA%B5%90%ED%95%98%EC%84%B8%EC%9A%94",
        width: 1200,
        height: 630,
        alt: "AI 도구 비교",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 도구 비교 - AI AppPro",
    description:
      "인기 AI 도구를 나란히 비교하세요. 기능, 가격, 장단점을 한눈에.",
  },
};

const CATEGORY_GROUPS: { title: string; pairs: [string, string][] }[] = [
  {
    title: "AI 대화 / 검색",
    pairs: POPULAR_COMPARISONS.filter(([a, b]) =>
      [
        "chatgpt",
        "claude",
        "gemini",
        "grok",
        "perplexity",
        "perplexity-ai",
      ].some((s) => a === s || b === s)
    ),
  },
  {
    title: "AI 코딩 도구",
    pairs: POPULAR_COMPARISONS.filter(([a, b]) =>
      ["cursor", "github-copilot", "windsurf", "bolt", "v0", "lovable"].some(
        (s) => a === s || b === s
      )
    ),
  },
  {
    title: "AI 이미지 생성",
    pairs: POPULAR_COMPARISONS.filter(([a, b]) =>
      [
        "midjourney",
        "dall-e-3",
        "stable-diffusion",
        "flux",
        "leonardo-ai",
      ].some((s) => a === s || b === s)
    ),
  },
  {
    title: "AI 영상 생성",
    pairs: POPULAR_COMPARISONS.filter(([a, b]) =>
      ["runway", "sora", "pika", "kling"].some((s) => a === s || b === s)
    ),
  },
  {
    title: "AI 음성 / 음악",
    pairs: POPULAR_COMPARISONS.filter(([a, b]) =>
      ["suno", "udio", "elevenlabs", "murf"].some((s) => a === s || b === s)
    ),
  },
  {
    title: "AI 글쓰기 / 마케팅",
    pairs: POPULAR_COMPARISONS.filter(([a, b]) =>
      ["jasper", "writesonic", "copy-ai", "grammarly", "deepl-write"].some(
        (s) => a === s || b === s
      )
    ),
  },
  {
    title: "AI 생산성 / 데이터",
    pairs: POPULAR_COMPARISONS.filter(([a, b]) =>
      [
        "notion-ai",
        "mem-ai",
        "zapier-ai",
        "julius-ai",
        "rows-ai",
        "tableau-ai",
        "power-bi-copilot",
        "reclaim-ai",
      ].some((s) => a === s || b === s)
    ),
  },
  {
    title: "AI 고객 서비스 / 교육",
    pairs: POPULAR_COMPARISONS.filter(([a, b]) =>
      [
        "intercom-fin",
        "zendesk-ai",
        "channel-talk",
        "tidio",
        "heygen",
        "synthesia",
        "duolingo-max",
        "khanmigo",
      ].some((s) => a === s || b === s)
    ),
  },
];

function formatSlugName(slug: string): string {
  const nameMap: Record<string, string> = {
    chatgpt: "ChatGPT",
    claude: "Claude",
    gemini: "Gemini",
    grok: "Grok",
    perplexity: "Perplexity",
    "perplexity-ai": "Perplexity",
    cursor: "Cursor",
    "github-copilot": "GitHub Copilot",
    windsurf: "Windsurf",
    bolt: "Bolt",
    v0: "v0",
    lovable: "Lovable",
    midjourney: "Midjourney",
    "dall-e-3": "DALL-E 3",
    "stable-diffusion": "Stable Diffusion",
    flux: "Flux",
    "leonardo-ai": "Leonardo AI",
    runway: "Runway",
    sora: "Sora",
    pika: "Pika",
    kling: "Kling",
    suno: "Suno",
    udio: "Udio",
    elevenlabs: "ElevenLabs",
    murf: "Murf",
    jasper: "Jasper",
    writesonic: "Writesonic",
    "copy-ai": "Copy.ai",
    grammarly: "Grammarly",
    "deepl-write": "DeepL Write",
    "notion-ai": "Notion AI",
    "mem-ai": "Mem AI",
    "zapier-ai": "Zapier AI",
    "reclaim-ai": "Reclaim AI",
    "julius-ai": "Julius AI",
    "rows-ai": "Rows AI",
    "tableau-ai": "Tableau AI",
    "power-bi-copilot": "Power BI Copilot",
    "intercom-fin": "Intercom Fin",
    "zendesk-ai": "Zendesk AI",
    "channel-talk": "Channel Talk",
    tidio: "Tidio",
    heygen: "HeyGen",
    synthesia: "Synthesia",
    "duolingo-max": "Duolingo Max",
    khanmigo: "Khanmigo",
  };
  return nameMap[slug] || slug.replace(/-/g, " ");
}

export default function CompareIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              홈
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">AI 도구 비교</span>
          </nav>

          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            AI 도구 비교
          </h1>
          <p className="mb-8 text-gray-600">
            인기 AI 도구를 나란히 비교하세요. 기능, 가격, 장단점을 한눈에 확인하고
            내 비즈니스에 맞는 도구를 선택하세요.
          </p>

          <div className="space-y-8">
            {CATEGORY_GROUPS.map((group) => (
              <div key={group.title}>
                <h2 className="mb-3 text-lg font-semibold text-gray-900">
                  {group.title}
                </h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {group.pairs.map(([a, b]) => (
                    <Link
                      key={`${a}-${b}`}
                      href={`/compare/${canonicalComparisonSlug(a, b)}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-blue-300 hover:bg-blue-50"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {formatSlugName(a)}{" "}
                        <span className="text-gray-400">vs</span>{" "}
                        {formatSlugName(b)}
                      </span>
                      <span className="text-gray-400">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
