---
title: 'nuxt cleanup'
description: '일반적으로 생성되는 Nuxt 파일과 캐시를 제거합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/cleanup.ts
    size: xs
---

<!--cleanup-cmd-->
```bash [Terminal]
npx nuxt cleanup [ROOTDIR] [--cwd=<directory>]
```
<!--/cleanup-cmd-->

`cleanup` 명령은 다음을 포함하여 일반적으로 생성되는 Nuxt 파일과 캐시를 제거합니다:

- `.nuxt`
- `.output`
- `node_modules/.vite`
- `node_modules/.cache`

## Arguments %{arguments}%

<!--cleanup-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/cleanup-args-->

## Options %{options}%

<!--cleanup-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다 (기본값: `.`)
<!--/cleanup-opts-->
