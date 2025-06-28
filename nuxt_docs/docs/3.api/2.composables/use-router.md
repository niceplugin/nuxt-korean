---
title: "useRouter"
description: "useRouter 컴포저블은 라우터 인스턴스를 반환합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

템플릿 내에서만 라우터 인스턴스가 필요하다면 `$router`를 사용하세요:

```vue [pages/index.vue]
<template>
  <button @click="$router.back()">뒤로가기</button>
</template>
```

`pages/` 디렉토리가 있다면, `useRouter`는 `vue-router`에서 제공하는 것과 동일하게 동작합니다.

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute" target="_blank"}
`Router` 인터페이스에 대한 `vue-router` 문서를 읽어보세요.
::

## [기본 조작](#basic-manipulation)

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute): 라우터 인스턴스에 새로운 라우트를 추가합니다. `parentName`을 제공하면 기존 라우트의 자식으로 새 라우트를 추가할 수 있습니다.
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute): 이름으로 기존 라우트를 제거합니다.
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes): 모든 라우트 레코드의 전체 목록을 가져옵니다.
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute): 주어진 이름의 라우트가 존재하는지 확인합니다.
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve): 라우트 위치의 정규화된 버전을 반환합니다. 또한 기존 base가 포함된 `href` 속성도 포함합니다.

```ts [예시]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()`는 라우트 세부 정보를 라우트 배열에 추가하며, [Nuxt 플러그인](/docs/guide/directory-structure/plugins)을 만들 때 유용합니다. 반면 `router.push()`는 즉시 새로운 네비게이션을 트리거하며, 페이지, Vue 컴포넌트 및 컴포저블에서 유용합니다.
::

## [History API 기반](#based-on-history-api)

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back): 가능하다면 히스토리에서 뒤로 이동합니다. `router.go(-1)`과 동일합니다.
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward): 가능하다면 히스토리에서 앞으로 이동합니다. `router.go(1)`과 동일합니다.
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go): `router.back()` 및 `router.forward()`에서 적용되는 계층적 제한 없이 히스토리를 앞이나 뒤로 이동합니다.
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push): 히스토리 스택에 항목을 추가하여 프로그래밍 방식으로 새 URL로 이동합니다. **[`navigateTo`](/docs/api/utils/navigate-to) 사용을 권장합니다.**
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace): 라우트 히스토리 스택의 현재 항목을 교체하여 프로그래밍 방식으로 새 URL로 이동합니다. **[`navigateTo`](/docs/api/utils/navigate-to) 사용을 권장합니다.**

```ts [예시]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: "/home" })
router.replace({ hash: "#bio" })
```

::read-more{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
브라우저의 History API에 대해 더 알아보세요.
::

## [네비게이션 가드](#navigation-guards)

`useRouter` 컴포저블은 네비게이션 가드 역할을 하는 `afterEach`, `beforeEach`, `beforeResolve` 헬퍼 메서드를 제공합니다.

하지만 Nuxt에는 네비게이션 가드 구현을 단순화하고 더 나은 개발자 경험을 제공하는 **라우트 미들웨어** 개념이 있습니다.

:read-more{to="/docs/guide/directory-structure/middleware"}

## [Promise 및 에러 처리](#promise-and-error-handling)

- [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady): 라우터가 초기 네비게이션을 완료하면 resolve되는 Promise를 반환합니다.
- [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError): 네비게이션 중에 처리되지 않은 에러가 발생할 때마다 호출되는 에러 핸들러를 추가합니다.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Methods" title="Vue Router Docs" target="_blank"}

## [유니버설 라우터 인스턴스](#universal-router-instance)

`pages/` 폴더가 없다면, [`useRouter`](/docs/api/composables/use-router)는 유사한 헬퍼 메서드를 가진 유니버설 라우터 인스턴스를 반환하지만, 모든 기능이 지원되거나 `vue-router`와 정확히 동일하게 동작하지 않을 수 있습니다.
