---
title: 'nuxt build-module'
description: '게시하기 전에 Nuxt 모듈을 빌드하기 위한 Nuxt 명령어입니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/module-builder/blob/main/src/cli.ts
    size: xs
---

<!--build-module-cmd-->
```bash [Terminal]
npx nuxt build-module [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--build] [--stub] [--sourcemap] [--prepare]
```
<!--/build-module-cmd-->

`build-module` 명령어는 `@nuxt/module-builder`를 실행하여 `rootDir` 내에 `dist` 디렉터리를 생성하며, 이 디렉터리에는 **nuxt-module**의 전체 빌드 결과가 포함됩니다.

## Arguments %{arguments}%

<!--build-module-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/build-module-args-->

## Options %{options}%

<!--build-module-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--build` | `false` | 배포용으로 모듈을 빌드합니다
`--stub` | `false` | 개발용으로 실제 빌드 대신 dist를 스텁으로 생성합니다
`--sourcemap` | `false` | 소스맵을 생성합니다
`--prepare` | `false` | 로컬 개발을 위해 모듈을 준비합니다
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
`@nuxt/module-builder`에 대해 더 읽어보세요.
::
