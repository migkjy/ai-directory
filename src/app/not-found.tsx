import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { CATEGORY_CONFIG } from "@/lib/categories";

const popularCategories = Object.entries(CATEGORY_CONFIG).slice(0, 6);

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-6xl font-extrabold text-blue-600">404</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="mt-2 text-gray-600">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-gray-500">
              찾고 있는 AI 도구를 검색해보세요
            </p>
            <div className="flex justify-center">
              <SearchBar />
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-gray-500">
              인기 카테고리
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularCategories.map(([key, config]) => (
                <Link
                  key={key}
                  href={`/category/${key}`}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                >
                  {config.icon} {config.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              &larr; 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
