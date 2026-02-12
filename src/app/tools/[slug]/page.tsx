import { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getToolBySlug, getAllSlugs, getAlternativeTools } from "@/lib/db";
import {
  getCategoryLabel,
  getCategoryColor,
  getCategoryIcon,
} from "@/lib/categories";
import { canonicalComparisonSlug } from "@/lib/comparisons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { getToolBlogLinks } from "@/lib/blog-links";

const ShareButtons = dynamic(() => import("@/components/ShareButtons"), {
  loading: () => <div className="h-8" />,
});

const BASE_URL = "https://ai-directory-seven.vercel.app";

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
  const title = tool.meta_title || `${tool.name} - 가격, 사용법, 대안`;
  const description =
    tool.meta_description ||
    `${tool.name}: ${tool.short_description || tool.description}. 가격 정보, 주요 기능, 대안 도구까지 AI AppPro에서 확인하세요.`;
  const url = `${BASE_URL}/tools/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.name} - AI AppPro`,
      description: tool.short_description || tool.description,
      type: "article",
      url,
      siteName: "AI AppPro",
      images: [
        {
          url: `/og?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(tool.short_description || tool.description || "")}&category=${encodeURIComponent(getCategoryLabel(tool.category))}`,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} - AI AppPro`,
      description: tool.short_description || tool.description,
    },
  };
}

const PRICING_CONFIG: Record<
  string,
  { label: string; className: string; icon: string }
> = {
  free: {
    label: "무료",
    className: "bg-green-100 text-green-700 border-green-200",
    icon: "✓",
  },
  freemium: {
    label: "프리미엄 (무료+유료)",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    icon: "◈",
  },
  paid: {
    label: "유료",
    className: "bg-orange-100 text-orange-700 border-orange-200",
    icon: "$",
  },
  enterprise: {
    label: "엔터프라이즈",
    className: "bg-purple-100 text-purple-700 border-purple-200",
    icon: "★",
  },
};

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const alternatives = await getAlternativeTools(tool.alternatives || []);
  const blogLinks = getToolBlogLinks(slug);
  const pageUrl = `${BASE_URL}/tools/${slug}`;
  const pricing = PRICING_CONFIG[tool.pricing_type] || PRICING_CONFIG.freemium;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.short_description || tool.description,
    applicationCategory: getCategoryLabel(tool.category),
    url: tool.url || undefined,
    offers: {
      "@type": "Offer",
      price: tool.pricing_type === "free" ? "0" : undefined,
      priceCurrency: "USD",
      description: tool.pricing_detail || undefined,
    },
    ...(tool.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(tool.rating).toFixed(1),
            bestRating: "5",
            ratingCount: "100",
          },
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: getCategoryLabel(tool.category), item: `${BASE_URL}/category/${tool.category}` },
      { "@type": "ListItem", position: 3, name: tool.name },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                  {getCategoryIcon(tool.category)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
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
                    <span
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${pricing.className}`}
                    >
                      <span>{pricing.icon}</span>
                      {pricing.label}
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
            </div>

            <p className="mt-4 leading-relaxed text-gray-700">
              {tool.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {tool.url && (
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  공식 사이트 방문 &rarr;
                </a>
              )}
              <ShareButtons url={pageUrl} title={`${tool.name} - AI AppPro`} />
            </div>
          </div>

          {/* Details Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            {/* Pricing */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                가격 정보
              </h2>
              <div
                className={`mb-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium ${pricing.className}`}
              >
                <span className="text-base">{pricing.icon}</span>
                {pricing.label}
              </div>
              {tool.pricing_detail && (
                <p className="text-sm leading-relaxed text-gray-600">
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
              <h2 className="mb-3 text-lg font-semibold text-gray-900">태그</h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?q=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {tag}
                  </Link>
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
              {/* Comparison Links */}
              <div className="mt-4 flex flex-wrap gap-2">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.slug}
                    href={`/compare/${canonicalComparisonSlug(tool.slug, alt.slug)}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {tool.name} vs {alt.name}
                    <span className="text-gray-400">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/* Related Blog Posts */}
          {blogLinks.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                관련 블로그 글
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {blogLinks.map((link) => (
                  <a
                    key={link.slug}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-blue-300 hover:bg-blue-50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      &#128214;
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                        {link.title}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        AI AppPro 블로그 &rarr;
                      </p>
                    </div>
                  </a>
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
