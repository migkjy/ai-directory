import { Metadata } from "next";
import Link from "next/link";
import { getToolsByCategory } from "@/lib/db";
import {
  getCategoryLabel,
  getCategoryDescription,
  getCategoryIcon,
  CATEGORY_CONFIG,
} from "@/lib/categories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";

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
  const label = getCategoryLabel(category);
  const desc = getCategoryDescription(category);
  return {
    title: `${label} AI 도구 모음`,
    description:
      desc ||
      `${label} 분야의 AI 도구를 비교하고 찾아보세요. 가격, 기능, 대안까지 한눈에.`,
  };
}

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

  return (
    <div className="flex min-h-screen flex-col">
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

          <div className="mb-8">
            <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold text-gray-900">
              <span className="text-3xl">{icon}</span> {label} AI 도구
            </h1>
            {desc && <p className="text-gray-600">{desc}</p>}
            <p className="mt-2 text-sm text-gray-500">
              {tools.length}개 도구
            </p>
          </div>

          {tools.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 py-16 text-center">
              <p className="text-gray-500">
                이 카테고리에 등록된 도구가 없습니다.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
