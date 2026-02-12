import type { Metadata } from "next";
import Link from "next/link";
import { getLatestIdeas, getIdeaCategories } from "@/lib/ideas-db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AI SaaS 아이디어 뱅크 - 매일 새로운 비즈니스 기회",
  description:
    "매일 1건 AI SaaS 비즈니스 아이디어 상세 리포트. 수익 모델, 기술 스택, 시장 분석까지 포함된 마이크로 SaaS 창업 아이디어.",
};

export default async function IdeasPage() {
  const [ideas, categories] = await Promise.all([
    getLatestIdeas(50),
    getIdeaCategories(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 px-4 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
              AI SaaS 아이디어 뱅크
            </h1>
            <p className="mx-auto max-w-xl text-lg text-purple-100">
              글로벌 AI 서비스를 분석하고, 실행 가능한 마이크로 SaaS 아이디어를
              상세 리포트로 제공합니다.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        {categories.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-purple-600 px-4 py-1.5 text-sm font-medium text-white">
                전체 ({ideas.length})
              </span>
              {categories.map((cat) => (
                <span
                  key={cat.category}
                  className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-600"
                >
                  {cat.category} ({cat.count})
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Ideas Grid */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          {ideas.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 py-16 text-center">
              <p className="text-lg font-medium text-gray-500">
                아이디어 리포트가 곧 추가됩니다.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                뉴스레터를 구독하면 새 아이디어가 발행될 때 알림을 받을 수
                있습니다.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ideas.map((idea) => (
                <Link key={idea.id} href={`/ideas/${idea.slug}`}>
                  <article className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-purple-300 hover:shadow-lg">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                        {idea.category}
                      </span>
                      {idea.difficulty && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          {idea.difficulty}
                        </span>
                      )}
                      {idea.estimated_revenue && (
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                          {idea.estimated_revenue}
                        </span>
                      )}
                    </div>
                    <h2 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-purple-700">
                      {idea.title}
                    </h2>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">
                      {idea.summary}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400">
                      <span>{idea.revenue_model}</span>
                      <span>
                        {new Date(idea.published_at).toLocaleDateString(
                          "ko-KR"
                        )}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
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
