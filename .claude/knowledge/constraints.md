# AI Directory Constraints

## DB Rules
- `drizzle-kit push` 절대 금지 -> `drizzle-kit generate` -> SQL 확인 -> 승인 후 실행
- 런타임: `app_user` 사용 (DROP/TRUNCATE/CREATE 불가)
- 마이그레이션: `neondb_owner` 전용
- DROP TABLE / TRUNCATE 포함 마이그레이션 발견 시 즉시 중단 + CEO 보고

## Deployment
- Vercel CLI 배포 금지 (Git push만)
- staging -> production 순서 필수 (직행 금지)
- 배포 후 실제 URL curl 검증 필수
- Vercel 일일 배포 100개 제한 주의

## Development
- TDD 강제: 테스트 먼저 -> 구현 -> 통과
- plan 없이 코딩 착수 금지
- VP 승인 없이 PL execute-plan 착수 금지
- ralph-loop 미사용 PL 실행 결과 = 미완료

## Business
- 샘플/더미 데이터 10개 초과 생성 금지
- .vercel.app 링크 외부 노출 금지
- 서비스 간 크로스 프로모션 금지
- 1 페이지 1 목적 원칙

## Content
- 자비스 콘텐츠 생성 금지 (게리비 에이전트 전담)
- 대량 사전 생성 금지
- CEO 거부 과업 재착수 금지 (memory/ceo-rejected-tasks.md 확인)
