---
title: "nuxt analyze"
description: "Nuxt 애플리케이션의 프로덕션 번들을 분석합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/analyze.ts
    size: xs
---

<!--analyze-cmd-->
```bash [Terminal]
npx nuxt analyze [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [-e, --extends=<layer-name>] [--name=<name>] [--no-serve]
```
<!--/analyze-cmd-->

`analyze` 명령은 Nuxt를 빌드하고 프로덕션 번들을 분석합니다(실험적).

## Arguments %{arguments}%

<!--analyze-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다(기본값: `.`)
<!--/analyze-args-->

## Options %{options}%

<!--analyze-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다(기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--dotenv` |  | 루트 디렉터리를 기준으로 로드할 `.env` 파일의 경로
`-e, --extends=<layer-name>` |  | Nuxt 레이어로부터 확장합니다
`--name=<name>` | `default` | 분석 이름
`--no-serve` |  | 분석 결과를 서빙하지 않습니다
<!--/analyze-opts-->

::note
이 명령은 `process.env.NODE_ENV`를 `production`으로 설정합니다.
::
