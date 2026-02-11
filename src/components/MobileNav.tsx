"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
        aria-label="메뉴"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-gray-200 bg-white shadow-lg">
          <nav className="flex flex-col px-4 py-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              홈
            </Link>
            <Link
              href="/category"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              카테고리
            </Link>
            <Link
              href="/compare"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              비교
            </Link>
            <Link
              href="/submit"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-blue-600 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
            >
              도구 등록
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
