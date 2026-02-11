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
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="AI 도구 검색... (예: ChatGPT, 이미지 생성, 코딩)"
        className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 pr-12 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
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
            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 pr-12 text-sm text-gray-900 shadow-sm placeholder:text-gray-400"
            disabled
          />
        </div>
      }
    >
      <SearchBarInner />
    </Suspense>
  );
}
