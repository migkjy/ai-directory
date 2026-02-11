import Link from "next/link";
import { CATEGORY_CONFIG } from "@/lib/categories";

export default function CategoryGrid({
  counts,
}: {
  counts: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
        <Link
          key={key}
          href={`/category/${key}`}
          className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all hover:shadow-md ${config.color}`}
        >
          <span className="text-2xl">{config.icon}</span>
          <span className="text-sm font-medium">{config.label}</span>
          {counts[key] !== undefined && (
            <span className="text-xs opacity-70">{counts[key]}개 도구</span>
          )}
        </Link>
      ))}
    </div>
  );
}
