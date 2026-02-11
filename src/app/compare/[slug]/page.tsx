import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTwoToolsBySlugs, getToolsBySameCategory } from "@/lib/db";
import {
  getCategoryLabel,
  getCategoryColor,
  getCategoryIcon,
} from "@/lib/categories";
import {
  POPULAR_COMPARISONS,
  canonicalComparisonSlug,
  parseComparisonSlug,
} from "@/lib/comparisons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";

export const revalidate = 3600;

export async function generateStaticParams() {
  return POPULAR_COMPARISONS.map(([a, b]) => ({
    slug: canonicalComparisonSlug(a, b),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseComparisonSlug(slug);
  if (!parsed) return {};

  const [tool1, tool2] = await getTwoToolsBySlugs(parsed[0], parsed[1]);
  if (!tool1 || !tool2) return {};

  const title = `${tool1.name} vs ${tool2.name} 비교 - 어떤 AI 도구가 더 좋을까?`;
  const description = `${tool1.name}과 ${tool2.name}의 기능, 가격, 장단점을 비교합니다. 내 비즈니스에 맞는 AI 도구를 찾아보세요.`;

  return {
    title,
    description,
    openGraph: {
      title: `${tool1.name} vs ${tool2.name} - AI AppPro`,
      description,
      type: "article",
    },
  };
}

function CompareCell({
  label,
  value1,
  value2,
}: {
  label: string;
  value1: React.ReactNode;
  value2: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 border-b border-gray-100 py-4 last:border-b-0">
      <div>
        <p className="mb-1 text-xs font-medium text-gray-400 sm:hidden">
          {label}
        </p>
        {value1}
      </div>
      <div>
        <p className="mb-1 text-xs font-medium text-gray-400 sm:hidden">
          {label}
        </p>
        {value2}
      </div>
    </div>
  );
}

const pricingLabel: Record<string, string> = {
  free: "무료",
  freemium: "프리미엄 (무료+유료)",
  paid: "유료",
  enterprise: "엔터프라이즈",
};

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseComparisonSlug(slug);
  if (!parsed) notFound();

  const [tool1, tool2] = await getTwoToolsBySlugs(parsed[0], parsed[1]);
  if (!tool1 || !tool2) notFound();

  const relatedTools = await getToolsBySameCategory(
    tool1.category === tool2.category ? tool1.category : tool1.category,
    [tool1.slug, tool2.slug],
    4
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${tool1.name} vs ${tool2.name} 비교`,
    description: `${tool1.name}과 ${tool2.name}의 기능, 가격, 장단점 비교 분석`,
    about: [
      { "@type": "SoftwareApplication", name: tool1.name },
      { "@type": "SoftwareApplication", name: tool2.name },
    ],
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
            <Link href="/compare" className="hover:text-blue-600">
              비교
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">
              {tool1.name} vs {tool2.name}
            </span>
          </nav>

          {/* Title */}
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {tool1.name} vs {tool2.name}
          </h1>
          <p className="mb-8 text-gray-600">
            두 AI 도구의 기능, 가격, 장단점을 비교하여 내 비즈니스에 맞는
            도구를 찾아보세요.
          </p>

          {/* Comparison Table */}
          <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Header Row */}
            <div className="grid grid-cols-[1fr_1fr] gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                  {getCategoryIcon(tool1.category)}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">{tool1.name}</h2>
                  <span
                    className={`inline-block rounded-md border px-1.5 py-0.5 text-xs ${getCategoryColor(tool1.category)}`}
                  >
                    {getCategoryLabel(tool1.category)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                  {getCategoryIcon(tool2.category)}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">{tool2.name}</h2>
                  <span
                    className={`inline-block rounded-md border px-1.5 py-0.5 text-xs ${getCategoryColor(tool2.category)}`}
                  >
                    {getCategoryLabel(tool2.category)}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6">
              {/* Row labels visible on sm+ */}
              <div className="hidden border-b border-gray-100 py-3 sm:grid sm:grid-cols-[120px_1fr_1fr] sm:gap-4">
                <div className="text-xs font-semibold uppercase text-gray-400">
                  항목
                </div>
                <div className="text-xs font-semibold uppercase text-gray-400">
                  {tool1.name}
                </div>
                <div className="text-xs font-semibold uppercase text-gray-400">
                  {tool2.name}
                </div>
              </div>

              {/* Description */}
              <div className="border-b border-gray-100 py-4">
                <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
                  설명
                </p>
                <CompareCell
                  label="설명"
                  value1={
                    <p className="text-sm text-gray-700">
                      {tool1.short_description || tool1.description}
                    </p>
                  }
                  value2={
                    <p className="text-sm text-gray-700">
                      {tool2.short_description || tool2.description}
                    </p>
                  }
                />
              </div>

              {/* Pricing */}
              <div className="border-b border-gray-100 py-4">
                <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
                  가격
                </p>
                <CompareCell
                  label="가격 유형"
                  value1={
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {pricingLabel[tool1.pricing_type] || tool1.pricing_type}
                      </span>
                      {tool1.pricing_detail && (
                        <p className="mt-1 text-xs text-gray-500">
                          {tool1.pricing_detail}
                        </p>
                      )}
                    </div>
                  }
                  value2={
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {pricingLabel[tool2.pricing_type] || tool2.pricing_type}
                      </span>
                      {tool2.pricing_detail && (
                        <p className="mt-1 text-xs text-gray-500">
                          {tool2.pricing_detail}
                        </p>
                      )}
                    </div>
                  }
                />
              </div>

              {/* Rating */}
              <div className="border-b border-gray-100 py-4">
                <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
                  평점
                </p>
                <CompareCell
                  label="평점"
                  value1={
                    tool1.rating ? (
                      <span className="text-sm text-gray-700">
                        {"★".repeat(Math.round(tool1.rating))}{" "}
                        {Number(tool1.rating).toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )
                  }
                  value2={
                    tool2.rating ? (
                      <span className="text-sm text-gray-700">
                        {"★".repeat(Math.round(tool2.rating))}{" "}
                        {Number(tool2.rating).toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )
                  }
                />
              </div>

              {/* Features */}
              <div className="border-b border-gray-100 py-4">
                <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
                  주요 기능
                </p>
                <CompareCell
                  label="기능"
                  value1={
                    tool1.features && tool1.features.length > 0 ? (
                      <ul className="space-y-1">
                        {tool1.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-1.5 text-sm text-gray-600"
                          >
                            <span className="mt-0.5 text-blue-500">
                              &#10003;
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )
                  }
                  value2={
                    tool2.features && tool2.features.length > 0 ? (
                      <ul className="space-y-1">
                        {tool2.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-1.5 text-sm text-gray-600"
                          >
                            <span className="mt-0.5 text-purple-500">
                              &#10003;
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )
                  }
                />
              </div>

              {/* Tags */}
              <div className="py-4">
                <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
                  태그
                </p>
                <CompareCell
                  label="태그"
                  value1={
                    tool1.tags && tool1.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {tool1.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )
                  }
                  value2={
                    tool2.tags && tool2.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {tool2.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mb-10 grid grid-cols-2 gap-4">
            <Link
              href={`/tools/${tool1.slug}`}
              className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 text-center transition-colors hover:bg-blue-100"
            >
              <p className="font-semibold text-blue-700">{tool1.name}</p>
              <p className="mt-1 text-xs text-blue-600">
                상세 정보 보기 &rarr;
              </p>
            </Link>
            <Link
              href={`/tools/${tool2.slug}`}
              className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-4 text-center transition-colors hover:bg-purple-100"
            >
              <p className="font-semibold text-purple-700">{tool2.name}</p>
              <p className="mt-1 text-xs text-purple-600">
                상세 정보 보기 &rarr;
              </p>
            </Link>
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                비슷한 AI 도구
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          )}

          {/* Other Comparisons */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              다른 인기 비교
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {POPULAR_COMPARISONS.filter(
                ([a, b]) =>
                  !(
                    (a === tool1.slug && b === tool2.slug) ||
                    (a === tool2.slug && b === tool1.slug)
                  )
              )
                .slice(0, 8)
                .map(([a, b]) => (
                  <Link
                    key={`${a}-${b}`}
                    href={`/compare/${canonicalComparisonSlug(a, b)}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50"
                  >
                    <span>
                      {a.replace(/-/g, " ")} vs {b.replace(/-/g, " ")}
                    </span>
                    <span className="text-gray-400">&rarr;</span>
                  </Link>
                ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/compare"
                className="text-sm text-blue-600 hover:underline"
              >
                모든 비교 보기 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
