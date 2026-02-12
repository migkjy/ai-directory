import type { Metadata } from "next";
import "./globals.css";
import PageTracker from "@/components/PageTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
    images: [
      {
        url: "/og?title=AI+AppPro&description=%ED%95%9C%EA%B5%AD+%EC%B5%9C%EA%B3%A0%EC%9D%98+AI+%EB%8F%84%EA%B5%AC+%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC",
        width: 1200,
        height: 630,
        alt: "AI AppPro - 한국 최고의 AI 도구 디렉토리",
      },
    ],
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
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="AI AppPro - AI 도구 디렉토리"
          href="/feed.xml"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <GoogleAnalytics />
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
