# OVERVIEW (관제센터) — Homework (Wing Proof)
> 프로젝트 전체 구조와 문서 링크 허브

- Status (상태): Active
- Updated (수정일): 2025-12-16

---

## Structure (프로젝트 구조)

```
homework_claude_front/
│
├── 📋 OVERVIEW.md              ← 지금 보고 있는 문서
│
├── 📁 .meta/                   ← 업무 메타 (복사 가능)
│   ├── DOC-PRINCIPLES.md       - 문서 작성 원칙
│   ├── AI-AUTONOMY.md          - AI 자율성 매트릭스
│   └── README.md               - 메타 폴더 설명
│
├── 📁 docs/                    ← 프로젝트 문서 (계약서)
│   ├── PRD-lite.md             - 제품 요구사항
│   ├── Contracts.md            - 데이터 구조 규약
│   ├── Design-Tokens.md        - CSS 변수 규약
│   └── Diff-Template.md        - 버전 변경 기록
│
├── 📁 wireframe/               ← AI Studio 실험 (동적)
│
├── 📁 src/                     ← 개발 코드 (확정)
│
└── 📁 .github/                 ← CI/CD
    └── workflows/
        └── aistudio-sieve.yml  - AI Studio PR 체크
```

---

## Workflow (워크플로우)

```
1. IDEATION (Google AI Studio)     → 실험, 자유롭게
        ↓ 다운로드
2. STAGING (wireframe/)            → 검토, 논의
        ↓ 버전 확정
3. DOCUMENTATION (docs/)           → Diff 작성, 계약서 업데이트
        ↓ 개발 시작
4. DEVELOPMENT (src/)              → MVP 개발, 백엔드 연동
```

---

## Quick Links (빠른 링크)

### Meta (업무 방식)
| Doc (문서) | Purpose (용도) |
|------------|----------------|
| [DOC-PRINCIPLES](.meta/DOC-PRINCIPLES.md) | 문서 작성 원칙 |
| [AI-AUTONOMY](.meta/AI-AUTONOMY.md) | AI 자율성 매트릭스 |

### Project (프로젝트)
| Doc (문서) | Purpose (용도) |
|------------|----------------|
| [PRD-lite](docs/PRD-lite.md) | 제품 범위 & 원칙 |
| [Contracts](docs/Contracts.md) | 데이터 구조 규약 |
| [Design-Tokens](docs/Design-Tokens.md) | CSS 변수 규약 |
| [Diff-Template](docs/Diff-Template.md) | 버전 변경 기록 |

---

## Environment (환경)

| Env (환경) | Tool (도구) | Role (역할) |
|------------|-------------|-------------|
| 실험 | Google AI Studio | Wireframe 0.1 → 0.2 → ... |
| 개발 | Claude IDE | MVP 개발, 백엔드 연동 |
| 버전관리 | GitHub | `homework_claude_front` |

---

## Current Status (현재 상태)

- **v0.1**: Google AI Studio 기능 루프 완주 ✅
- **Next**: wireframe/ 폴더에 v0.1 배치 → src/ 개발 시작
