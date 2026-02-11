import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">
            AI <span className="text-blue-600">AppPro</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            홈
          </Link>
          <Link
            href="/category"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            카테고리
          </Link>
        </nav>
      </div>
    </header>
  );
}
