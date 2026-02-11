import { getAllTools, getCategories, searchTools, getFeaturedTools, getStats } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import NewsletterSignup from "@/components/NewsletterSignup";

export const revalidate = 3600;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const tools = q ? await searchTools(q) : await getAllTools();
  const categories = await getCategories();
  const counts: Record<string, number> = {};
  categories.forEach((c) => (counts[c.category] = c.count));

  const [featured, stats] = await Promise.all([
    getFeaturedTools(6),
    getStats(),
  ]);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI AppPro",
    "url": "https://ai-directory-seven.vercel.app",
    "description":
      "소상공인과 중소기업을 위한 AI 도구 가이드. 카테고리별 AI 서비스 비교, 가격, 사용법, 대안까지 한눈에.",
    "potentialAction": {
      "@type": "SearchAction",
      "target":
        "https://ai-directory-seven.vercel.app?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AI 도구 디렉토리",
    "numberOfItems": tools.length,
    "itemListElement": tools.slice(0, 10).map((tool, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": tool.name,
      "url": `https://ai-directory-seven.vercel.app/tools/${tool.slug}`,
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-4 py-20 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-blue-200">
              AI 도구 디렉토리
            </p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              비즈니스에 딱 맞는
              <br />
              AI 도구를 찾아보세요
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg text-blue-100">
              소상공인과 중소기업을 위한 AI 서비스 가이드.
              <br className="hidden sm:block" />
              카테고리별 비교, 가격, 사용법까지 한눈에 확인하세요.
            </p>
            <div className="flex justify-center">
              <SearchBar />
            </div>
            {/* Stats */}
            <div className="mt-10 flex items-center justify-center gap-8 sm:gap-16">
              <div>
                <p className="text-3xl font-bold">{stats.totalTools}+</p>
                <p className="text-sm text-blue-200">AI 도구</p>
              </div>
              <div className="h-10 w-px bg-blue-400/40" />
              <div>
                <p className="text-3xl font-bold">{stats.totalCategories}</p>
                <p className="text-sm text-blue-200">카테고리</p>
              </div>
              <div className="h-10 w-px bg-blue-400/40" />
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm text-blue-200">무료 이용</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tools */}
        {!q && featured.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                <span className="mr-2 inline-block rounded-md bg-yellow-100 px-2 py-0.5 text-sm font-medium text-yellow-700">
                  추천
                </span>
                인기 AI 도구
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-gray-900">카테고리</h2>
          <CategoryGrid counts={counts} />
        </section>

        {/* Tools Grid */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {q ? `"${q}" 검색 결과` : "전체 AI 도구"}
            </h2>
            <span className="text-sm text-gray-500">
              {tools.length}개 도구
            </span>
          </div>
          {tools.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 py-16 text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </section>

        {/* Blog Cross-link */}
        <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 text-center">
            <h2 className="mb-2 text-lg font-bold text-gray-900">
              AI 활용 블로그
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              AI 활용 가이드와 최신 트렌드를 블로그에서 확인하세요. 소상공인을
              위한 실전 AI 사용법을 알려드립니다.
            </p>
            <a
              href="https://content-pipeline-sage.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              블로그 바로가기 &rarr;
            </a>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <NewsletterSignup />
        </section>
      </main>
      <Footer />
    </div>
  );
}
