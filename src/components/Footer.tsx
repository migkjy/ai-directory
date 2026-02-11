import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <Link href="/" className="text-lg font-bold text-gray-900">
              AI <span className="text-blue-600">AppPro</span>
            </Link>
            <p className="mt-1 text-sm text-gray-500">
              소상공인과 중소기업을 위한 AI 도구 가이드
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <a
              href="https://content-pipeline-sage.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              AI 블로그 &mdash; 활용 가이드 &amp; 최신 트렌드 &rarr;
            </a>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} AI AppPro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
