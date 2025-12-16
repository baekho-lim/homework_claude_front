# Screens Specification

> AI Studio Pack - 화면 스펙 (PRD-lite에서 분리)

---

## 6 화면 정의

| # | Code Name | Route | 핵심 |
|---|-----------|-------|------|
| 01 | S01_GoalStart | `/` | 목표 1줄 입력 + 30분 시작 (60초 내) |
| 02 | S02_TimerRunning | `/timer` | 타이머 실행 + 복원 계산 중심 |
| 03 | S03_PauseSheet | `/timer?sheet=pause` | 중단/재도전 바텀시트 |
| 04 | S04_CompleteProof | `/complete` | 완료 + 증명 카드 생성 |
| 05 | S05_ShareExport | `/share/:proofId` | 템플릿 프리뷰 + 이미지 저장 |
| 06 | S06_QuietLog | `/log` | 조용한 기록 리스트 |

---

## S01_GoalStart

**Route**: `/`
**파일**: `src/pages/S01_GoalStart.tsx`

### 핵심 요소
- 타이틀: "한 줄이면 충분해요."
- 인풋: 목표 1줄 (placeholder: "오늘 뭘 해볼까요?")
- CTA: "30분, 지금 시작하기"

### 동작
1. 기존 활성 세션 있으면 → `/timer`로 리다이렉트
2. 목표 입력 후 시작 → Session 생성 → `/timer`로 이동

---

## S02_TimerRunning

**Route**: `/timer`
**파일**: `src/pages/S02_TimerRunning.tsx`

### 핵심 요소
- 원형 프로그레스 링
- 남은 시간 표시
- 일시정지/재개 버튼
- 연장 (+5분) 버튼

### 동작
- 백그라운드 복원: `lastTick` 타임스탬프로 계산
- 일시정지 시 → 바텀시트(S03) 표시
- 완료 시 → `/complete`로 이동

---

## S03_PauseSheet

**Route**: `/timer?sheet=pause`
**파일**: S02_TimerRunning.tsx 내 바텀시트

### 핵심 요소
- 타이틀: "멈춰도 괜찮아요."
- 서브: "숨 고르기예요."
- 재개 버튼
- 포기 버튼

---

## S04_CompleteProof

**Route**: `/complete`
**파일**: `src/pages/S04_CompleteProof.tsx`

### 핵심 요소
- 완료 메시지: "오늘의 날개가 붙었습니다."
- 회고 입력 (선택)
- CTA: "기록 남기기"

### 동작
- Proof 객체 생성 및 저장
- 완료 후 → `/share/:proofId`로 이동

---

## S05_ShareExport

**Route**: `/share/:proofId`
**파일**: `src/pages/S05_ShareExport.tsx`

### 핵심 요소
- 템플릿 탭: "이미지 포함" / "텍스트만"
- Canvas 프리뷰 (9:16 비율)
- CTA: "이미지로 저장하기"

### 동작
- Canvas로 이미지 생성
- PNG 다운로드

---

## S06_QuietLog

**Route**: `/log`
**파일**: `src/pages/S06_QuietLog.tsx`

### 핵심 요소
- Proof 리스트 (날짜/목표/시간/회고)
- 빈 상태 UI
- "다시 시작하기" 버튼

### 동작
- 기록 탭 → 같은 목표로 새 세션 시작 가능
