---
title: "nuxt analyze"
description: "프로덕션 번들 또는 Nuxt 애플리케이션을 분석합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/analyze.ts
    size: xs
---

<!--analyze-cmd-->
```bash [Terminal]
npx nuxt analyze [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--name=<name>] [--no-serve]
```
<!--/analyze-cmd-->

`analyze` 명령은 Nuxt를 빌드하고 프로덕션 번들을 분석합니다(실험적).

## [인자](#arguments)

<!--analyze-args-->
인자 | 설명
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다(기본값: `.`)
<!--/analyze-args-->

## [옵션](#options)

<!--analyze-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값이 ROOTDIR보다 우선합니다(기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--dotenv` |  | 루트 디렉터리를 기준으로 불러올 `.env` 파일의 경로
`--name=<name>` | `default` | 분석의 이름
`--no-serve` |  | 분석 결과 제공을 건너뜁니다
<!--/analyze-opts-->

::note
이 명령은 `process.env.NODE_ENV`를 `production`으로 설정합니다.
::
