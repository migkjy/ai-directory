import type { Metadata } from "next";
import "./globals.css";
import PageTracker from "@/components/PageTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-directory-seven.vercel.app"),
  title: {
    default: "AI AppPro - 한국 최고의 AI 도구 디렉토리",
    template: "%s | AI AppPro",
  },
  description:
    "소상공인과 중소기업을 위한 AI 도구 가이드. 카테고리별 AI 서비스 비교, 가격, 사용법, 대안까지 한눈에.",
  keywords: [
    "AI 도구",
    "인공지능 서비스",
    "AI 추천",
    "소상공인 AI",
    "중소기업 AI",
    "AI 디렉토리",
    "AI 도구 비교",
  ],
  alternates: {
    canonical: "https://ai-directory-seven.vercel.app",
  },
  openGraph: {
    title: "AI AppPro - 한국 최고의 AI 도구 디렉토리",
    description:
      "소상공인과 중소기업을 위한 AI 도구 가이드. 카테고리별 AI 서비스 비교.",
    type: "website",
    locale: "ko_KR",
    siteName: "AI AppPro",
    url: "https://ai-directory-seven.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI AppPro - 한국 최고의 AI 도구 디렉토리",
    description:
      "소상공인과 중소기업을 위한 AI 도구 가이드. 카테고리별 AI 서비스 비교.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900 antialiased">
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
