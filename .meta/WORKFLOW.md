# WORKFLOW (운영 방식)
> Lab(AI Studio) ↔ Prod(IDE) 분리 운영 규칙

- Status (상태): Active
- Updated (수정일): 2025-12-16
- Related (관련): [AI-AUTONOMY.md](AI-AUTONOMY.md)

---

## Overview (개요)

```
┌─────────────────────┐         ┌─────────────────────┐
│   Lab (AI Studio)   │         │   Prod (Claude IDE) │
│   UI/스타일 실험     │         │   로직/데이터 개발   │
└──────────┬──────────┘         └──────────┬──────────┘
           │                               │
           │  PR → dev                     │
           └───────────────┬───────────────┘
                           ↓
                    dev 브랜치
                           ↓
                    main (릴리즈)
```

---

## Lab Rules (AI Studio 규칙)

### Branch Naming (브랜치 이름)
```
lab/aistudio-YYYYMMDD-styleX

예: lab/aistudio-20251216-style1
    lab/aistudio-20251217-style2
```

### Allowed Changes (변경 허용)
| Path (경로) | Allowed (허용) |
|-------------|----------------|
| `src/styles/` | ✅ |
| `src/ui/` | ✅ |
| `src/content/` | ✅ |
| `src/fixtures/` | ✅ |
| `docs/` | ✅ |
| `src/core/` | ❌ sieve 차단 |
| 라우팅/스토리지 | ❌ sieve 차단 |

### PR Requirements (PR 요구사항)
- Target: `dev` 브랜치
- Diff Table 필수
- Screenshots 6장 (주요 화면)

---

## Prod Rules (Claude IDE 규칙)

### Responsibilities (담당)
- 기능 구현
- 데이터 로직
- 라우팅
- 스토리지
- 테스트

### After Lab PR Merge (Lab PR 머지 후)
1. `dev` 브랜치에서 변경사항 확인
2. 로직 연결 & 정합성 맞춤
3. 테스트 작성/수정
4. `main`으로 PR

---

## Branch Strategy (브랜치 전략)

```
main          ← 릴리즈 (안정)
  ↑
dev           ← 통합 (Lab + Prod 머지)
  ↑
lab/aistudio-*  ← AI Studio 실험
feat/*          ← IDE 기능 개발
fix/*           ← IDE 버그 수정
```

---

## Example Flow (예시 플로우)

### 1. AI Studio에서 새 스타일 실험
```bash
# AI Studio에서 작업 후 다운로드
# wireframe/ 폴더에 배치
# 브랜치 생성
git checkout -b lab/aistudio-20251216-style1
git add src/styles src/ui
git commit -m "style: 새 버튼 스타일 실험"
git push origin lab/aistudio-20251216-style1
# GitHub에서 PR → dev
```

### 2. IDE에서 로직 연결
```bash
git checkout dev
git pull
# 로직 연결 작업
git commit -m "feat: 새 버튼에 타이머 연장 로직 연결"
git push origin dev
# dev → main PR
```
