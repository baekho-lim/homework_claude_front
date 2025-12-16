# AI-AUTONOMY (AI 자율성 매트릭스)
> AI가 어디서 자유롭게 행동하고, 어디서 승인을 받아야 하는지 정의

- Status (상태): Active
- Updated (수정일): 2025-12-16
- Related (관련): [DOC-PRINCIPLES.md](DOC-PRINCIPLES.md)

---

## Matrix (매트릭스)

| Area (영역) | Autonomy (자율성) | Reason (근거) |
|-------------|-------------------|---------------|
| `wireframe/` | 🟢 Free (자유) | 실험 공간, 언제든 덮어쓰기 |
| `src/ui/` | 🟡 Suggest → Execute (제안→실행) | UI는 유연하게 |
| `src/styles/` | 🟡 Suggest → Execute (제안→실행) | 스타일은 유연하게 |
| `src/content/` | 🟡 Suggest → Execute (제안→실행) | 콘텐츠는 유연하게 |
| `docs/Contracts.md` | 🔴 Approval Required (승인 필수) | 불변 규약 |
| `docs/PRD-lite.md` | 🔴 Approval Required (승인 필수) | 제품 범위 |
| `src/core/` | 🔴 Approval Required (승인 필수) | 핵심 로직 |
| `.meta/` | 🔴 Approval Required (승인 필수) | 업무 방식 |

---

## Legend (범례)

| Symbol | Meaning | AI Action (AI 행동) |
|--------|---------|---------------------|
| 🟢 | Free | 바로 실행, 사후 보고 |
| 🟡 | Suggest | 계획 먼저 제시, 승인 후 실행 |
| 🔴 | Approval | 반드시 사람 승인 후 실행 |

---

## Examples (예시)

### 🟢 자유 영역
```
User: "wireframe 폴더에 새 실험 넣어줘"
AI: (바로 실행) → "완료했습니다"
```

### 🟡 제안 후 실행
```
User: "버튼 색상 바꿔줘"
AI: "src/styles/에서 --hw-accent 값을 #3B82F6 → #10B981로 바꾸면 될까요?"
User: "응"
AI: (실행)
```

### 🔴 승인 필수
```
User: "Session 타입에 필드 추가해줘"
AI: "Contracts.md 변경이 필요합니다. 이렇게 수정해도 될까요? [변경안 제시]"
User: "응"
AI: (실행)
```
