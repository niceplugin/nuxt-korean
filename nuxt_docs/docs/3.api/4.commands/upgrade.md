---
title: "nuxt upgrade"
description: upgrade 명령어는 Nuxt를 최신 버전으로 업그레이드합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/upgrade.ts
    size: xs
---

<!--upgrade-cmd-->
```bash [Terminal]
npx nuxt upgrade [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dedupe] [-f, --force] [-ch, --channel=<stable|nightly>]
```
<!--/upgrade-cmd-->

`upgrade` 명령어는 Nuxt를 최신 버전으로 업그레이드합니다.

## [인자](#arguments)

<!--upgrade-args-->
인자 | 설명
--- | ---
`ROOTDIR="."` | 작업 디렉토리를 지정합니다 (기본값: `.`)
<!--/upgrade-args-->

## [옵션](#options)

<!--upgrade-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉토리를 지정합니다. 이 값이 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--dedupe` |  | 의존성을 중복 제거하지만 lockfile은 새로 생성하지 않습니다
`-f, --force` |  | lockfile과 node_modules를 새로 생성하여 강제로 업그레이드합니다
`-ch, --channel=<stable\|nightly>` | `stable` | 설치할 채널을 지정합니다 (기본값: stable)
<!--/upgrade-opts-->
