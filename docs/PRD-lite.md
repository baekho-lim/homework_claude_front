# Homework (Wing Proof) — PRD-lite v0.1

## 1) One-line
- 30분 한 사이클로 "시작→진행→완료→증명→공유"를 끝내는, 조용한 실행 앱.

## 2) North Star (아하 루프)
- 사용자가 설치/접속 후 1분 내 "시작"하고,
- 30분 사이클 내 "완료(또는 중단/연장)"를 경험하고,
- 결과를 "증명(Proof)"로 남긴다.

## 3) MVP Scope (v0.1)
### Must
- Goal 입력 → Timer 시작
- Pause(재개/오늘 그만)
- 조기 완료(지금 완료하기)
- 연장(5분 연장)
- Proof 생성 → Complete 화면
- Share 2 템플릿 + PNG export
- Log 누적 + 상세 + 재시작
- 새로고침 복원

### Won't (v0.1에서 안 함)
- 로그인/서버 동기화/백업
- 복잡 리워드 시스템
- 친구/팔로우 소셜 그래프
- 푸시 알림(권한) 강제 흐름

## 4) Routes (고정)
- `/` : GoalStart
- `/timer` : TimerRunning
- `/complete` : CompleteProof
- `/share/:proofId` : ShareExport
- `/log` : QuietLog

## 5) Key UX Principles
- Download & Go: 설정 과다 금지
- 실패/중단 허용: 죄책감 유도 금지
- 증명=존재: 자랑이 아니라 "노력이 있었다"
