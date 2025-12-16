# DOC-PRINCIPLES (문서 원칙)
> 문서 작성 및 구조화 원칙. 다른 프로젝트에 복사해서 사용 가능.

- Status (상태): Active
- Updated (수정일): 2025-12-16
- Related (관련): [AI-AUTONOMY.md](AI-AUTONOMY.md)

---

## Mental Model (멘탈 모델): Map → Contract → Log

| Layer (레이어) | Role (역할) | Trait (특징) |
|----------------|-------------|--------------|
| **Map** | 어디에 뭐가 있는지 | 1페이지, 링크 허브 |
| **Contract** | 불변 규칙 | 짧고 명확, 변경 시 PR 필수 |
| **Log** | 변경 기록 | 시간순, append-only |

---

## Principles (핵심 원칙)

### 1. 30-Second Rule (30초 규칙)
> 어떤 문서든 30초 안에 "이 문서가 나에게 필요한가?" 판단 가능해야 함

- 첫 3줄에 목적 명시
- 길면 `## TL;DR` 섹션 필수

### 2. Tree Depth (트리 깊이)
```
OVERVIEW.md (Map)
└── docs/
    ├── PRD-lite.md (Contract)
    ├── Contracts.md (Contract)
    └── decisions/ (Log)
        └── 001-xxx.md
```

**Rules (규칙):**
- 깊이 최대 2단계
- 문서 하나 = 스크롤 3번 이내
- 넘으면 분리

### 3. Header Standard (헤더 표준)
모든 문서 최상단:
```markdown
# TITLE (제목)
> 한 줄 설명

- Status (상태): Draft | Active | Deprecated
- Updated (수정일): YYYY-MM-DD
- Related (관련): [링크]
```

### 4. Length by Type (유형별 길이)

| Type (유형) | Purpose (목적) | Max Lines (적정 길이) | If Over (넘으면) |
|-------------|----------------|----------------------|------------------|
| **Contract** | 규약, 불변 | 100줄 | 분리 필수 |
| **How-to** | 단계별 가이드 | 300줄 | TL;DR 추가 |
| **Reference** | 참조, API | 제한 없음 | 목차 필수 |
| **Decision** | 결정 기록 | 150줄 | 분리 |
| **Overview** | 전체 지도 | 150줄 | 링크로 대체 |

**Common Rules (공통 규칙):**
- 주제 2개 이상 → 무조건 분리
- 스크롤 5번 이상 → TL;DR 필수

### 5. Naming Convention (네이밍 규칙)
**English(한국어)** 형식 통일:
- 파일명: 영어 (예: `DOC-PRINCIPLES.md`)
- 제목/섹션: `English (한국어)` (예: `# Overview (개요)`)

이유: AI가 한국어로 "문서 원칙 수정해줘" 말해도 빠르게 찾을 수 있음
