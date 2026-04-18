---
title: 'nuxt build-module'
description: '게시 전에 Nuxt 모듈을 빌드하는 Nuxt 명령어입니다.'
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

`build-module` 명령어는 `@nuxt/module-builder`를 실행해 `rootDir` 안에 **nuxt-module**의 전체 빌드가 들어 있는 `dist` 디렉터리를 생성합니다.

## 인자 %{#arguments}%

<!--build-module-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)       |
<!--/build-module-args-->

## 옵션 %{#options}%

<!--build-module-opts-->
| Option                               | Default | Description                                                                      |
|--------------------------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | 작업 디렉터리를 지정합니다. ROOTDIR보다 우선합니다 (기본값: `.`)                |
| `--logLevel=<silent\|info\|verbose>` |         | 빌드 시 로그 레벨을 지정합니다                                                   |
| `--build`                            | `false` | 배포용 모듈을 빌드합니다                                                         |
| `--stub`                             | `false` | 개발용으로 실제 빌드 대신 stub dist를 생성합니다                                |
| `--sourcemap`                        | `false` | sourcemap을 생성합니다                                                           |
| `--prepare`                          | `false` | 로컬 개발용으로 모듈을 준비합니다                                                |
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
`@nuxt/module-builder`에 대해 더 알아보세요.
::
