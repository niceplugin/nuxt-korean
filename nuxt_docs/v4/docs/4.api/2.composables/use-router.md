---
title: "useRouter"
description: "useRouter 컴포저블은 router 인스턴스를 반환합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [app/pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

템플릿 안에서 router 인스턴스만 필요하다면 `$router`를 사용하세요:

```vue [app/pages/index.vue]
<template>
  <button @click="$router.back()">
    뒤로
  </button>
</template>
```

`app/pages/` 디렉터리가 있다면 `useRouter`는 `vue-router`가 제공하는 것과 동일하게 동작합니다.

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/router#Properties-currentRoute-" target="_blank"}
`Router` 인터페이스에 대한 `vue-router` 문서를 읽어보세요.
::

## 기본 조작 %{#basic-manipulation}%

- [`addRoute()`](https://router.vuejs.org/api/interfaces/router#addRoute-): router 인스턴스에 새 route를 추가합니다. `parentName`을 제공하면 기존 route의 자식으로 새 route를 추가할 수 있습니다.
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/router#removeRoute-): 이름으로 기존 route를 제거합니다.
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/router#getRoutes-): 모든 route record의 전체 목록을 가져옵니다.
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/router#hasRoute-): 주어진 이름의 route가 존재하는지 확인합니다.
- [`resolve()`](https://router.vuejs.org/api/interfaces/router#resolve-): route location의 정규화된 버전을 반환합니다. 기존 base를 포함한 `href` 속성도 포함됩니다.

```ts [Example]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()`는 route 정보를 route 배열에 추가하며 [Nuxt plugins](/docs/4.x/directory-structure/app/plugins)를 만들 때 유용합니다. 반면 `router.push()`는 즉시 새로운 내비게이션을 트리거하므로 페이지, Vue 컴포넌트, 컴포저블에서 유용합니다.
::

## History API 기반 %{#based-on-history-api}%

- [`back()`](https://router.vuejs.org/api/interfaces/router#back-): 가능하면 히스토리에서 뒤로 이동합니다. `router.go(-1)`과 같습니다.
- [`forward()`](https://router.vuejs.org/api/interfaces/router#forward-): 가능하면 히스토리에서 앞으로 이동합니다. `router.go(1)`과 같습니다.
- [`go()`](https://router.vuejs.org/api/interfaces/router#go-): `router.back()`와 `router.forward()`에 적용되는 계층 제약 없이 히스토리에서 앞이나 뒤로 이동합니다.
- [`push()`](https://router.vuejs.org/api/interfaces/router#push-): 히스토리 스택에 항목을 추가해 프로그래밍 방식으로 새 URL로 이동합니다. **대신 [`navigateTo`](/docs/4.x/api/utils/navigate-to)를 사용하는 것이 권장됩니다.**
- [`replace()`](https://router.vuejs.org/api/interfaces/router#replace-): routes 히스토리 스택의 현재 항목을 교체해 프로그래밍 방식으로 새 URL로 이동합니다. **대신 [`navigateTo`](/docs/4.x/api/utils/navigate-to)를 사용하는 것이 권장됩니다.**

```ts [Example]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: '/home' })
router.replace({ hash: '#bio' })
```

::read-more{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
브라우저의 History API에 대해 더 알아보세요.
::

## Navigation Guards %{#navigation-guards}%

`useRouter` 컴포저블은 navigation guards로 동작하는 `afterEach`, `beforeEach`, `beforeResolve` 헬퍼 메서드를 제공합니다.

하지만 Nuxt에는 navigation guards 구현을 단순화하고 더 나은 개발자 경험을 제공하는 **route middleware** 개념이 있습니다.

:read-more{to="/docs/4.x/directory-structure/app/middleware"}

## Promise 및 오류 처리 %{#promise-and-error-handling}%

- [`isReady()`](https://router.vuejs.org/api/interfaces/router#isReady-): router가 초기 내비게이션을 완료하면 resolve되는 Promise를 반환합니다.
- [`onError`](https://router.vuejs.org/api/interfaces/router#onError-): 내비게이션 중 잡히지 않은 오류가 발생할 때마다 호출되는 오류 핸들러를 추가합니다.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/router#Methods-" title="Vue Router Docs" target="_blank"}

## 범용 Router 인스턴스 %{#universal-router-instance}%

`app/pages/` 폴더가 없다면 [`useRouter`](/docs/4.x/api/composables/use-router)는 비슷한 헬퍼 메서드를 가진 범용 router 인스턴스를 반환합니다. 다만 모든 기능이 지원되거나 `vue-router`와 정확히 같은 방식으로 동작하는 것은 아니라는 점에 유의하세요.
