---
title: "nuxt upgrade"
description: upgrade 명령은 Nuxt를 최신 버전으로 업그레이드합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/upgrade.ts
    size: xs
---

<!--upgrade-cmd-->
```bash [Terminal]
npx nuxt upgrade [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dedupe] [-f, --force] [-ch, --channel=<stable|nightly|v3|v4|v4-nightly|v3-nightly>]
```
<!--/upgrade-cmd-->

`upgrade` 명령은 Nuxt를 최신 버전으로 업그레이드합니다.

## Arguments %{arguments}%

<!--upgrade-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/upgrade-args-->

## Options %{options}%

<!--upgrade-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--dedupe` |  | 업그레이드 후 의존성을 중복 제거합니다
`-f, --force` |  | 잠금 파일과 node_modules를 다시 생성하도록 강제 업그레이드합니다
`-ch, --channel=<stable\|nightly\|v3\|v4\|v4-nightly\|v3-nightly>` | `stable` | 설치에 사용할 채널을 지정합니다 (기본값: stable)
<!--/upgrade-opts-->
