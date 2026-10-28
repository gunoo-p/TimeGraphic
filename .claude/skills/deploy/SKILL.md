---
name: deploy
description: TimeGraphic 배포용 이미지를 빌드하고 실행하는 절차. 배포·운영 이미지·컨테이너 실행을 다룰 때 사용.
---

# 배포 절차
배포 방식(호스팅)은 아직 정하지 않았다. 실제 배포는 사용자 확인 없이 하지 않는다.

1. 이미지 빌드: `docker build -t timegraphic .`
2. 로컬 확인: `docker run --rm -p 3001:3001 timegraphic` → `http://localhost:3001/api/health`가 `{"ok":true}`
3. 컨테이너는 1개. Hono가 API와 `web` 빌드 결과(`server/public`)를 함께 서빙한다.
4. 포트는 `PORT` 환경변수(기본 3001).
