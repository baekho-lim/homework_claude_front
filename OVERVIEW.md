# Homework (Wing Proof) — 관제센터

## 프로젝트 구조

```
homework_claude_front/
│
├── 📋 OVERVIEW.md            ← 지금 보고 있는 문서 (관제센터)
│
├── 📁 docs/                  ← 계약서 (고정, 불변)
│   ├── PRD-lite.md           - 제품 요구사항
│   ├── Contracts.md          - 데이터 구조 & 이벤트 규약
│   ├── Design-Tokens.md      - CSS 변수 규약
│   └── Diff-Template.md      - 버전 변경 기록 템플릿
│
├── 📁 wireframe/             ← AI Studio 실험 (동적)
│   └── (Google AI Studio 다운로드)
│
└── 📁 src/                   ← 실제 개발 코드 (확정)
    └── (MVP 개발)
```

---

## 워크플로우

```
┌─────────────────────────────────────────────────────────────┐
│  1. IDEATION (Google AI Studio)                             │
│     - Wireframe 실험                                        │
│     - 새로운 UI/UX 시도                                      │
│     - 상태: 동적, 자유롭게 변경                               │
└─────────────────────┬───────────────────────────────────────┘
                      ↓ 다운로드
┌─────────────────────────────────────────────────────────────┐
│  2. STAGING (wireframe/)                                    │
│     - AI Studio 코드 검토                                    │
│     - 기획 논의 & 수정                                       │
│     - 상태: 동적, 검토 중                                    │
└─────────────────────┬───────────────────────────────────────┘
                      ↓ 버전 확정
┌─────────────────────────────────────────────────────────────┐
│  3. DOCUMENTATION (docs/)                                   │
│     - Diff-Template.md 작성 (변경사항 기록)                   │
│     - Contracts.md 업데이트 (필요시)                         │
│     - 상태: 확정, 불변                                       │
└─────────────────────┬───────────────────────────────────────┘
                      ↓ 개발 시작
┌─────────────────────────────────────────────────────────────┐
│  4. DEVELOPMENT (src/ - Claude IDE)                         │
│     - 실제 MVP 개발                                          │
│     - 백엔드 연동                                            │
│     - 상태: 확정, 프로덕션                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 핵심 문서 빠른 링크

| 문서 | 용도 | 링크 |
|------|------|------|
| PRD-lite | 제품 범위 & 원칙 | [docs/PRD-lite.md](docs/PRD-lite.md) |
| Contracts | 데이터 구조 규약 | [docs/Contracts.md](docs/Contracts.md) |
| Design-Tokens | CSS 변수 규약 | [docs/Design-Tokens.md](docs/Design-Tokens.md) |
| Diff-Template | 버전 변경 기록 | [docs/Diff-Template.md](docs/Diff-Template.md) |

---

## 환경 요약

| 환경 | 도구 | 역할 |
|------|------|------|
| 실험 | Google AI Studio | Wireframe 0.1 → 0.2 → 0.3... |
| 개발 | Claude IDE | MVP 개발, 백엔드 연동 |
| 버전관리 | GitHub | `homework_claude_front` 레포 |

---

## 현재 상태

- **v0.1**: Google AI Studio에서 기능 루프 완주 ✅
- **다음**: wireframe/ 폴더에 v0.1 코드 배치 → src/ 개발 시작
