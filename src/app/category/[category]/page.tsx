import { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getToolsByCategory } from "@/lib/db";
import {
  getCategoryLabel,
  getCategoryDescription,
  getCategoryIcon,
  getCategorySeoTitle,
  getCategorySeoDescription,
  getCategoryLongDescription,
  CATEGORY_CONFIG,
} from "@/lib/categories";
import {
  POPULAR_COMPARISONS,
  canonicalComparisonSlug,
} from "@/lib/comparisons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CategoryToolsGrid = dynamic(
  () => import("@/components/CategoryToolsGrid"),
);

const BASE_URL = "https://ai-directory-seven.vercel.app";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(CATEGORY_CONFIG).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const url = `${BASE_URL}/category/${category}`;
  return {
    title: getCategorySeoTitle(category),
    description:
      getCategorySeoDescription(category) ||
      `${getCategoryLabel(category)} 분야의 AI 도구를 비교하고 찾아보세요. 가격, 기능, 대안까지 한눈에.`,
    alternates: { canonical: url },
    openGraph: {
      title: getCategorySeoTitle(category),
      description: getCategorySeoDescription(category),
      type: "website",
      url,
      siteName: "AI AppPro",
      images: [
        {
          url: `/og?title=${encodeURIComponent(getCategorySeoTitle(category))}&description=${encodeURIComponent(getCategorySeoDescription(category) || "")}&category=${encodeURIComponent(getCategoryLabel(category))}`,
          width: 1200,
          height: 630,
          alt: getCategorySeoTitle(category),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: getCategorySeoTitle(category),
      description: getCategorySeoDescription(category),
    },
  };
}

function formatSlugName(slug: string): string {
  const nameMap: Record<string, string> = {
    chatgpt: "ChatGPT",
    claude: "Claude",
    gemini: "Gemini",
    grok: "Grok",
    perplexity: "Perplexity",
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
    "reclaim-ai": "Reclaim AI",
  };
  return nameMap[slug] || slug.replace(/-/g, " ");
}

const CATEGORY_SLUGS: Record<string, string[]> = {
  writing: ["chatgpt", "claude", "gemini", "grok", "jasper", "writesonic", "copy-ai", "grammarly", "deepl-write", "rytr", "wordtune"],
  image: ["midjourney", "dall-e-3", "stable-diffusion", "flux", "leonardo-ai", "ideogram", "recraft", "krea"],
  coding: ["cursor", "github-copilot", "windsurf", "bolt", "v0", "lovable", "replit-ai", "tabnine", "claude-code"],
  marketing: ["jasper", "writesonic", "copy-ai", "semrush-ai", "adcreative-ai", "surfer-seo", "mailchimp-ai", "hubspot-ai", "brandmark"],
  video: ["runway", "sora", "pika", "kling", "heygen", "synthesia", "vidu", "luma-dream-machine"],
  audio: ["suno", "udio", "elevenlabs", "murf", "play-ht", "typecast", "descript", "speechify"],
  productivity: ["notion-ai", "mem-ai", "zapier-ai", "reclaim-ai", "perplexity", "perplexity-ai", "otter-ai", "coda-ai", "todoist-ai"],
  data: ["julius-ai", "rows-ai", "tableau-ai", "power-bi-copilot", "obviously-ai", "monkeylearn", "hex"],
  education: ["duolingo-max", "khanmigo", "mathway", "quizlet-ai", "elsa-speak", "socratic", "gamma"],
  customer_service: ["intercom-fin", "zendesk-ai", "channel-talk", "freshdesk-ai", "drift-ai", "tidio", "crisp", "ada-ai"],
};

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const tools = await getToolsByCategory(category);
  const label = getCategoryLabel(category);
  const icon = getCategoryIcon(category);
  const desc = getCategoryDescription(category);
  const longDesc = getCategoryLongDescription(category);

  const categorySlugs = CATEGORY_SLUGS[category] || [];
  const relevantComparisons = POPULAR_COMPARISONS.filter(
    ([a, b]) => categorySlugs.includes(a) || categorySlugs.includes(b)
  ).slice(0, 6);

  const pricingCounts: Record<string, number> = {};
  tools.forEach((t) => {
    pricingCounts[t.pricing_type] = (pricingCounts[t.pricing_type] || 0) + 1;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} AI 도구`,
    description: getCategorySeoDescription(category),
    numberOfItems: tools.length,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              홈
            </Link>
            <span className="mx-2">/</span>
            <Link href="/category" className="hover:text-blue-600">
              카테고리
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{label}</span>
          </nav>

          {/* Category Header */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-6 sm:p-8">
            <h1 className="mb-2 flex items-center gap-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              <span className="text-4xl">{icon}</span> {label} AI 도구
            </h1>
            {desc && <p className="mb-2 text-lg text-gray-600">{desc}</p>}
            {longDesc && (
              <p className="text-sm leading-relaxed text-gray-500">
                {longDesc}
              </p>
            )}
            {/* Stats */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {tools.length}개 도구
              </span>
              {pricingCounts.free && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  무료 {pricingCounts.free}개
                </span>
              )}
              {pricingCounts.freemium && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                  프리미엄 {pricingCounts.freemium}개
                </span>
              )}
              {pricingCounts.paid && (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  유료 {pricingCounts.paid}개
                </span>
              )}
            </div>
          </div>

          {/* Tools with sorting/filtering */}
          <CategoryToolsGrid tools={tools} />

          {/* Related Comparisons */}
          {relevantComparisons.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                {label} 도구 비교
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {relevantComparisons.map(([a, b]) => (
                  <Link
                    key={`${a}-${b}`}
                    href={`/compare/${canonicalComparisonSlug(a, b)}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors hover:border-blue-300 hover:bg-blue-50"
                  >
                    <span className="font-medium text-gray-700">
                      {formatSlugName(a)}{" "}
                      <span className="text-gray-400">vs</span>{" "}
                      {formatSlugName(b)}
                    </span>
                    <span className="text-gray-400">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
