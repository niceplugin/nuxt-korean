---
title: "nuxt info"
description: info 명령은 현재 또는 지정된 Nuxt 프로젝트에 대한 정보를 로그로 출력합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/info.ts
    size: xs
---

<!--info-cmd-->
```bash [Terminal]
npx nuxt info [ROOTDIR] [--cwd=<directory>]
```
<!--/info-cmd-->

`info` 명령은 현재 또는 지정된 Nuxt 프로젝트에 대한 정보를 로그로 출력합니다.

## Arguments %{arguments}%

<!--info-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/info-args-->

## Options %{options}%

<!--info-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 옵션은 ROOTDIR보다 우선합니다 (기본값: `.`)
<!--/info-opts-->
