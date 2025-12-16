# Contracts (Invariants) v0.1

## 1) Entities (필드명 고정)
### Goal
- id: string
- title: string
- createdAt: number (epoch ms)

### Session
- id: string
- goalId: string
- status: "running" | "paused" | "completed" | "abandoned"
- startedAt: number (epoch ms)
- durationSec: number
- updatedAt: number (epoch ms)

### Proof
- id: string
- goalId: string
- sessionId: string
- titleSnapshot: string
- durationSec: number
- completedAt: number (epoch ms)
- note?: string

## 2) Event Log Keys (고정)
- goal_created
- session_started
- session_paused
- session_resumed
- session_extended
- session_completed
- session_abandoned
- proof_created
- share_exported

## 3) Routes (고정)
- `/`, `/timer`, `/complete`, `/share/:proofId`, `/log`
