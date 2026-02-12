import type { Metadata } from "next";
import { getLatestIdeas, getIdeaCategories } from "@/lib/ideas-db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import IdeasGrid from "@/components/IdeasGrid";

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
      <main className="flex-1 bg-gray-50/30">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 px-4 py-14 text-center text-white sm:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-purple-200">
              AI SaaS Idea Bank
            </p>
            <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
              AI SaaS 아이디어 뱅크
            </h1>
            <p className="mx-auto max-w-xl text-base text-purple-100 sm:text-lg">
              글로벌 AI 서비스를 분석하고, 실행 가능한 마이크로 SaaS 아이디어를
              상세 리포트로 제공합니다.
            </p>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-purple-200">
              <span>
                <strong className="text-white">{ideas.length}</strong> 리포트
              </span>
              <span className="h-4 w-px bg-purple-400/50" />
              <span>
                <strong className="text-white">{ideas.filter(i => i.tier === "premium").length}</strong> Premium
              </span>
              <span className="h-4 w-px bg-purple-400/50" />
              <span>
                <strong className="text-white">{categories.length}</strong> 카테고리
              </span>
            </div>
          </div>
        </section>

        {/* Interactive Grid with Search & Filters */}
        <IdeasGrid ideas={ideas} categories={categories} />

        {/* Newsletter */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <NewsletterSignup />
        </section>
      </main>
      <Footer />
    </div>
  );
}
