"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function SearchBarInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <svg
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="AI 도구 검색... (예: ChatGPT, 이미지 생성, 코딩)"
        className="w-full rounded-xl border border-white/20 bg-white/10 py-3.5 pl-12 pr-20 text-sm text-white shadow-lg backdrop-blur-sm placeholder:text-white/60 focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50"
      >
        검색
      </button>
    </form>
  );
}

export default function SearchBar() {
  return (
    <Suspense
      fallback={
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="AI 도구 검색..."
            className="w-full rounded-xl border border-white/20 bg-white/10 py-3.5 pl-12 pr-20 text-sm text-white shadow-lg backdrop-blur-sm placeholder:text-white/60"
            disabled
          />
        </div>
      }
    >
      <SearchBarInner />
    </Suspense>
  );
}
