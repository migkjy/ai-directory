# AI Directory Architecture

## Directory Structure
```
ai-directory/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # 홈 (AI 도구 목록)
│   │   ├── layout.tsx          # Root layout
│   │   ├── tools/[slug]/       # 도구 상세 페이지 (프로그래매틱 SEO)
│   │   ├── category/           # 카테고리 목록 + [category] 상세
│   │   ├── compare/            # 도구 비교 페이지 + [slug]
│   │   ├── ideas/              # 아이디어 페이지 + [slug]
│   │   ├── submit/             # 도구 제출 폼
│   │   ├── api/tools/route.ts  # 도구 API
│   │   ├── api/track/route.ts  # 트래킹 API
│   │   ├── feed.xml/route.ts   # RSS 피드
│   │   ├── sitemap.ts          # 동적 사이트맵
│   │   ├── robots.ts           # robots.txt
│   │   ├── manifest.ts         # PWA manifest
│   │   ├── og/route.tsx        # OG 이미지 생성
│   │   └── icon.tsx            # 동적 favicon
│   ├── components/             # UI 컴포넌트
│   │   ├── CategoryGrid.tsx
│   │   ├── CategoryToolsGrid.tsx
│   │   ├── IdeasGrid.tsx
│   │   ├── NewsletterSignup.tsx
│   │   ├── ShareButtons.tsx
│   │   └── ... (13+ components)
│   ├── actions/                # Server Actions
│   └── lib/                    # 유틸/데이터
│       ├── db.ts               # NeonDB 연결 (Drizzle)
│       ├── categories.ts       # 카테고리 정의
│       ├── comparisons.ts      # 비교 데이터
│       ├── ideas-db.ts         # 아이디어 DB
│       └── blog-links.ts       # 블로그 내부링크
├── scripts/
│   ├── crawl.ts                # Firecrawl 크롤링 스크립트
│   └── generate-report.ts      # AI 리포트 생성
├── .env.local                  # 환경변수 (gitignored)
└── package.json
```

## Data Flow
```
[Firecrawl 크롤링] → [Claude API 분류/요약] → [NeonDB 저장]
                                                     ↓
                                        [Next.js SSR/ISR 페이지 렌더]
                                                     ↓
                                        [프로그래매틱 SEO 랜딩]
```

## DB
- Provider: NeonDB (Serverless Postgres)
- ORM: Drizzle
- Connection: `@neondatabase/serverless` + WebSocket (`ws`)
- DB name: `db_ai_saas`

## Key Patterns
- App Router with dynamic routes for SEO pages
- Server Components (default) + Client Components (forms, interactivity)
- RSS feed + sitemap + robots.txt for SEO
- OG image generation via route handler
