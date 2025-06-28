---
title: 'nuxt build-module'
description: 'Nuxt 명령어로 Nuxt 모듈을 배포 전에 빌드합니다.'
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

`build-module` 명령어는 `@nuxt/module-builder`를 실행하여 **nuxt-module**의 전체 빌드가 포함된 `dist` 디렉토리를 `rootDir` 내에 생성합니다.

## [인자](#arguments)

<!--build-module-args-->
인자 | 설명
--- | ---
`ROOTDIR="."` | 작업 디렉토리를 지정합니다 (기본값: `.`)
<!--/build-module-args-->

## [옵션](#options)

<!--build-module-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉토리를 지정합니다. 이 값이 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--build` | `false` | 배포를 위해 모듈을 빌드합니다
`--stub` | `false` | 실제로 빌드하지 않고 개발을 위해 dist를 스텁 처리합니다
`--sourcemap` | `false` | 소스맵을 생성합니다
`--prepare` | `false` | 로컬 개발을 위해 모듈을 준비합니다
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
`@nuxt/module-builder`에 대해 더 알아보기.
::
