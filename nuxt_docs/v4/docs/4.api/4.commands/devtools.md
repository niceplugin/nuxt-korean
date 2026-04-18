---
title: "nuxt devtools"
description: devtools 명령어를 사용하면 프로젝트별로 Nuxt DevTools를 활성화하거나 비활성화할 수 있습니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/devtools.ts
    size: xs
---

<!--devtools-cmd-->
```bash [Terminal]
npx nuxt devtools <COMMAND> [ROOTDIR] [--cwd=<directory>]
```
<!--/devtools-cmd-->

`nuxt devtools enable`을 실행하면 Nuxt DevTools가 전역으로 설치되고, 현재 사용 중인 특정 프로젝트에서도 활성화됩니다. 이 설정은 사용자 수준 `.nuxtrc`에 환경설정으로 저장됩니다. 특정 프로젝트에서 devtools 지원을 제거하고 싶다면 `nuxt devtools disable`을 실행하면 됩니다.

## 인자 %{#arguments}%

<!--devtools-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `COMMAND`     | 실행할 명령어입니다 (옵션: <enable\|disable>)  |
| `ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)       |
<!--/devtools-args-->

## 옵션 %{#options}%

<!--devtools-opts-->
| Option              | Default | Description                                                                      |
|---------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>` |         | 작업 디렉터리를 지정합니다. ROOTDIR보다 우선합니다 (기본값: `.`)                |
<!--/devtools-opts-->

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="\_blank"}
**Nuxt DevTools**에 대해 더 알아보세요.
::
