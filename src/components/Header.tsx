import Link from "next/link";
import dynamic from "next/dynamic";

const MobileNav = dynamic(() => import("@/components/MobileNav"));

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">
            AI <span className="text-blue-600">AppPro</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="/ideas"
            className="text-sm font-semibold text-purple-600 hover:text-purple-700"
          >
            아이디어 뱅크
          </Link>
          <Link
            href="/category"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            AI 도구
          </Link>
          <Link
            href="/compare"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            비교
          </Link>
          <Link
            href="/submit"
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            도구 등록
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
