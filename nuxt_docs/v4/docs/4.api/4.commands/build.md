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
npx nuxt build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>]
```
<!--/build-cmd-->

`build` 명령은 프로덕션 준비가 완료된 애플리케이션, 서버 및 모든 의존성이 포함된 `.output` 디렉터리를 생성합니다.

## Arguments %{arguments}%

<!--build-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/build-args-->

## Options %{options}%

<!--build-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR 보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--prerender` |  | Nuxt를 빌드하고 정적 라우트를 프리렌더링합니다
`--preset` |  | Nitro 서버 프리셋
`--dotenv` |  | 루트 디렉터리를 기준으로 로드할 `.env` 파일의 경로
`--envName` |  | 설정 오버라이드를 해결할 때 사용할 환경 이름 (`build` 시 기본값은 `production`, 개발 서버 실행 시 기본값은 `development`)
`-e, --extends=<layer-name>` |  | Nuxt 레이어를 확장합니다
<!--/build-opts-->

::note
이 명령은 `process.env.NODE_ENV`를 `production`으로 설정합니다.
::

::note
`--prerender`는 항상 `preset`을 `static`으로 설정합니다.
::
