import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-gray-900">
              AI <span className="text-blue-600">AppPro</span>
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              매일 새로운 AI SaaS 비즈니스 아이디어. 글로벌 AI 서비스 분석과
              마이크로 SaaS 기회를 발견하세요.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              바로가기
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/ideas"
                  className="text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  아이디어 뱅크
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  AI 도구
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  도구 비교
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  도구 등록
                </Link>
              </li>
              <li>
                <a
                  href="https://content-pipeline-sage.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  AI 블로그 &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              인기 카테고리
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/writing"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  글쓰기
                </Link>
              </li>
              <li>
                <Link
                  href="/category/image"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  이미지 생성
                </Link>
              </li>
              <li>
                <Link
                  href="/category/coding"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  코딩
                </Link>
              </li>
              <li>
                <Link
                  href="/category/marketing"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  마케팅
                </Link>
              </li>
              <li>
                <Link
                  href="/category/video"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  영상
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AI AppPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
