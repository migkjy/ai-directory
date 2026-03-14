# AI Directory - PL Session Rules

## Project Identity
- **Name**: ai-directory (AI 서비스 큐레이션 SaaS)
- **GitHub**: migkjy/ai-directory
- **Task ID**: `2fa16d40-012d-465c-9815-c8040286ddac`
- **Path**: `/Users/nbs22/(Claude)/(claude).projects/business-builder/projects/ai-directory/`

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript 5
- NeonDB + Drizzle ORM (DB)
- Tailwind CSS 4 + Shadcn (UI)
- Firecrawl (크롤링) + Claude Sonnet API (AI 가공)
- Vercel (배포)

## Commands
- `npm run dev` — 개발 서버
- `npm run build` — 프로덕션 빌드
- `npm run lint` — ESLint
- `npm run crawl` — AI 도구 크롤링 (tsx + .env.local)
- `npm run generate-report` — 리포트 생성 (tsx + .env.local)

## Session Protocol
- 자비스 회신: `scripts/project-reply.sh "메시지" "ai-directory"`
- 작업 완료 후 knowledge/history.md 업데이트
- 실패/학습 사항 knowledge/learnings.md 기록

## Mandatory Rules
1. **DB 보호**: `drizzle-kit push` 금지 / `generate` -> SQL 확인 -> 승인 후 실행
2. **DB 연결**: 런타임은 `app_user`, 마이그레이션만 `neondb_owner`
3. **TDD 강제**: 테스트 먼저 -> 구현 -> 통과
4. **plan 없이 코딩 금지**: docs/plans/ 에 plan 작성 후 VP 승인 받아 실행
5. **ralph-loop 필수**: /ralph-loop 스킬 사용하여 실행
6. **Git**: `git pull --rebase origin main` 후 push
7. **Vercel CLI 배포 금지**: Git push로만 배포
8. **production 브랜치**: main push 후 main->production PR 필수 (존재 시)
9. **staging 경유 필수**: main->staging->production (직행 PR 금지)
10. **배포 확인**: push 후 실제 URL curl 검증 필수

## Knowledge Files
- `knowledge/architecture.md` — 프로젝트 구조/아키텍처
- `knowledge/constraints.md` — 제약사항/금지사항
- `knowledge/api-keys.md` — API 키 (gitignored)
- `knowledge/history.md` — 작업 이력
- `knowledge/learnings.md` — 실패/학습 사항
