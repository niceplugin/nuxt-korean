---
title: "nuxt build"
description: "Nuxt 애플리케이션을 빌드합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxt build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName]
```
<!--/build-cmd-->

`build` 명령어는 프로덕션 준비가 완료된 모든 애플리케이션, 서버 및 종속성이 포함된 `.output` 디렉터리를 생성합니다.

## [인자](#arguments)

<!--build-args-->
인자 | 설명
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/build-args-->

## [옵션](#options)

<!--build-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--prerender` |  | Nuxt를 빌드하고 정적 라우트를 사전 렌더링합니다
`--preset` |  | Nitro 서버 프리셋
`--dotenv` |  | 루트 디렉터리를 기준으로 로드할 `.env` 파일의 경로
`--envName` |  | 구성 오버라이드를 해결할 때 사용할 환경 (빌드 시 기본값은 `production`, 개발 서버 실행 시 기본값은 `development`)
<!--/build-opts-->

::note
이 명령어는 `process.env.NODE_ENV`를 `production`으로 설정합니다.
::

::note
`--prerender` 옵션을 사용하면 항상 `preset`이 `static`으로 설정됩니다.
::
