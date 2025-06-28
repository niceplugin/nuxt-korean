---
title: 'nuxt cleanup'
description: '일반적으로 생성된 Nuxt 파일과 캐시를 제거합니다.'
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

`cleanup` 명령어는 일반적으로 생성된 Nuxt 파일과 캐시를 제거합니다. 여기에는 다음이 포함됩니다:

- `.nuxt`
- `.output`
- `node_modules/.vite`
- `node_modules/.cache`

## [인자](#arguments)

<!--cleanup-args-->
인자 | 설명
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/cleanup-args-->

## [옵션](#options)

<!--cleanup-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값이 ROOTDIR보다 우선합니다 (기본값: `.`)
<!--/cleanup-opts-->
