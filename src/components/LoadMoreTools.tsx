"use client";

import { useState, useCallback } from "react";
import ToolCard from "./ToolCard";
import type { AiTool } from "@/lib/db";

interface LoadMoreToolsProps {
  initialTools: AiTool[];
  totalCount: number;
  pageSize: number;
  searchQuery?: string;
}

export default function LoadMoreTools({
  initialTools,
  totalCount,
  pageSize,
  searchQuery,
}: LoadMoreToolsProps) {
  const [tools, setTools] = useState<AiTool[]>(initialTools);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialTools.length < totalCount);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        offset: tools.length.toString(),
        limit: pageSize.toString(),
      });
      if (searchQuery) params.set("q", searchQuery);
      const res = await fetch(`/api/tools?${params}`);
      const data = await res.json();
      setTools((prev) => [...prev, ...data.tools]);
      setHasMore(data.hasMore);
    } finally {
      setLoading(false);
    }
  }, [tools.length, pageSize, searchQuery, loading, hasMore]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                로딩 중...
              </span>
            ) : (
              `더 보기 (${tools.length}/${totalCount})`
            )}
          </button>
        </div>
      )}
      {!hasMore && tools.length > pageSize && (
        <p className="mt-6 text-center text-sm text-gray-400">
          전체 {totalCount}개 도구를 모두 표시했습니다
        </p>
      )}
    </>
  );
}
