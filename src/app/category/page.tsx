import { Metadata } from "next";
import { getCategories } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";

export const metadata: Metadata = {
  title: "AI 도구 카테고리",
  description:
    "글쓰기, 이미지 생성, 코딩, 마케팅 등 카테고리별로 AI 도구를 탐색하세요.",
};

export const revalidate = 3600;

export default async function CategoryPage() {
  const categories = await getCategories();
  const counts: Record<string, number> = {};
  categories.forEach((c) => (counts[c.category] = c.count));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            AI 도구 카테고리
          </h1>
          <p className="mb-8 text-gray-600">
            관심 분야를 선택하여 AI 도구를 탐색하세요.
          </p>
          <CategoryGrid counts={counts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
