---
paths:
  - "server/src/timeline*"
  - "**/timeline/**"
---

# timeline/ 파일 형식
- `_project.md`: `## 개요`, `## 기간`(`- 시작: YYYY-MM-DD`, `- 종료: YYYY-MM-DD | 미정`)
- `<GitHub 아이디>.md`: 팀원 1명당 1개
- `_unassigned.md`: GitHub 계정과 연결 안 된 커밋. 줄 끝에 git 작성자 이름
- 활동: `### YYYY-MM-DD (요일)` 아래 `- 유형: 내용 | 커밋SHA` (SHA 없으면 수동 활동). 날짜 모름은 `### 날짜 미상`
- 유형: `추가`(새 기능) / `수정`(기존 기능 변경, 애매하면 이것) / `재결정`(문서에서 다시 정함)
