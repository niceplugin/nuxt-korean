---
title: "nuxt info"
description: info 명령어는 현재 또는 지정한 Nuxt 프로젝트의 정보를 출력합니다.
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

`info` 명령어는 현재 또는 지정한 Nuxt 프로젝트의 정보를 출력합니다.

## 인자 %{#arguments}%

<!--info-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)       |
<!--/info-args-->

## 옵션 %{#options}%

<!--info-opts-->
| Option              | Default | Description                                                                      |
|---------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>` |         | 작업 디렉터리를 지정합니다. ROOTDIR보다 우선합니다 (기본값: `.`)                |
<!--/info-opts-->
