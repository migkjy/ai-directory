import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getLatestIdeas, getIdeaCategories } from "@/lib/ideas-db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const IdeasGrid = dynamic(() => import("@/components/IdeasGrid"), {
  loading: () => (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="mb-3 flex gap-2">
              <div className="h-6 w-16 rounded-md bg-gray-200" />
              <div className="h-6 w-20 rounded-md bg-gray-100" />
            </div>
            <div className="mb-2 h-5 w-4/5 rounded bg-gray-200" />
            <div className="mb-1 h-4 w-full rounded bg-gray-100" />
            <div className="mb-4 h-4 w-3/5 rounded bg-gray-100" />
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <div className="h-3 w-16 rounded bg-gray-100" />
                <div className="h-3 w-20 rounded bg-gray-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  ),
});

const NewsletterSignup = dynamic(
  () => import("@/components/NewsletterSignup"),
);

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AI SaaS 아이디어 뱅크 - 매일 새로운 비즈니스 기회",
  description:
    "매일 1건 AI SaaS 비즈니스 아이디어 상세 리포트. 수익 모델, 기술 스택, 시장 분석까지 포함된 마이크로 SaaS 창업 아이디어.",
  alternates: {
    canonical: "https://ai-directory-seven.vercel.app/ideas",
  },
  openGraph: {
    title: "AI SaaS 아이디어 뱅크 - AI AppPro",
    description:
      "매일 1건 AI SaaS 비즈니스 아이디어 상세 리포트. 수익 모델, 기술 스택, 시장 분석까지.",
    type: "website",
    url: "https://ai-directory-seven.vercel.app/ideas",
    siteName: "AI AppPro",
    images: [
      {
        url: "/og?title=AI+SaaS+%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4+%EB%B1%85%ED%81%AC&description=%EB%A7%A4%EC%9D%BC+1%EA%B1%B4+AI+%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4+%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4+%EB%A6%AC%ED%8F%AC%ED%8A%B8",
        width: 1200,
        height: 630,
        alt: "AI SaaS 아이디어 뱅크",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SaaS 아이디어 뱅크 - AI AppPro",
    description:
      "매일 1건 AI SaaS 비즈니스 아이디어 상세 리포트. 수익 모델, 기술 스택, 시장 분석까지.",
  },
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
