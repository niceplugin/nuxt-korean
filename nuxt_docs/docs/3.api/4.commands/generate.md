---
title: "nuxt generate"
description: 애플리케이션의 모든 라우트를 사전 렌더링하고 결과를 일반 HTML 파일로 저장합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/generate.ts
    size: xs
---

<!--generate-cmd-->
```bash [Terminal]
npx nuxt generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName]
```
<!--/generate-cmd-->

`generate` 명령어는 애플리케이션의 모든 라우트를 사전 렌더링하고 결과를 일반 HTML 파일로 저장하여, 어떤 정적 호스팅 서비스에도 배포할 수 있도록 합니다. 이 명령어는 `prerender` 인자가 `true`로 설정된 상태로 `nuxt build` 명령어를 실행합니다.

## [인자](#arguments)

<!--generate-args-->
인자 | 설명
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/generate-args-->

## [옵션](#options)

<!--generate-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--preset` |  | Nitro 서버 프리셋
`--dotenv` |  | 루트 디렉터리를 기준으로 불러올 `.env` 파일의 경로
`--envName` |  | 구성 오버라이드를 해결할 때 사용할 환경 (빌드 시 기본값은 `production`, 개발 서버 실행 시 기본값은 `development`)
<!--/generate-opts-->

::read-more{to="/docs/getting-started/deployment#static-hosting"}
사전 렌더링 및 정적 호스팅에 대해 더 알아보기.
::
