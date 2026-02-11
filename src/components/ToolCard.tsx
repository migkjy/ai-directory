import Link from "next/link";
import { AiTool } from "@/lib/db";
import { getCategoryLabel, getCategoryColor, getCategoryIcon } from "@/lib/categories";

function PricingBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; className: string }> = {
    free: { label: "무료", className: "bg-green-100 text-green-700" },
    freemium: { label: "프리미엄", className: "bg-blue-100 text-blue-700" },
    paid: { label: "유료", className: "bg-orange-100 text-orange-700" },
    enterprise: { label: "엔터프라이즈", className: "bg-purple-100 text-purple-700" },
  };
  const c = config[type] || config.freemium;
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${c.className}`}>
      {c.label}
    </span>
  );
}

export default function ToolCard({ tool }: { tool: AiTool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-lg">
            {getCategoryIcon(tool.category)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
              {tool.name}
            </h3>
            <span className={`inline-block mt-0.5 rounded-md border px-1.5 py-0.5 text-xs ${getCategoryColor(tool.category)}`}>
              {getCategoryLabel(tool.category)}
            </span>
          </div>
        </div>
        {tool.is_featured && (
          <span className="rounded-md bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
            추천
          </span>
        )}
      </div>
      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
        {tool.short_description || tool.description}
      </p>
      <div className="flex items-center justify-between">
        <PricingBadge type={tool.pricing_type} />
        {tool.rating && (
          <span className="text-sm text-gray-500">
            {"★".repeat(Math.round(tool.rating))}{" "}
            {Number(tool.rating).toFixed(1)}
          </span>
        )}
      </div>
    </Link>
  );
}
