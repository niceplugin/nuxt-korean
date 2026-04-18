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
npx nuxt build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--profile[=verbose]]
```
<!--/build-cmd-->

`build` 명령어는 애플리케이션, 서버, 종속성이 모두 프로덕션 준비가 된 `.output` 디렉터리를 생성합니다.

## 인자 %{#arguments}%

<!--build-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)       |
<!--/build-args-->

## 옵션 %{#options}%

<!--build-opts-->
| Option                               | Default | Description                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | 작업 디렉터리를 지정합니다. ROOTDIR보다 우선합니다 (기본값: `.`)                                                                                    |
| `--logLevel=<silent\|info\|verbose>` |         | 빌드 시 로그 레벨을 지정합니다                                                                                                                       |
| `--prerender`                        |         | Nuxt를 빌드하고 정적 라우트를 사전 렌더링합니다                                                                                                      |
| `--preset=<preset>`                  |         | Nitro 서버 프리셋을 지정합니다. 사용 가능한 프리셋은 Nitro에 따라 달라집니다 (예: `node-server`, `vercel`, `netlify`, `static`)                   |
| `--dotenv`                           |         | 루트 디렉터리를 기준으로 로드할 `.env` 파일 경로입니다                                                                                              |
| `--envName`                          |         | 설정 override를 해석할 때 사용할 환경입니다 (기본값은 빌드 시 `production`, dev 서버 실행 시 `development`)                                        |
| `-e, --extends=<layer-name>`         |         | Nuxt 레이어를 확장합니다                                                                                                                             |
| `--profile`                          |         | 성능을 프로파일링합니다(v4.4+). 종료 시 V8 CPU 프로파일과 JSON 리포트를 기록합니다. 전체 콘솔 리포트는 `--profile=verbose`를 사용하세요.           |
<!--/build-opts-->

::note
이 명령어는 `process.env.NODE_ENV`를 `production`으로 설정합니다.
::

::note
`--prerender`는 항상 `preset`을 `static`으로 설정합니다
::
