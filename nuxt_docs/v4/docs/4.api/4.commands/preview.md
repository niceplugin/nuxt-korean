---
title: "nuxt preview"
description: preview 명령어는 build 명령 뒤에 애플리케이션을 미리 볼 수 있도록 서버를 시작합니다.
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

`preview` 명령어는 `build` 명령을 실행한 뒤 Nuxt 애플리케이션을 미리 볼 수 있도록 서버를 시작합니다. `start` 명령은 `preview`의 별칭입니다. 프로덕션에서 애플리케이션을 실행할 때는 [Deployment 섹션](/docs/4.x/getting-started/deployment)을 참고하세요.

## 인자 %{#arguments}%

<!--preview-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)       |
<!--/preview-args-->

## 옵션 %{#options}%

<!--preview-opts-->
| Option                               | Default | Description                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | 작업 디렉터리를 지정합니다. ROOTDIR보다 우선합니다 (기본값: `.`)                                                                                    |
| `--logLevel=<silent\|info\|verbose>` |         | 빌드 시 로그 레벨을 지정합니다                                                                                                                       |
| `--envName`                          |         | 설정 override를 해석할 때 사용할 환경입니다 (기본값은 빌드 시 `production`, dev 서버 실행 시 `development`)                                        |
| `-e, --extends=<layer-name>`         |         | Nuxt 레이어를 확장합니다                                                                                                                             |
| `-p, --port`                         |         | 수신할 포트입니다 (`PORT` 환경 변수로 override 가능)                                                                                                 |
| `--dotenv`                           |         | 루트 디렉터리를 기준으로 로드할 `.env` 파일 경로입니다                                                                                              |
<!--/preview-opts-->

이 명령어는 `process.env.NODE_ENV`를 `production`으로 설정합니다. 재정의하려면 `.env` 파일이나 명령줄 인자로 `NODE_ENV`를 정의하세요.

::note
편의를 위해 preview 모드에서는 [`.env`](/docs/4.x/directory-structure/env) 파일이 `process.env`로 로드됩니다. (하지만 프로덕션에서는 환경 변수를 직접 설정해야 합니다. 예를 들어 Node.js 20+에서는 서버를 시작할 때 `node --env-file .env .output/server/index.mjs`를 실행할 수 있습니다.)
::
