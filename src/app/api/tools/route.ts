import { NextRequest, NextResponse } from "next/server";
import { getToolsPaginated, getToolsCount, searchTools } from "@/lib/db";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const offset = parseInt(sp.get("offset") || "0", 10);
  const limit = parseInt(sp.get("limit") || "30", 10);
  const category = sp.get("category") || undefined;
  const q = sp.get("q") || undefined;

  if (q) {
    const tools = await searchTools(q);
    return NextResponse.json({ tools, total: tools.length, hasMore: false });
  }

  const [tools, total] = await Promise.all([
    getToolsPaginated(offset, Math.min(limit, 60), category),
    getToolsCount(category),
  ]);

  return NextResponse.json({
    tools,
    total,
    hasMore: offset + tools.length < total,
  });
}
