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
npx nuxt upgrade [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dedupe] [-f, --force] [-ch, --channel=<stable|nightly|v3|v4|v4-nightly|v3-nightly>]
```
<!--/upgrade-cmd-->

`upgrade` 명령어는 Nuxt를 최신 버전으로 업그레이드합니다.

## 인자 %{#arguments}%

<!--upgrade-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)       |
<!--/upgrade-args-->

## 옵션 %{#options}%

<!--upgrade-opts-->
| Option                                                             | Default  | Description                                                                      |
|--------------------------------------------------------------------|----------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                                                |          | 작업 디렉터리를 지정합니다. ROOTDIR보다 우선합니다 (기본값: `.`)                |
| `--logLevel=<silent\|info\|verbose>`                               |          | 빌드 시 로그 레벨을 지정합니다                                                   |
| `--dedupe`                                                         |          | 업그레이드 후 종속성을 dedupe합니다                                              |
| `-f, --force`                                                      |          | lockfile과 node_modules를 다시 만들도록 업그레이드를 강제합니다                 |
| `-ch, --channel=<stable\|nightly\|v3\|v4\|v4-nightly\|v3-nightly>` | `stable` | 설치할 채널을 지정합니다 (기본값: stable)                                        |
<!--/upgrade-opts-->
