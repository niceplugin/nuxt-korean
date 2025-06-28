---
title: "nuxt module"
description: "명령줄을 사용하여 Nuxt 애플리케이션에 모듈을 검색하고 추가하세요."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/module/
    size: xs
---

Nuxt는 [Nuxt 모듈](/modules)을 원활하게 다룰 수 있는 몇 가지 유틸리티를 제공합니다.

## [nuxt module add](#nuxt-module-add)

<!--module-add-cmd-->
```bash [Terminal]
npx nuxt module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig] [--dev]
```
<!--/module-add-cmd-->

<!--module-add-args-->
인자 | 설명
--- | ---
`MODULENAME` | 모듈 이름
<!--/module-add-args-->

<!--module-add-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` | `.` | 작업 디렉터리 지정
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨 지정
`--skipInstall` |  | npm install 생략
`--skipConfig` |  | nuxt.config.ts 업데이트 생략
`--dev` |  | 모듈을 개발 의존성으로 설치
<!--/module-add-opts-->

이 명령어를 사용하면 [Nuxt 모듈](/modules)을 수동 작업 없이 애플리케이션에 설치할 수 있습니다.

명령어를 실행하면 다음 작업이 수행됩니다:

- 패키지 매니저를 사용하여 모듈을 의존성으로 설치합니다
- [package.json](/docs/guide/directory-structure/package) 파일에 추가합니다
- [`nuxt.config`](/docs/guide/directory-structure/nuxt-config) 파일을 업데이트합니다

**예시:**

[`Pinia`](/modules/pinia) 모듈 설치

```bash [Terminal]
npx nuxt module add pinia
```

## [nuxt module search](#nuxt-module-search)

<!--module-search-cmd-->
```bash [Terminal]
npx nuxt module search <QUERY> [--cwd=<directory>] [--nuxtVersion=<2|3>]
```
<!--/module-search-cmd-->

### [인자](#arguments)

<!--module-search-args-->
인자 | 설명
--- | ---
`QUERY` | 검색할 키워드
<!--/module-search-args-->

### [옵션](#options)

<!--module-search-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` | `.` | 작업 디렉터리 지정
`--nuxtVersion=<2\|3>` |  | Nuxt 버전별로 필터링하여 호환되는 모듈만 나열 (기본적으로 자동 감지)
<!--/module-search-opts-->

이 명령어는 입력한 쿼리와 일치하며, 사용 중인 Nuxt 버전과 호환되는 Nuxt 모듈을 검색합니다.

**예시:**

```bash [Terminal]
npx nuxt module search pinia
```
