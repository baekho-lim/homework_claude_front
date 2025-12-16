# .meta (업무 메타)
> 프로젝트와 무관한 업무 방식 정의. 다른 프로젝트에 복사해서 재사용 가능.

---

## Files (파일 목록)

| File (파일) | Purpose (용도) |
|-------------|----------------|
| `DOC-PRINCIPLES.md` | 문서 작성 원칙 |
| `AI-AUTONOMY.md` | AI 자율성 매트릭스 |
| `WORKFLOW.md` | Lab↔Prod 운영 방식 |
| `README.md` | 이 파일 |

---

## How to Reuse (재사용 방법)

새 프로젝트에서:
```bash
cp -r .meta /path/to/new-project/
```

또는 GitHub에서 폴더만 복사.

---

## vs docs/

| Folder (폴더) | Contains (내용) | Portable (이식성) |
|---------------|-----------------|-------------------|
| `.meta/` | 업무 방식, AI 협업 규칙 | ✅ 복사 가능 |
| `docs/` | 프로젝트 내용, PRD, 계약서 | ❌ 프로젝트 전용 |
