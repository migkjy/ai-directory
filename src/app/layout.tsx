import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import PageTracker from "@/components/PageTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-directory-seven.vercel.app"),
  title: {
    default: "AI AppPro - AI SaaS 아이디어 뱅크 | 매일 새로운 AI 비즈니스 아이디어",
    template: "%s | AI AppPro",
  },
  description:
    "매일 1건 AI SaaS 비즈니스 아이디어 상세 리포트. 글로벌 AI 서비스 분석, 수익 모델, 마이크로 SaaS 기회를 발견하세요. AI 도구 디렉토리 포함.",
  keywords: [
    "AI SaaS 아이디어",
    "AI 비즈니스",
    "마이크로 SaaS",
    "AI 도구",
    "AI 서비스 분석",
    "AI 창업 아이디어",
    "소상공인 AI",
    "AI 디렉토리",
    "AI 수익 모델",
  ],
  alternates: {
    canonical: "https://ai-directory-seven.vercel.app",
  },
  openGraph: {
    title: "AI AppPro - AI SaaS 아이디어 뱅크",
    description:
      "매일 1건 AI 비즈니스 아이디어 리포트. 글로벌 AI 서비스 분석과 마이크로 SaaS 기회.",
    type: "website",
    locale: "ko_KR",
    siteName: "AI AppPro",
    url: "https://ai-directory-seven.vercel.app",
    images: [
      {
        url: "/og?title=AI+AppPro&description=AI+SaaS+%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4+%EB%B1%85%ED%81%AC",
        width: 1200,
        height: 630,
        alt: "AI AppPro - AI SaaS 아이디어 뱅크",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI AppPro - AI SaaS 아이디어 뱅크",
    description:
      "매일 1건 AI 비즈니스 아이디어 리포트. 글로벌 AI 서비스 분석과 마이크로 SaaS 기회.",
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
          title="AI AppPro - AI SaaS 아이디어 뱅크"
          href="/feed.xml"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <GoogleAnalytics />
        <PageTracker />
        <Toaster position="top-right" richColors closeButton />
        {children}
      </body>
    </html>
  );
}
