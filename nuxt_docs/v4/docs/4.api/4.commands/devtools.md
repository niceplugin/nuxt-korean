---
title: "nuxt devtools"
description: devtools 명령은 프로젝트별로 Nuxt DevTools를 활성화하거나 비활성화할 수 있게 해줍니다.
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

`nuxt devtools enable`을 실행하면 Nuxt DevTools가 전역으로 설치되고, 사용 중인 해당 프로젝트 내에서도 활성화됩니다. 이는 사용자 레벨의 `.nuxtrc`에 환경설정으로 저장됩니다. 특정 프로젝트에서 devtools 지원을 제거하려면 `nuxt devtools disable`을 실행하면 됩니다.

## Arguments %{arguments}%

<!--devtools-args-->
Argument | Description
--- | ---
`COMMAND` | 실행할 명령 (옵션: <enable\|disable>)
`ROOTDIR="."` | 작업 디렉터리 지정 (기본값: `.`)
<!--/devtools-args-->

## Options %{options}%

<!--devtools-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR보다 우선합니다 (기본값: `.`)
<!--/devtools-opts-->

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="\_blank"}
**Nuxt DevTools**에 대해 더 읽어보세요.
::
