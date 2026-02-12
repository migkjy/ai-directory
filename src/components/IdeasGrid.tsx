"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { AiIdea } from "@/lib/ideas-db";

interface IdeasGridProps {
  ideas: AiIdea[];
  categories: { category: string; count: number }[];
}

function IdeaCard({ idea }: { idea: AiIdea }) {
  const isPremium = idea.tier === "premium";

  return (
    <Link href={`/ideas/${idea.slug}`}>
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${
          isPremium
            ? "border-amber-200/80 shadow-sm shadow-amber-100/50 hover:border-amber-300"
            : "border-gray-200 hover:border-purple-300"
        }`}
      >
        {/* Premium accent bar */}
        {isPremium && (
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
        )}

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* Top row: badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {isPremium ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-amber-500 to-yellow-500 px-2.5 py-1 text-xs font-bold tracking-wide text-white shadow-sm">
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Premium
              </span>
            ) : (
              <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                Lite
              </span>
            )}
            <span className="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-600">
              {idea.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-purple-700 sm:text-lg">
            {idea.title}
          </h2>

          {/* Summary */}
          <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-3">
            {idea.summary}
          </p>

          {/* Meta chips */}
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            {idea.difficulty && (
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                {idea.difficulty}
              </span>
            )}
            {idea.estimated_revenue && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                {idea.estimated_revenue}
              </span>
            )}
            {isPremium && idea.feasibility && (
              <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-600">
                실현성 {idea.feasibility.score}/10
              </span>
            )}
            {isPremium && idea.overseas_cases && idea.overseas_cases.length > 0 && (
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
                해외 사례 {idea.overseas_cases.length}건
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-xs font-medium text-gray-400">{idea.revenue_model}</span>
            <span className="text-xs text-gray-400">
              {new Date(idea.published_at).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function IdeaCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-3 flex gap-2">
        <div className="h-6 w-16 rounded-md bg-gray-200" />
        <div className="h-6 w-20 rounded-md bg-gray-100" />
      </div>
      <div className="mb-2 h-5 w-4/5 rounded bg-gray-200" />
      <div className="mb-1 h-4 w-full rounded bg-gray-100" />
      <div className="mb-1 h-4 w-full rounded bg-gray-100" />
      <div className="mb-4 h-4 w-3/5 rounded bg-gray-100" />
      <div className="mb-3 flex gap-2">
        <div className="h-5 w-14 rounded-full bg-gray-100" />
        <div className="h-5 w-20 rounded-full bg-gray-100" />
      </div>
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between">
          <div className="h-3 w-16 rounded bg-gray-100" />
          <div className="h-3 w-20 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export default function IdeasGrid({ ideas, categories }: IdeasGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "premium" | "lite" | string>("all");

  const premiumCount = ideas.filter((i) => i.tier === "premium").length;
  const liteCount = ideas.filter((i) => i.tier !== "premium").length;

  const filteredIdeas = useMemo(() => {
    let result = ideas;

    // Tier / category filter
    if (activeFilter === "premium") {
      result = result.filter((i) => i.tier === "premium");
    } else if (activeFilter === "lite") {
      result = result.filter((i) => i.tier !== "premium");
    } else if (activeFilter !== "all") {
      result = result.filter((i) => i.category === activeFilter);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.summary.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          (i.revenue_model && i.revenue_model.toLowerCase().includes(q))
      );
    }

    return result;
  }, [ideas, activeFilter, searchQuery]);

  const hasActiveFilter = activeFilter !== "all" || searchQuery.trim() !== "";

  return (
    <>
      {/* Search + Filter Bar */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        {/* Search */}
        <div className="relative mb-4">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="아이디어 검색... (예: SaaS, 자동화, 마케팅)"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill
            label={`전체 (${ideas.length})`}
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          />
          {premiumCount > 0 && (
            <FilterPill
              label={`Premium (${premiumCount})`}
              active={activeFilter === "premium"}
              onClick={() => setActiveFilter("premium")}
              variant="premium"
            />
          )}
          {liteCount > 0 && (
            <FilterPill
              label={`Lite (${liteCount})`}
              active={activeFilter === "lite"}
              onClick={() => setActiveFilter("lite")}
            />
          )}
          <span className="mx-1 h-4 w-px bg-gray-200" />
          {categories.map((cat) => (
            <FilterPill
              key={cat.category}
              label={`${cat.category} (${cat.count})`}
              active={activeFilter === cat.category}
              onClick={() => setActiveFilter(cat.category)}
            />
          ))}
          {hasActiveFilter && (
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="ml-1 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              초기화
            </button>
          )}
        </div>
      </section>

      {/* Results count */}
      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <p className="text-sm text-gray-400">
          {filteredIdeas.length}개 리포트
          {searchQuery.trim() && (
            <span>
              {" "}
              &middot; &quot;{searchQuery}&quot; 검색 결과
            </span>
          )}
        </p>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {filteredIdeas.length === 0 ? (
          <EmptyState query={searchQuery} filter={activeFilter} onReset={() => { setActiveFilter("all"); setSearchQuery(""); }} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  variant,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: "premium";
}) {
  if (variant === "premium") {
    return (
      <button
        onClick={onClick}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
          active
            ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-sm"
            : "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
        active
          ? "bg-purple-600 text-white shadow-sm"
          : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function EmptyState({
  query,
  filter,
  onReset,
}: {
  query: string;
  filter: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 px-6 py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <h3 className="mb-1 text-lg font-semibold text-gray-700">검색 결과가 없습니다</h3>
      <p className="mb-6 max-w-sm text-sm text-gray-400">
        {query
          ? `"${query}"에 대한 결과를 찾을 수 없습니다. 다른 검색어를 시도해 보세요.`
          : `선택한 필터에 해당하는 리포트가 없습니다.`}
      </p>
      <button
        onClick={onReset}
        className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-700"
      >
        필터 초기화
      </button>
    </div>
  );
}

export { IdeaCardSkeleton };
