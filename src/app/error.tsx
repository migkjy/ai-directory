"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <p className="text-6xl font-extrabold text-red-500">500</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          문제가 발생했습니다
        </h1>
        <p className="mt-2 text-gray-600">
          일시적인 오류입니다. 잠시 후 다시 시도해주세요.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
