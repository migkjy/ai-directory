import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "AI AppPro";
  const description = searchParams.get("description") || "한국 최고의 AI 도구 디렉토리";
  const category = searchParams.get("category") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #6366f1 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {category && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              {category}
            </span>
          </div>
        )}
        <div
          style={{
            fontSize: title.length > 30 ? "48px" : "56px",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "24px",
            opacity: 0.85,
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          {description.length > 100 ? description.slice(0, 100) + "..." : description}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: "40px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              opacity: 0.9,
            }}
          >
            AI AppPro
          </div>
          <div
            style={{
              marginLeft: "16px",
              fontSize: "20px",
              opacity: 0.6,
            }}
          >
            ai-directory-seven.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
