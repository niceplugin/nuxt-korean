---
title: "nuxt preview"
description: preview 명령어는 build 명령어 이후에 애플리케이션을 미리보기 위한 서버를 시작합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/preview.ts
    size: xs
---

<!--preview-cmd-->
```bash [Terminal]
npx nuxt preview [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [--dotenv] [-p, --port]
```
<!--/preview-cmd-->

`preview` 명령어는 `build` 명령어를 실행한 후 Nuxt 애플리케이션을 미리보기 위한 서버를 시작합니다. `start` 명령어는 `preview`의 별칭입니다. 프로덕션 환경에서 애플리케이션을 실행할 때는 [배포 섹션](/docs/getting-started/deployment)을 참고하세요.

## [인자](#arguments)

<!--preview-args-->
인자 | 설명
--- | ---
`ROOTDIR="."` | 작업 디렉토리를 지정합니다 (기본값: `.`)
<!--/preview-args-->

## [옵션](#options)

<!--preview-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉토리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--envName` |  | 구성 오버라이드를 해결할 때 사용할 환경을 지정합니다 (빌드 시 기본값은 `production`, 개발 서버 실행 시 기본값은 `development`)
`--dotenv` |  | 로드할 `.env` 파일의 경로를 지정합니다. 루트 디렉토리 기준 상대 경로입니다
`-p, --port` |  | 리스닝할 포트를 지정합니다 (기본값: `NUXT_PORT \|\| NITRO_PORT \|\| PORT`)
<!--/preview-opts-->

이 명령어는 `process.env.NODE_ENV`를 `production`으로 설정합니다. 이를 오버라이드하려면 `.env` 파일이나 커맨드라인 인자로 `NODE_ENV`를 정의하세요.

::note
편의를 위해, 미리보기 모드에서는 [`.env`](/docs/guide/directory-structure/env) 파일이 `process.env`에 로드됩니다. (하지만 프로덕션 환경에서는 환경 변수를 직접 설정해야 합니다. 예를 들어, Node.js 20+에서는 `node --env-file .env .output/server/index.mjs` 명령어로 서버를 시작할 수 있습니다.)
::
