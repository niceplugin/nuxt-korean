---
title: "nuxt module"
description: "명령줄로 Nuxt 애플리케이션에 모듈을 검색하고 추가하세요."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/tree/main/packages/nuxi/src/commands/module
    size: xs
---

Nuxt는 [Nuxt modules](/modules)를 매끄럽게 다룰 수 있도록 몇 가지 유틸리티를 제공합니다.

## nuxt module add %{#nuxt-module-add}%

<!--module-add-cmd-->
```bash [Terminal]
npx nuxt module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig] [--dev]
```
<!--/module-add-cmd-->

<!--module-add-args-->
| 인자         | 설명                                                                |
|--------------|---------------------------------------------------------------------|
| `MODULENAME` | 설치할 모듈 이름을 하나 이상 지정합니다. 공백으로 구분합니다        |
<!--/module-add-args-->

<!--module-add-opts-->
| 옵션                                 | 기본값  | 설명                                |
|--------------------------------------|---------|-------------------------------------|
| `--cwd=<directory>`                  | `.`     | 작업 디렉터리를 지정합니다          |
| `--logLevel=<silent\|info\|verbose>` |         | 빌드 시 로그 레벨을 지정합니다      |
| `--skipInstall`                      |         | npm install을 건너뜁니다            |
| `--skipConfig`                       |         | nuxt.config.ts 업데이트를 건너뜁니다 |
| `--dev`                              |         | 모듈을 dev dependencies로 설치합니다 |
<!--/module-add-opts-->

이 명령을 사용하면 수동 작업 없이 애플리케이션에 [Nuxt modules](/modules)를 설치할 수 있습니다.

명령을 실행하면 다음 작업을 수행합니다:

- 패키지 매니저를 사용해 모듈을 의존성으로 설치합니다
- [package.json](/docs/4.x/directory-structure/package) 파일에 추가합니다
- [`nuxt.config`](/docs/4.x/directory-structure/nuxt-config) 파일을 업데이트합니다

**예시:**

[`Pinia`](/modules/pinia) 모듈 설치

```bash [Terminal]
npx nuxt module add pinia
```

## nuxt module search %{#nuxt-module-search}%

<!--module-search-cmd-->
```bash [Terminal]
npx nuxt module search <QUERY> [--cwd=<directory>] [--nuxtVersion=<2|3>]
```
<!--/module-search-cmd-->

### 인자 %{#arguments}%

<!--module-search-args-->
| 인자     | 설명                   |
|----------|------------------------|
| `QUERY`  | 검색할 키워드          |
<!--/module-search-args-->

### 옵션 %{#options}%

<!--module-search-opts-->
| 옵션                   | 기본값  | 설명                                                                               |
|------------------------|---------|------------------------------------------------------------------------------------|
| `--cwd=<directory>`    | `.`     | 작업 디렉터리를 지정합니다                                                         |
| `--nuxtVersion=<2\|3>` |         | Nuxt 버전으로 필터링해 호환 모듈만 표시합니다 (기본적으로 자동 감지)               |
<!--/module-search-opts-->

이 명령은 쿼리와 일치하고 현재 Nuxt 버전과 호환되는 Nuxt 모듈을 검색합니다.

**예시:**

```bash [Terminal]
npx nuxt module search pinia
```
