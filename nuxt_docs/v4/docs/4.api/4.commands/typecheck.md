---
title: "nuxt typecheck"
description: typecheck 명령은 vue-tsc를 실행하여 앱 전체의 타입을 검사합니다.
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

`typecheck` 명령은 [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc)를 실행하여 앱 전체의 타입을 검사합니다.

## Arguments %{arguments}%

<!--typecheck-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/typecheck-args-->

## Options %{options}%

<!--typecheck-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--dotenv` |  | 루트 디렉터리를 기준으로 로드할 `.env` 파일의 경로
`-e, --extends=<layer-name>` |  | Nuxt 레이어로부터 확장합니다
<!--/typecheck-opts-->

::note
이 명령은 `process.env.NODE_ENV`를 `production`으로 설정합니다. 이를 재정의하려면 [`.env`](/docs/4.x/directory-structure/env) 파일에서 또는 커맨드 라인 인자로 `NODE_ENV`를 정의하세요.
::

::read-more{to="/docs/4.x/guide/concepts/typescript#type-checking"}
빌드 또는 개발 시점에 타입 체크를 활성화하는 방법에 대해 더 알아보세요.
::
