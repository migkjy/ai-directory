import { NextRequest, NextResponse } from "next/server";
import { getToolsPaginated, getToolsCount, searchTools } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
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
  } catch (error) {
    console.error("[API /api/tools] Failed to fetch tools:", error);
    return NextResponse.json(
      { error: "도구 목록을 불러오는데 실패했습니다.", tools: [], total: 0, hasMore: false },
      { status: 500 }
    );
  }
}
