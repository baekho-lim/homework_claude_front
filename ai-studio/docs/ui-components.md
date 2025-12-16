# UI Components Guide

> AI Studio Pack - 컴포넌트 가이드 (placeholder)

---

## Button

### Variants
| Variant | 용도 |
|---------|------|
| `primary` | 주요 CTA |
| `secondary` | 보조 액션 |
| `ghost` | 텍스트 버튼 |
| `link` | 링크 스타일 |
| `danger-ghost` | 삭제/취소 |

### Sizes
- `lg`: 큰 버튼 (CTA)
- `md`: 기본
- `sm`: 작은 버튼

### Props
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'danger-ghost';
  size?: 'lg' | 'md' | 'sm';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

---

## Layout

### Props
```typescript
interface LayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  title?: string;
}
```

### 구조
- 최대 너비: `max-w-md` (28rem)
- 헤더: 로고 + 뒤로가기 + 기록 링크
- 콘텐츠: 패딩 `p-4`

---

## 추가 예정

- [ ] Card
- [ ] Input
- [ ] Timer Ring
- [ ] Bottom Sheet
- [ ] Proof Card
