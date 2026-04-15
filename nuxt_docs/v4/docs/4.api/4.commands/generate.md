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
npx nuxt generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--profile[=verbose]]
```
<!--/generate-cmd-->

`generate` 명령어는 애플리케이션의 모든 라우트를 사전 렌더링하고, 어떤 정적 호스팅 서비스에도 배포할 수 있는 일반 HTML 파일로 결과를 저장합니다. 이 명령어는 `prerender` 인자를 `true`로 설정한 `nuxt build` 명령을 트리거합니다

## 인자 %{#arguments}%

<!--generate-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)       |
<!--/generate-args-->

## 옵션 %{#options}%

<!--generate-opts-->
| Option                               | Default | Description                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | 작업 디렉터리를 지정합니다. ROOTDIR보다 우선합니다 (기본값: `.`)                                                                                    |
| `--logLevel=<silent\|info\|verbose>` |         | 빌드 시 로그 레벨을 지정합니다                                                                                                                       |
| `--preset`                           |         | Nitro 서버 프리셋입니다                                                                                                                              |
| `--dotenv`                           |         | 루트 디렉터리를 기준으로 로드할 `.env` 파일 경로입니다                                                                                              |
| `--envName`                          |         | 설정 override를 해석할 때 사용할 환경입니다 (기본값은 빌드 시 `production`, dev 서버 실행 시 `development`)                                        |
| `-e, --extends=<layer-name>`         |         | Nuxt 레이어를 확장합니다                                                                                                                             |
| `--profile`                          |         | 성능을 프로파일링합니다(v4.4+). 종료 시 V8 CPU 프로파일과 JSON 리포트를 기록합니다. 전체 콘솔 리포트는 `--profile=verbose`를 사용하세요.           |
<!--/generate-opts-->

::read-more{to="/docs/4.x/getting-started/deployment#static-hosting"}
사전 렌더링과 정적 호스팅에 대해 더 알아보세요.
::
