import Link from "next/link";
import { getCategories, searchTools, getToolsPaginated, getToolsCount, getFeaturedTools, getStats } from "@/lib/db";
import { getLatestIdeas } from "@/lib/ideas-db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import NewsletterSignup from "@/components/NewsletterSignup";
import LoadMoreTools from "@/components/LoadMoreTools";

export const revalidate = 3600;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const PAGE_SIZE = 30;
  const { q } = await searchParams;
  const categories = await getCategories();
  const counts: Record<string, number> = {};
  categories.forEach((c) => (counts[c.category] = c.count));

  const [tools, totalCount, featured, stats, latestIdeas] = await Promise.all([
    q ? searchTools(q) : getToolsPaginated(0, PAGE_SIZE),
    q ? searchTools(q).then((t) => t.length) : getToolsCount(),
    getFeaturedTools(6),
    getStats(),
    getLatestIdeas(3),
  ]);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI AppPro",
    "url": "https://ai-directory-seven.vercel.app",
    "description":
      "매일 1건 AI SaaS 비즈니스 아이디어 리포트. 글로벌 AI 서비스 분석과 마이크로 SaaS 기회.",
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
        {/* Hero - AI SaaS Idea Bank */}
        <section className="bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 px-4 py-20 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-purple-200">
              AI SaaS 아이디어 뱅크
            </p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              매일 1건, AI 비즈니스
              <br />
              아이디어 상세 리포트
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg text-purple-100">
              글로벌 AI 서비스를 분석하고, 새로운 마이크로 SaaS 기회를 발견하세요.
              <br className="hidden sm:block" />
              아이디어 분석, 수익 모델, 기술 스택까지 한눈에.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/ideas"
                className="rounded-lg bg-white px-8 py-3.5 text-sm font-bold text-purple-700 shadow-lg transition-colors hover:bg-purple-50"
              >
                아이디어 리포트 보기
              </Link>
              <div className="flex justify-center">
                <SearchBar />
              </div>
            </div>
            {/* Stats */}
            <div className="mt-10 flex items-center justify-center gap-8 sm:gap-16">
              <div>
                <p className="text-3xl font-bold">{latestIdeas.length}+</p>
                <p className="text-sm text-purple-200">아이디어 리포트</p>
              </div>
              <div className="h-10 w-px bg-purple-400/40" />
              <div>
                <p className="text-3xl font-bold">{stats.totalTools}+</p>
                <p className="text-sm text-purple-200">AI 도구 분석</p>
              </div>
              <div className="h-10 w-px bg-purple-400/40" />
              <div>
                <p className="text-3xl font-bold">{stats.totalCategories}</p>
                <p className="text-sm text-purple-200">카테고리</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Idea Reports */}
        {!q && latestIdeas.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                <span className="mr-2 inline-block rounded-md bg-purple-100 px-2 py-0.5 text-sm font-medium text-purple-700">
                  NEW
                </span>
                최신 아이디어 리포트
              </h2>
              <Link
                href="/ideas"
                className="text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                전체 보기 &rarr;
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestIdeas.map((idea) => (
                <Link key={idea.id} href={`/ideas/${idea.slug}`}>
                  <div className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-purple-300 hover:shadow-md">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                        {idea.category}
                      </span>
                      {idea.difficulty && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          {idea.difficulty}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-2 text-base font-bold text-gray-900 group-hover:text-purple-700">
                      {idea.title}
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-500">
                      {idea.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{idea.revenue_model}</span>
                      <span>{new Date(idea.published_at).toLocaleDateString("ko-KR")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

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
              {totalCount}개 도구
            </span>
          </div>
          {tools.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 py-16 text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          ) : q ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <LoadMoreTools
              initialTools={tools}
              totalCount={totalCount}
              pageSize={PAGE_SIZE}
            />
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
