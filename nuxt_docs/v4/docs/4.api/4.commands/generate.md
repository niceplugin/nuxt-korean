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
npx nuxt generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>]
```
<!--/generate-cmd-->

`generate` 명령은 애플리케이션의 모든 라우트를 사전 렌더링하고 결과를 일반 HTML 파일로 저장하여, 어떤 정적 호스팅 서비스에도 배포할 수 있게 합니다. 이 명령은 `prerender` 인수를 `true`로 설정하여 `nuxt build` 명령을 트리거합니다.

## Arguments %{arguments}%

<!--generate-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/generate-args-->

## Options %{options}%

<!--generate-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--preset` |  | Nitro 서버 프리셋
`--dotenv` |  | 로드할 `.env` 파일의 경로로, 루트 디렉터리를 기준으로 합니다
`--envName` |  | 설정 오버라이드를 해결할 때 사용할 환경입니다 (빌드 시 기본값은 `production`, 개발 서버 실행 시 기본값은 `development`)
`-e, --extends=<layer-name>` |  | Nuxt 레이어로부터 확장합니다
<!--/generate-opts-->

::read-more{to="/docs/4.x/getting-started/deployment#static-hosting"}
사전 렌더링과 정적 호스팅에 대해 더 알아보세요.
::
