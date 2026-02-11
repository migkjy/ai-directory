import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, getAllSlugs, getAlternativeTools } from "@/lib/db";
import { getCategoryLabel, getCategoryColor, getCategoryIcon } from "@/lib/categories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: tool.meta_title || `${tool.name} - 가격, 사용법, 대안`,
    description:
      tool.meta_description ||
      `${tool.name}: ${tool.short_description || tool.description}. 가격 정보, 주요 기능, 대안 도구까지 AI AppPro에서 확인하세요.`,
    openGraph: {
      title: `${tool.name} - AI AppPro`,
      description: tool.short_description || tool.description,
      type: "article",
    },
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const alternatives = await getAlternativeTools(tool.alternatives || []);

  const pricingLabel: Record<string, string> = {
    free: "무료",
    freemium: "프리미엄 (무료+유료)",
    paid: "유료",
    enterprise: "엔터프라이즈",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.short_description || tool.description,
    "applicationCategory": getCategoryLabel(tool.category),
    "url": tool.url || undefined,
    "offers": {
      "@type": "Offer",
      "price": tool.pricing_type === "free" ? "0" : undefined,
      "priceCurrency": "USD",
      "description": tool.pricing_detail || undefined,
    },
    ...(tool.rating ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": Number(tool.rating).toFixed(1),
        "bestRating": "5",
        "ratingCount": "100",
      },
    } : {}),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              홈
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/category/${tool.category}`}
              className="hover:text-blue-600"
            >
              {getCategoryLabel(tool.category)}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{tool.name}</span>
          </nav>

          {/* Tool Header */}
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                {getCategoryIcon(tool.category)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {tool.name}
                  </h1>
                  {tool.is_featured && (
                    <span className="rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                      추천
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-block rounded-md border px-2 py-0.5 text-xs ${getCategoryColor(tool.category)}`}
                  >
                    {getCategoryLabel(tool.category)}
                  </span>
                  {tool.rating && (
                    <span className="text-sm text-gray-500">
                      {"★".repeat(Math.round(tool.rating))}{" "}
                      {Number(tool.rating).toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="mt-4 leading-relaxed text-gray-700">
              {tool.description}
            </p>

            {tool.url && (
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                공식 사이트 방문 &rarr;
              </a>
            )}
          </div>

          {/* Details Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            {/* Pricing */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                가격 정보
              </h2>
              <p className="text-sm font-medium text-gray-700">
                {pricingLabel[tool.pricing_type] || tool.pricing_type}
              </p>
              {tool.pricing_detail && (
                <p className="mt-2 text-sm text-gray-600">
                  {tool.pricing_detail}
                </p>
              )}
            </div>

            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="mb-3 text-lg font-semibold text-gray-900">
                  주요 기능
                </h2>
                <ul className="space-y-1.5">
                  {tool.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="mt-0.5 text-blue-500">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                태그
              </h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                대안 도구
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {alternatives.map((alt) => (
                  <ToolCard key={alt.id} tool={alt} />
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
