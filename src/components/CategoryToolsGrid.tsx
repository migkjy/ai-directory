"use client";

import { useState } from "react";
import { AiTool } from "@/lib/db";
import ToolCard from "@/components/ToolCard";

type SortOption = "name" | "rating" | "newest";
type PricingFilter = "all" | "free" | "freemium" | "paid" | "enterprise";

export default function CategoryToolsGrid({ tools }: { tools: AiTool[] }) {
  const [sort, setSort] = useState<SortOption>("name");
  const [pricing, setPricing] = useState<PricingFilter>("all");

  const filtered = tools.filter(
    (t) => pricing === "all" || t.pricing_type === pricing
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const pricingOptions: { value: PricingFilter; label: string }[] = [
    { value: "all", label: "전체" },
    { value: "free", label: "무료" },
    { value: "freemium", label: "프리미엄" },
    { value: "paid", label: "유료" },
    { value: "enterprise", label: "엔터프라이즈" },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "name", label: "이름순" },
    { value: "rating", label: "평점순" },
    { value: "newest", label: "최신순" },
  ];

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Pricing Filter */}
        <div className="flex flex-wrap gap-1.5">
          {pricingOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPricing(opt.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                pricing === opt.value
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-400">정렬:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-gray-500">
        {sorted.length}개 도구
        {pricing !== "all" && ` (${pricingOptions.find((o) => o.value === pricing)?.label} 필터)`}
      </p>

      {/* Grid */}
      {sorted.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 py-16 text-center">
          <p className="text-gray-500">
            조건에 맞는 도구가 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
