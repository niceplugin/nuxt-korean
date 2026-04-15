---
title: "nuxt test"
description: test 명령어는 @nuxt/test-utils를 사용해 테스트를 실행합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/test.ts
    size: xs
---

<!--test-cmd-->
```bash [Terminal]
npx nuxt test [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dev] [--watch]
```
<!--/test-cmd-->

`test` 명령어는 [`@nuxt/test-utils`](/docs/getting-started/testing)를 사용해 테스트를 실행합니다. 아직 설정되지 않았다면 이 명령어는 `process.env.NODE_ENV`를 `test`로 설정합니다.

## 인자 %{#arguments}%

<!--test-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)       |
<!--/test-args-->

## 옵션 %{#options}%

<!--test-opts-->
| Option                               | Default | Description                                                                      |
|--------------------------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | 작업 디렉터리를 지정합니다. ROOTDIR보다 우선합니다 (기본값: `.`)                |
| `--logLevel=<silent\|info\|verbose>` |         | 빌드 시 로그 레벨을 지정합니다                                                   |
| `--dev`                              |         | dev 모드로 실행합니다                                                            |
| `--watch`                            |         | watch 모드                                                                       |
<!--/test-opts-->

::note
이 명령어는 `process.env.NODE_ENV`를 `test`로 설정합니다.
::
