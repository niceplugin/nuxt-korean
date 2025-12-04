---
title: "nuxt module"
description: "명령줄을 사용하여 Nuxt 애플리케이션에 모듈을 검색하고 추가합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/tree/main/packages/nuxi/src/commands/module
    size: xs
---

Nuxt는 [Nuxt 모듈](https://nuxt.com/modules)을 원활하게 다룰 수 있는 몇 가지 유틸리티를 제공합니다.

## nuxt module add %{nuxt-module-add}%

<!--module-add-cmd-->
```bash [Terminal]
npx nuxt module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig] [--dev]
```
<!--/module-add-cmd-->

<!--module-add-args-->
Argument | Description
--- | ---
`MODULENAME` | 공백으로 구분하여 설치할 하나 이상의 모듈 이름을 지정합니다
<!--/module-add-args-->

<!--module-add-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` | `.` | 작업 디렉터리를 지정합니다
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--skipInstall` |  | npm install을 건너뜁니다
`--skipConfig` |  | nuxt.config.ts 업데이트를 건너뜁니다
`--dev` |  | 모듈을 개발 의존성으로 설치합니다
<!--/module-add-opts-->

이 명령을 사용하면 수동 작업 없이 애플리케이션에 [Nuxt 모듈](https://nuxt.com/modules)을 설치할 수 있습니다.

명령을 실행하면 다음을 수행합니다:

- 패키지 관리자를 사용하여 모듈을 의존성으로 설치합니다
- [package.json](/docs/4.x/directory-structure/package) 파일에 추가합니다
- [`nuxt.config`](/docs/4.x/directory-structure/nuxt-config) 파일을 업데이트합니다

**예시:**

[`Pinia`](https://nuxt.com/modules/pinia) 모듈 설치

```bash [Terminal]
npx nuxt module add pinia
```

## nuxt module search %{nuxt-module-search}%

<!--module-search-cmd-->
```bash [Terminal]
npx nuxt module search <QUERY> [--cwd=<directory>] [--nuxtVersion=<2|3>]
```
<!--/module-search-cmd-->

### Arguments %{arguments}%

<!--module-search-args-->
Argument | Description
--- | ---
`QUERY` | 검색할 키워드
<!--/module-search-args-->

### Options %{options}%

<!--module-search-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` | `.` | 작업 디렉터리를 지정합니다
`--nuxtVersion=<2\|3>` |  | Nuxt 버전으로 필터링하고 호환되는 모듈만 나열합니다 (기본적으로 자동 감지)
<!--/module-search-opts-->

이 명령은 사용 중인 Nuxt 버전과 호환되며, 쿼리와 일치하는 Nuxt 모듈을 검색합니다.

**예시:**

```bash [Terminal]
npx nuxt module search pinia
```
