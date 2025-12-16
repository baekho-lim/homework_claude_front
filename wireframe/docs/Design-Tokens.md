# Homework Design Tokens v0.1

> `--hw-*` 토큰의 의미와 사용법

---

## 1. 토큰 네이밍 규칙

- **Prefix**: `hw-` (homework)
- **형태**: `--hw-{category}-{name}`
- **예시**: `--hw-color-bg`, `--hw-space-4`, `--hw-radius-l`

---

## 2. 디자인 키워드 (브랜드 톤)

| 키워드 | 의미 |
|--------|------|
| **wing** | 날개 - 가벼운 시작, 완료의 상징 |
| **buoyancy** | 부력 - 다시 떠오르는 힘, 재시작 |
| **quiet proof** | 조용한 증명 - 자랑 아닌 존재의 기록 |
| **minimal** | 최소 - 군더더기 없는 |
| **spacious** | 여유 - 넉넉한 여백 |
| **gentle** | 부드러운 - 훈계 없는 동행 |
| **studio-like** | 작업실 같은 - 집중할 수 있는 공간 |

---

## 3. 컬러 토큰

| Token ID | CSS Variable | 값 (예시) | 용도 |
|----------|--------------|-----------|------|
| color.bg | `--hw-color-bg` | `#FAFAFA` (Zinc 50) | 앱 전체 배경 |
| color.surface | `--hw-color-surface` | `#FFFFFF` | 카드/패널 배경 |
| color.text | `--hw-color-text` | `#27272A` (Zinc 800) | 본문 텍스트 |
| color.muted | `--hw-color-muted` | `#A1A1AA` (Zinc 400) | 보조 텍스트 |
| color.accent | `--hw-color-accent` | `#52525B` (Zinc 600) | 포인트/강조 |
| color.border | `--hw-color-border` | `#E4E4E7` (Zinc 200) | 구분선/테두리 |

### 현재 index.html 매핑
```css
:root {
  --hw-bg: #FAFAFA;       /* color.bg */
  --hw-fg: #27272A;       /* color.text */
  --hw-muted: #A1A1AA;    /* color.muted */
  --hw-accent: #52525B;   /* color.accent */
  --hw-border: #E4E4E7;   /* color.border */
}
```

---

## 4. 타이포그래피 토큰

| Token ID | CSS Variable | 값 | 용도 |
|----------|--------------|-----|------|
| typo.font | `--hw-font-sans` | `'Pretendard', sans-serif` | 기본 폰트 |

### 폰트 스택
```css
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## 5. 스페이싱 토큰

| Token ID | CSS Variable | 값 | 용도 |
|----------|--------------|-----|------|
| space.1 | `--hw-space-1` | `4px` | 최소 간격 |
| space.2 | `--hw-space-2` | `8px` | 작은 간격 |
| space.3 | `--hw-space-3` | `16px` | 기본 간격 |
| space.4 | `--hw-space-4` | `24px` | 큰 간격 |
| space.5 | `--hw-space-5` | `32px` | 섹션 간격 |

---

## 6. 반경 토큰

| Token ID | CSS Variable | 값 | 용도 |
|----------|--------------|-----|------|
| radius.s | `--hw-radius-s` | `8px` | 작은 버튼/인풋 |
| radius.m | `--hw-radius-m` | `16px` | 카드/패널 |
| radius.l | `--hw-radius-l` | `24px` | 큰 카드/모달 |

### 현재 index.html 매핑
```css
:root {
  --hw-radius-lg: 24px;   /* radius.l */
}
```

---

## 7. 유틸리티 클래스 (Tailwind 확장)

```css
/* 배경 */
.bg-hw-bg { background-color: var(--hw-bg); }

/* 텍스트 */
.text-hw-fg { color: var(--hw-fg); }
.text-hw-muted { color: var(--hw-muted); }
.text-hw-accent { color: var(--hw-accent); }

/* 테두리 */
.border-hw-border { border-color: var(--hw-border); }

/* 반경 */
.rounded-hw-lg { border-radius: var(--hw-radius-lg); }
```

---

## 8. Google AI Studio 결과물 리매핑 규칙

> AI Studio에서 생성된 코드는 **반드시** 이 토큰으로 리매핑

### 리매핑 체크리스트
- [ ] `bg-gray-*` → `bg-hw-bg` 또는 Tailwind `bg-zinc-*`
- [ ] `text-gray-*` → `text-hw-fg`, `text-hw-muted`
- [ ] `border-gray-*` → `border-hw-border`
- [ ] `rounded-*` → `rounded-hw-lg` 또는 토큰 값
- [ ] 인라인 색상 → CSS 변수로 교체
- [ ] 하드코딩된 폰트 → `--hw-font-sans`

### 예시
```jsx
// Before (AI Studio 생성)
<div className="bg-gray-50 text-gray-800 rounded-3xl">

// After (토큰 리매핑)
<div className="bg-hw-bg text-hw-fg rounded-hw-lg">
```

---

## 9. 다크모드 (v0.2+)

> v0.1에서는 라이트 모드만 지원

```css
/* 향후 다크모드 토큰 (예약) */
@media (prefers-color-scheme: dark) {
  :root {
    --hw-bg: #18181B;       /* Zinc 900 */
    --hw-fg: #FAFAFA;       /* Zinc 50 */
    --hw-muted: #71717A;    /* Zinc 500 */
    --hw-accent: #A1A1AA;   /* Zinc 400 */
    --hw-border: #3F3F46;   /* Zinc 700 */
  }
}
```
