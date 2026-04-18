# nuxt.com

[nuxt.com](https://nuxt.com)에서 제공되는 Nuxt 웹사이트 저장소에 오신 것을 환영합니다.

## 설정 (Setup)

Corepack을 활성화하고 의존성을 설치하세요:

```bash
corepack enable
pnpm install
```

`.env.example` 파일을 `.env`로 복사합니다:

```bash
cp .env.example .env
```

[nuxt/nuxt](https://github.com/nuxt/nuxt) 저장소를 원하는 위치에 클론 또는 포크합니다
(단, Nuxt.com 프로젝트 내부에는 두지 마세요)

그 후 저장소 루트에서 아래 명령어 실행:

```bash
pwd
```

Windows에서는 다음 명령어 사용:

```bash
echo %cd%
```

출력된 경로를 `.env` 파일의 `NUXT_PATH`와 `NUXT_V4_PATH` 변수에 붙여넣습니다.

---

## 개발 (Development)

개발 서버 실행:

```bash
pnpm dev
```

Nuxt 생태계(모듈, API 등) 전체 fetch 포함 실행:

```bash
pnpm dev:full
```

### Nuxt 템플릿 추가

`./content/templates` 디렉토리에 파일을 추가하면 템플릿을 등록할 수 있습니다.

개발 서버를 실행하면 템플릿 스크린샷이 자동 생성됩니다.
결과 확인: [http://localhost:3000/templates](http://localhost:3000/templates)

스크린샷 URL을 변경하려면 `screenshotUrl` 속성을 수정하세요.

이미지를 다시 생성하려면 `public/assets/templates` 폴더의 생성된 파일을 삭제하면 됩니다.

---

## 프로덕션 (Production)

프로덕션 빌드:

```bash
pnpm generate
```

---

## MCP 서버 평가 실행

1. **개발 서버 실행**

```bash
pnpm dev
```

2. **AI Gateway API 키 생성**

[https://vercel.com/ai-gateway](https://vercel.com/ai-gateway) 에서 API 키 생성 후 `.env`에 추가:

```
AI_GATEWAY_API_KEY=<your-api-key>
```

3. **평가 실행**

CLI 실행:

```bash
pnpm eval
```

웹 UI 실행:

```bash
pnpm eval:ui
```

---

## 라이선스

MIT License
