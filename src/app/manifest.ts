import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI AppPro - AI 도구 디렉토리",
    short_name: "AI AppPro",
    description: "소상공인과 중소기업을 위한 AI 도구 가이드. 카테고리별 AI 서비스 비교, 가격, 사용법, 대안까지 한눈에.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
