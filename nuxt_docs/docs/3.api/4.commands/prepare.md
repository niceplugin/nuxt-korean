---
title: 'nuxt prepare'
description: prepare 명령어는 애플리케이션에 .nuxt 디렉터리를 생성하고 타입을 생성합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/prepare.ts
    size: xs
---

<!--prepare-cmd-->
```bash [Terminal]
npx nuxt prepare [ROOTDIR] [--dotenv] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName]
```
<!--/prepare-cmd-->

`prepare` 명령어는 애플리케이션에 [`.nuxt`](/docs/guide/directory-structure/nuxt) 디렉터리를 생성하고 타입을 생성합니다. 이는 CI 환경이나 [`package.json`](/docs/guide/directory-structure/package)에서 `postinstall` 명령어로 사용할 때 유용할 수 있습니다.

## [인자](#arguments)

<!--prepare-args-->
인자 | 설명
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/prepare-args-->

## [옵션](#options)

<!--prepare-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--dotenv` |  | 루트 디렉터리를 기준으로 로드할 `.env` 파일의 경로
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값이 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--envName` |  | 구성 오버라이드를 해결할 때 사용할 환경을 지정합니다 (빌드 시 기본값은 `production`, 개발 서버 실행 시 기본값은 `development`)
<!--/prepare-opts-->
