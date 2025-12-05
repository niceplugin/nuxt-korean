---
title: "nuxt preview"
description: preview 명령은 build 명령 이후 애플리케이션을 미리보기 위한 서버를 시작합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/preview.ts
    size: xs
---

<!--preview-cmd-->
```bash [Terminal]
npx nuxt preview [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [-e, --extends=<layer-name>] [-p, --port] [--dotenv]
```
<!--/preview-cmd-->

`preview` 명령은 `build` 명령을 실행한 후 Nuxt 애플리케이션을 미리보기 위한 서버를 시작합니다. `start` 명령은 `preview`의 별칭입니다. 프로덕션 환경에서 애플리케이션을 실행할 때는 [배포 섹션](/docs/4.x/getting-started/deployment)을 참고하세요.

## Arguments %{arguments}%

<!--preview-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다(기본값: `.`)
<!--/preview-args-->

## Options %{options}%

<!--preview-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다(기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--envName` |  | 설정 재정의를 해결할 때 사용할 환경을 지정합니다(빌드 시 기본값은 `production`, 개발 서버 실행 시 기본값은 `development`)
`-e, --extends=<layer-name>` |  | Nuxt 레이어를 확장합니다
`-p, --port` |  | 수신 대기할 포트(덮어쓰려면 `PORT` 환경 변수를 사용)
`--dotenv` |  | 로드할 `.env` 파일의 경로로, 루트 디렉터리를 기준으로 합니다
<!--/preview-opts-->

이 명령은 `process.env.NODE_ENV`를 `production`으로 설정합니다. 이를 재정의하려면 `.env` 파일에서 또는 커맨드라인 인수로 `NODE_ENV`를 정의하세요.

::note
편의를 위해, preview 모드에서는 [`.env`](/docs/4.x/directory-structure/env) 파일이 `process.env`로 로드됩니다. (그러나 프로덕션에서는 환경 변수가 직접 설정되어 있어야 합니다. 예를 들어 Node.js 20+에서는 서버를 시작하기 위해 `node --env-file .env .output/server/index.mjs`를 실행하는 방식으로 설정할 수 있습니다.)
::
