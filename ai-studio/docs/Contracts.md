# Homework Contracts v0.1

> 프론트/백/도메인이 공유하는 스키마·이벤트·라우트 규칙

---

## 1. 엔티티 (Entities)

### SchemaVersion
```typescript
type SchemaVersion = 1;
```

### Goal (목표)
```typescript
type Goal = {
  schemaVersion: SchemaVersion;
  goalId: string;
  title: string;           // 목표 1줄
  createdAt: string;       // ISO 8601
};
```

### Session (세션)
```typescript
type SessionStatus = 'idle' | 'running' | 'paused' | 'completed' | 'abandoned';

type Session = {
  schemaVersion: SchemaVersion;
  sessionId: string;
  goalId: string;
  durationSec: number;     // default: 1800 (30분)
  status: SessionStatus;
  startedAt?: string;      // ISO 8601
  pausedAt?: string;
  completedAt?: string;
  lastSeenAt?: string;     // 복원 계산용
};
```

### Proof (증명)
```typescript
type Proof = {
  schemaVersion: SchemaVersion;
  proofId: string;
  goalId: string;
  sessionId: string;
  durationSec: number;     // 실제 소요 시간
  note?: string;           // 한 줄 회고
  imageRef?: string;       // 이미지 참조 (선택)
  createdAt: string;       // ISO 8601
};
```

### ShareTemplate (공유 템플릿)
```typescript
type ShareTemplateId = 'tpl_image_v1' | 'tpl_text_v1';

type ShareTemplate = {
  templateId: ShareTemplateId;
  type: 'image' | 'text';
};
```

---

## 2. 이벤트 이름 (Event Log Keys)

> v0.1에서는 로컬 저장, v0.2에서 서버 전송

### 핵심 이벤트
| Event Key | 설명 | Payload |
|-----------|------|---------|
| `first_open` | 앱 첫 실행 | `{ firstOpenAt }` |
| `create_goal` | 목표 생성 | `{ goalId, title }` |
| `start_session` | 세션 시작 | `{ sessionId, goalId, durationSec }` |
| `pause_session` | 세션 일시정지 | `{ sessionId, pausedAt }` |
| `resume_session` | 세션 재개 | `{ sessionId }` |
| `restore_session` | 세션 복원 (탭 재진입) | `{ sessionId, elapsed }` |
| `abandon_session` | 세션 포기 | `{ sessionId }` |
| `complete_session` | 세션 완료 | `{ sessionId, completedAt }` |
| `create_proof` | 증명 생성 | `{ proofId, goalId, sessionId }` |
| `edit_proof` | 증명 수정 | `{ proofId, note }` |
| `select_template` | 템플릿 선택 | `{ templateId }` |
| `export_success` | Export 성공 | `{ proofId, format }` |
| `export_fail` | Export 실패 | `{ proofId, error }` |
| `view_log_list` | 로그 리스트 조회 | `{}` |

---

## 3. 라우트 목록 (Routes)

| Route | Code Name | 설명 |
|-------|-----------|------|
| `/` | S01_GoalStart | 목표 입력 (홈) |
| `/timer` | S02_TimerRunning | 타이머 실행 |
| `/timer?sheet=pause` | S03_PauseSheet | 중단/재도전 시트 |
| `/complete` | S04_CompleteProof | 완료 + 증명 생성 |
| `/share/:proofId` | S05_ShareExport | 템플릿 프리뷰 + Export |
| `/log` | S06_QuietLog | 기록 리스트 |
| `/log/:proofId` | - | 기록 상세 (선택) |
| `/settings` | - | 설정 (최소) |

---

## 4. 상태 전이 (Session State Machine)

```
        ┌──────────────────────────────────────┐
        │                                      │
        ▼                                      │
     [idle] ──start──▶ [running] ◀──resume──┐ │
                          │                  │ │
                          ├──pause──▶ [paused]─┘
                          │
                          ├──complete──▶ [completed]
                          │
                          └──abandon──▶ [abandoned]
```

### 전이 규칙
| From | Action | To |
|------|--------|-----|
| idle | start | running |
| running | pause | paused |
| running | complete | completed |
| running | abandon | abandoned |
| paused | resume | running |
| paused | abandon | abandoned |

---

## 5. 로컬 저장소 (LocalRepo)

### 인터페이스
```typescript
interface LocalRepo {
  // Goal
  createGoal(goal: Goal): Promise<void>;
  getGoal(goalId: string): Promise<Goal | null>;
  listGoals(): Promise<Goal[]>;

  // Session
  createSession(session: Session): Promise<void>;
  updateSession(sessionId: string, updates: Partial<Session>): Promise<void>;
  getSession(sessionId: string): Promise<Session | null>;
  getActiveSession(): Promise<Session | null>;

  // Proof
  createProof(proof: Proof): Promise<void>;
  updateProof(proofId: string, updates: Partial<Proof>): Promise<void>;
  getProof(proofId: string): Promise<Proof | null>;
  listProofs(): Promise<Proof[]>;

  // Export
  exportAll(): Promise<ExportBundle>;
  clearAll(): Promise<void>;
}
```

### 저장소 키 (IndexedDB)
- `hw_goals` : Goal[]
- `hw_sessions` : Session[]
- `hw_proofs` : Proof[]
- `hw_events` : EventLog[]
- `hw_meta` : { firstOpenAt, lastSeenAt }
