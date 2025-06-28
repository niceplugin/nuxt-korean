---
title: "nuxt typecheck"
description: typecheck 명령어는 vue-tsc를 실행하여 앱 전체의 타입을 검사합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/typecheck.ts
    size: xs
---

<!--typecheck-cmd-->
```bash [Terminal]
npx nuxt typecheck [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>]
```
<!--/typecheck-cmd-->

`typecheck` 명령어는 [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc)를 실행하여 앱 전체의 타입을 검사합니다.

## [인자](#arguments)

<!--typecheck-args-->
인자 | 설명
--- | ---
`ROOTDIR="."` | 작업 디렉토리를 지정합니다 (기본값: `.`)
<!--/typecheck-args-->

## [옵션](#options)

<!--typecheck-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉토리를 지정합니다. 이 값이 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
<!--/typecheck-opts-->

::note
이 명령어는 `process.env.NODE_ENV`를 `production`으로 설정합니다. 이를 변경하려면 [`.env`](/docs/guide/directory-structure/env) 파일이나 커맨드라인 인자로 `NODE_ENV`를 정의하세요.
::

::read-more{to="/docs/guide/concepts/typescript#type-checking"}
빌드 또는 개발 시 타입 체크를 활성화하는 방법에 대해 더 알아보세요.
::
