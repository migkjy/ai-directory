import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">404</h1>
          <p className="mb-6 text-gray-600">페이지를 찾을 수 없습니다.</p>
          <Link
            href="/"
            className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
