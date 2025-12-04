---
title: 'Nuxt 디렉터리 구조'
description: 'Nuxt 애플리케이션의 디렉터리 구조와 사용 방법을 알아보세요.'
navigation: false
---

Nuxt 애플리케이션은 코드를 구성하기 위해 사용되는 특정 디렉터리 구조를 가지고 있습니다. 이 구조는 이해하기 쉽고 일관된 방식으로 사용될 수 있도록 설계되었습니다.

## Root Directory %{root-directory}%

Nuxt 애플리케이션의 루트 디렉터리는 `nuxt.config.ts` 파일을 포함하는 디렉터리입니다. 이 파일은 Nuxt 애플리케이션을 구성하는 데 사용됩니다.

## App Directory %{app-directory}%

`app/` 디렉터리는 Nuxt 애플리케이션의 메인 디렉터리입니다. 다음과 같은 하위 디렉터리를 포함합니다:
- [`assets/`](/docs/4.x/directory-structure/app/assets): 빌드 도구(Vite 또는 webpack)가 처리할 웹사이트의 에셋
- [`components/`](/docs/4.x/directory-structure/app/components): 애플리케이션의 Vue 컴포넌트
- [`composables/`](/docs/4.x/directory-structure/app/composables): Vue 컴포저블을 추가
- [`layouts/`](/docs/4.x/directory-structure/app/layouts): 페이지를 감싸고 페이지 간 리렌더링을 방지하는 Vue 컴포넌트
- [`middleware/`](/docs/4.x/directory-structure/app/middleware): 특정 라우트로 이동하기 전에 코드를 실행
- [`pages/`](/docs/4.x/directory-structure/app/pages): 웹 애플리케이션 내에서 라우트를 생성하기 위한 파일 기반 라우팅
- [`plugins/`](/docs/4.x/directory-structure/app/plugins): Nuxt 애플리케이션 생성 시 Vue 플러그인 등을 사용
- [`utils/`](/docs/4.x/directory-structure/app/utils): 컴포넌트, 컴포저블, 페이지에서 사용할 수 있는 함수를 애플리케이션 전반에 추가

이 디렉터리에는 다음과 같은 특정 파일도 포함됩니다:
- [`app.config.ts`](/docs/4.x/directory-structure/app/app-config): 애플리케이션 내에서 반응형으로 사용할 수 있는 설정
- [`app.vue`](/docs/4.x/directory-structure/app/app): Nuxt 애플리케이션의 루트 컴포넌트
- [`error.vue`](/docs/4.x/directory-structure/app/error): Nuxt 애플리케이션의 에러 페이지

## Public Directory %{public-directory}%

[`public/`](/docs/4.x/directory-structure/public) 디렉터리는 Nuxt 애플리케이션의 공개 파일을 포함하는 디렉터리입니다. 이 디렉터리에 포함된 파일은 루트에서 서빙되며 빌드 과정에서 수정되지 않습니다.

이는 이름을 유지해야 하는 파일(예: `robots.txt`) _또는_ 변경 가능성이 거의 없는 파일(예: `favicon.ico`)에 적합합니다.

## Server Directory %{server-directory}%

[`server/`](/docs/4.x/directory-structure/server) 디렉터리는 Nuxt 애플리케이션의 서버 사이드 코드를 포함하는 디렉터리입니다. 다음과 같은 하위 디렉터리를 포함합니다:
- [`api/`](/docs/4.x/directory-structure/server#server-routes): 애플리케이션의 API 라우트를 포함합니다.
- [`routes/`](/docs/4.x/directory-structure/server#server-routes): 애플리케이션의 서버 라우트를 포함합니다(예: 동적 `/sitemap.xml`).
- [`middleware/`](/docs/4.x/directory-structure/server#server-middleware): 서버 라우트가 처리되기 전에 코드를 실행
- [`plugins/`](/docs/4.x/directory-structure/server#server-plugins): Nuxt 서버 생성 시 플러그인 등을 사용
- [`utils/`](/docs/4.x/directory-structure/server#server-utilities): 서버 코드에서 사용할 수 있는 함수를 애플리케이션 전반에 추가

## Shared Directory %{shared-directory}%

[`shared/`](/docs/4.x/directory-structure/shared) 디렉터리는 Nuxt 애플리케이션과 Nuxt 서버가 공유하는 코드를 포함하는 디렉터리입니다. 이 코드는 Vue 앱과 Nitro 서버 모두에서 사용할 수 있습니다.

## Content Directory %{content-directory}%

[`content/`](/docs/4.x/directory-structure/content) 디렉터리는 [Nuxt Content](https://content.nuxt.com) 모듈에 의해 활성화됩니다. 이 디렉터리는 Markdown 파일을 사용하여 애플리케이션을 위한 파일 기반 CMS를 만드는 데 사용됩니다.

## Modules Directory %{modules-directory}%

[`modules/`](/docs/4.x/directory-structure/modules) 디렉터리는 Nuxt 애플리케이션의 로컬 모듈을 포함하는 디렉터리입니다. 모듈은 Nuxt 애플리케이션의 기능을 확장하는 데 사용됩니다.

## Nuxt Files %{nuxt-files}%

- [`nuxt.config.ts`](/docs/4.x/directory-structure/nuxt-config) 파일은 Nuxt 애플리케이션의 메인 설정 파일입니다.
- [`.nuxtrc`](/docs/4.x/directory-structure/nuxtrc) 파일은 Nuxt 애플리케이션을 구성하기 위한 또 다른 문법입니다(전역 설정에 유용).
- [`.nuxtignore`](/docs/4.x/directory-structure/nuxtignore) 파일은 빌드 단계에서 루트 디렉터리의 파일을 무시하는 데 사용됩니다.
