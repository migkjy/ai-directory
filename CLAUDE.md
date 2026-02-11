# AI Directory - AI 서비스 큐레이션 SaaS

## 프로젝트 개요

AI 도구/서비스를 자동 수집·분류·큐레이션하여 사용자에게 제공하는 SaaS.
CEO 보유 크롤링 데이터를 시딩 자산으로 활용. 한국 시장 블루오션 타겟.

## 태스크 ID

`2fa16d40-012d-465c-9815-c8040286ddac` (AI Trending 컨텐츠 서비스 구축)

## MVP 스펙 (v0.1)

### 핵심 기능
1. **AI 도구 디렉토리**: 카테고리별 AI 서비스 목록 + 검색/필터
2. **자동 수집**: Firecrawl + Claude API로 신규 도구 자동 크롤링·분류·요약
3. **도구별 상세 페이지**: 프로그래매틱 SEO 랜딩 (설명, 가격, 대안, 리뷰)
4. **CEO 기존 데이터 시딩**: 보유 크롤링 DB를 초기 데이터로 마이그레이션

### MVP Cut (v0.2 이후)
- Featured Listing 유료 등록 시스템
- 뉴스레터 자동 발행 (신규 도구 위클리)
- 사용자 리뷰/평점 시스템
- 프리미엄 구독 (고급 필터, 알림)
- SNS 자동 배포 (getlate.dev)

## 기술 스택

| 구성요소 | 기술 | 비고 |
|---------|------|------|
| 베이스 | Cult Directory Template ($119) | AI Enrichment 파이프라인 내장 |
| 프레임워크 | Next.js (App Router) | 템플릿 기반 커스텀 |
| UI | Shadcn + Tailwind CSS | 템플릿 포함 |
| DB | NeonDB | 기존 인프라 (Supabase→NeonDB 전환) |
| ORM | Drizzle ORM | CEO 방침 준수 |
| 크롤링 | Firecrawl (Free~$16/월) | CLI/API 방식 |
| AI 가공 | Claude Sonnet API | 분류/요약/태그 자동 생성 |
| SEO | 프로그래매틱 SEO | 도구별 자동 랜딩 |
| 배포 | Vercel | 초기 저비용 |

## 경쟁 분석 요약

| 경쟁사 | 월 트래픽 | 차별점 |
|--------|----------|--------|
| TAAFT | 8.5M | Featured $347, 뉴스레터 2.7M |
| Toolify | 5.1M | 26K+ 도구, 450+ 카테고리 |
| FutureTools | 390K | 인플루언서 기반 |
| 한국 시장 | 블루오션 | 본격 SaaS 부재 |

## 비용

| 항목 | 초기 | 월간 (초기) | 월간 (성장) |
|------|------|-----------|-----------|
| 템플릿 | $119 (1회) | - | - |
| 도메인 | $12/년 | - | - |
| Vercel | - | 무료~$20 | $20 |
| NeonDB | - | 무료~$19 | $69 |
| Firecrawl | - | 무료~$16 | $56 |
| Claude API | - | $3~$8 | $19~$79 |
| **합계** | **~$131** | **$27~$63** | **$164~$324** |

**예상 수익 (100K 방문 시)**: $1,100~$4,300/월
**BEP**: 1-2개월

## 수익 모델

1. **Featured Listing**: AI 서비스 업체가 상위 노출 비용 지불 ($50-347/건)
2. **제휴 링크**: 도구 사이트로의 레퍼럴 (15-50% 커미션)
3. **뉴스레터 스폰서**: 주간 신규 도구 뉴스레터에 광고
4. **프리미엄 구독** (v0.2): 고급 필터, 알림, API 접근

## 자동화 목표

```json
{
  "ceo_initial": ["방향 결정", "기존 크롤링 데이터 제공", "도메인 결정"],
  "ai_initial": ["템플릿 셋업", "NeonDB 전환", "데이터 마이그레이션", "크롤링 파이프라인 구축"],
  "ceo_ongoing": ["월 1-2회 스팟체크 (선택)"],
  "ai_ongoing": ["자동 크롤링", "AI 분류/요약", "SEO 페이지 생성", "뉴스레터 발행"],
  "automation_goal": "high"
}
```

## 파이프라인 흐름

```
[자동 크롤링 (Firecrawl)] → [AI 가공 (Claude)] → [DB 저장 (NeonDB)]
                                                        ↓
                                                  [SEO 페이지 자동 생성]
                                                        ↓
                                              [주간 뉴스레터 (v0.2)]
                                                        ↓
                                              [SNS 배포 (v0.2, getlate.dev)]
```

## 환경 변수

```
DATABASE_URL=postgresql://...
ANTHROPIC_API_KEY=sk-ant-...
FIRECRAWL_API_KEY=...
```

## 프로젝트 경로

`/Users/nbs22/(Claude)/(claude).projects/business-builder/projects/ai-directory/`
