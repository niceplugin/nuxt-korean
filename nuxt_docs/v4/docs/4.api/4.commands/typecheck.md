---
title: "nuxt typecheck"
description: typecheck 명령어는 vue-tsc를 실행해 앱 전체의 타입을 검사합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/typecheck.ts
    size: xs
---

<!--typecheck-cmd-->
```bash [Terminal]
npx nuxt typecheck [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [-e, --extends=<layer-name>]
```
<!--/typecheck-cmd-->

`typecheck` 명령어는 [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc)를 실행해 앱 전체의 타입을 검사합니다.

## 인자 %{#arguments}%

<!--typecheck-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)       |
<!--/typecheck-args-->

## 옵션 %{#options}%

<!--typecheck-opts-->
| Option                               | Default | Description                                                                      |
|--------------------------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | 작업 디렉터리를 지정합니다. ROOTDIR보다 우선합니다 (기본값: `.`)                |
| `--logLevel=<silent\|info\|verbose>` |         | 빌드 시 로그 레벨을 지정합니다                                                   |
| `--dotenv`                           |         | 루트 디렉터리를 기준으로 로드할 `.env` 파일 경로입니다                           |
| `-e, --extends=<layer-name>`         |         | Nuxt 레이어를 확장합니다                                                         |
<!--/typecheck-opts-->

::note
이 명령어는 `process.env.NODE_ENV`를 `production`으로 설정합니다. 재정의하려면 [`.env`](/docs/4.x/directory-structure/env) 파일이나 명령줄 인자로 `NODE_ENV`를 정의하세요.
::

::read-more{to="/docs/4.x/guide/concepts/typescript#type-checking"}
빌드 시 또는 개발 중 타입 검사를 활성화하는 방법을 더 알아보세요.
::
