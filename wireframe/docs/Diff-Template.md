# Homework Diff Template

> 릴리즈마다 작성하는 변경사항 기록 템플릿 (복붙용)

---

## Release Diff Sheet: v{FROM} → v{TO}

**Date**: YYYY-MM-DD
**Author**:
**Summary**: (1줄 요약)

---

### Added (추가)

#### Screens
| Code Name | Route | 설명 |
|-----------|-------|------|
| | | |

#### Entities
| Entity | Fields | 설명 |
|--------|--------|------|
| | | |

#### Events
| Event Key | Payload | 설명 |
|-----------|---------|------|
| | | |

#### Tokens
| Token ID | CSS Variable | 값 |
|----------|--------------|-----|
| | | |

---

### Removed (삭제)

#### Screens
| Code Name | Route | 이유 |
|-----------|-------|------|
| | | |

#### Entities
| Entity | Fields | 이유 |
|--------|--------|------|
| | | |

#### Events
| Event Key | 이유 |
|-----------|------|
| | |

#### Tokens
| Token ID | 이유 |
|----------|------|
| | |

---

### Modified (수정)

#### Screens
| Code Name | Before | After | 이유 |
|-----------|--------|-------|------|
| | | | |

#### Entities
| Entity.Field | Before | After | 이유 |
|--------------|--------|-------|------|
| | | | |

#### Events
| Event Key | Before | After | 이유 |
|-----------|--------|-------|------|
| | | | |

#### Tokens
| Token ID | Before | After | 이유 |
|----------|--------|-------|------|
| | | | |

---

### Migration Needed (마이그레이션 필요)

#### Data Migration
| 대상 | 변환 로직 | 우선순위 |
|------|-----------|----------|
| | | |

#### Breaking Changes
| 항목 | 영향 범위 | 대응 방법 |
|------|-----------|-----------|
| | | |

---

### Checklist (체크리스트)

- [ ] PRD-lite.md 업데이트
- [ ] Contracts.md 업데이트
- [ ] Design-Tokens.md 업데이트
- [ ] contracts/*.ts 파일 동기화
- [ ] 아하 사이클 회귀 테스트 통과
- [ ] 로컬 데이터 마이그레이션 확인

---

### Notes (참고사항)

```
자유 형식 메모
```

---

## 예시: v0.1 → v0.2

**Date**: 2025-01-XX
**Author**: Team
**Summary**: 백업 기능 추가 (유료)

### Added

#### Entities
| Entity | Fields | 설명 |
|--------|--------|------|
| User | userId, email, createdAt | 사용자 계정 |
| BackupSubscription | subscriptionId, userId, status, expiresAt | 백업 구독 |

#### Events
| Event Key | Payload | 설명 |
|-----------|---------|------|
| signup_complete | { userId, method } | 가입 완료 |
| backup_start | { userId } | 백업 시작 |
| backup_success | { userId, size } | 백업 성공 |
| restore_start | { userId } | 복원 시작 |
| restore_success | { userId } | 복원 성공 |

### Modified

#### Entities
| Entity.Field | Before | After | 이유 |
|--------------|--------|-------|------|
| Goal.userId | (없음) | optional string | 사용자 연결 |
| Session.userId | (없음) | optional string | 사용자 연결 |
| Proof.userId | (없음) | optional string | 사용자 연결 |

### Migration Needed

#### Data Migration
| 대상 | 변환 로직 | 우선순위 |
|------|-----------|----------|
| 기존 로컬 데이터 | 게스트 → 계정 병합 | P0 |

---

## 업데이트 순서 (강제)

1. **Diff Sheet 먼저** (이 문서 작성)
2. **Contract 업데이트** (SSOT 5세트)
3. **Migration** (로컬 데이터)
4. **UI 변경**
5. **Repo 확장** (Local → Server)
6. **회귀 체크**: 아하 사이클이 그대로 동작하는가
