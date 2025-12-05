---
title: 'nuxt prepare'
description: prepare 명령은 애플리케이션에 .nuxt 디렉터리를 생성하고 타입을 생성합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/prepare.ts
    size: xs
---

<!--prepare-cmd-->
```bash [Terminal]
npx nuxt prepare [ROOTDIR] [--dotenv] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [-e, --extends=<layer-name>]
```
<!--/prepare-cmd-->

`prepare` 명령은 애플리케이션에 [`.nuxt`](/docs/4.x/directory-structure/nuxt) 디렉터리를 생성하고 타입을 생성합니다. 이는 CI 환경이나 [`package.json`](/docs/4.x/directory-structure/package)의 `postinstall` 명령으로 사용할 때 유용할 수 있습니다.

## Arguments %{arguments}%

<!--prepare-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/prepare-args-->

## Options %{options}%

<!--prepare-opts-->
Option | Default | Description
--- | --- | ---
`--dotenv` |  | 루트 디렉터리를 기준으로 로드할 `.env` 파일의 경로
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--envName` |  | 설정 오버라이드를 해결할 때 사용할 환경을 지정합니다 (빌드 시 기본값은 `production`, 개발 서버 실행 시 기본값은 `development`)
`-e, --extends=<layer-name>` |  | Nuxt 레이어로부터 확장합니다
<!--/prepare-opts-->

::note
이 명령은 `process.env.NODE_ENV`를 `production`으로 설정합니다.
::
