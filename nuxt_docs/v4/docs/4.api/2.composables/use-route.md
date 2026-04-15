---
title: "useRoute"
description: useRoute 컴포저블은 현재 route를 반환합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
Vue 컴포넌트의 템플릿 안에서는 `$route`를 사용해 route에 접근할 수 있습니다.
::

`useRoute` 컴포저블은 `vue-router`의 같은 이름 컴포저블을 감싼 래퍼로, Nuxt 애플리케이션에서 현재 route에 접근할 수 있게 해줍니다.

핵심 차이점은 Nuxt에서는 이 컴포저블이 내비게이션 후 페이지 콘텐츠가 바뀐 **이후에만** route를 업데이트하도록 보장한다는 점입니다.
반면 `vue-router` 버전은 route를 **즉시** 업데이트하므로, 예를 들어 route 메타데이터에 의존하는 템플릿의 서로 다른 부분 사이에서
동기화 문제가 발생할 수 있습니다.

## 예제 %{#example}%

다음 예제에서는 동적 페이지 매개변수 `slug`를 URL의 일부로 사용해 [`useFetch`](/docs/4.x/api/composables/use-fetch)로 API를 호출합니다.

```html [~/pages/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data: mountain } = await useFetch(`/api/mountains/${route.params.slug}`)
</script>

<template>
  <div>
    <h1>{{ mountain.title }}</h1>
    <p>{{ mountain.description }}</p>
  </div>
</template>
```

route query 매개변수(예: `/test?example=true` 경로의 `example`)에 접근해야 한다면 `useRoute().params` 대신 `useRoute().query`를 사용할 수 있습니다.

## API %{#api}%

동적 매개변수와 query 매개변수 외에도 `useRoute()`는 현재 route와 관련된 다음 computed reference를 제공합니다:

- `fullPath`: path, query, hash를 포함하는 현재 route의 인코딩된 URL
- `hash`: `#`로 시작하는 URL의 디코딩된 hash 부분
- `query`: route query 매개변수에 접근
- `matched`: 현재 route location과 함께 정규화된 matched routes 배열
- `meta`: 레코드에 연결된 커스텀 데이터
- `name`: route record의 고유 이름
- `path`: URL의 인코딩된 pathname 부분
- `redirectedFrom`: 현재 route location에 도달하기 전에 접근을 시도했던 route location

## 흔한 실수 %{#common-pitfalls}%

### Route 동기화 문제 %{#route-synchronization-issues}%

페이지 내비게이션 중 동기화 문제를 피하려면 `vue-router`의 것이 아니라 Nuxt의 `useRoute()` 컴포저블을 사용하는 것이 중요합니다.
`vue-router`에서 `useRoute`를 직접 import하면 Nuxt 구현을 우회하게 됩니다.

```ts twoslash
// ❌ `vue-router`의 `useRoute`를 사용하지 마세요
// @errors: 2300
import { useRoute } from 'vue-router'
// ✅ Nuxt의 `useRoute` 컴포저블을 사용하세요
import { useRoute } from '#app'
```

### 미들웨어에서 `useRoute` 호출하기 %{#calling-useroute-in-middleware}%

미들웨어에서 `useRoute`를 사용하는 것은 예기치 않은 동작을 일으킬 수 있으므로 권장되지 않습니다.
미들웨어에는 "현재 route"라는 개념이 없습니다.
`useRoute()` 컴포저블은 Vue 컴포넌트의 setup 함수나 Nuxt plugin 안에서만 사용해야 합니다.

::warning
이는 내부적으로 `useRoute()`를 사용하는 모든 컴포저블에도 적용됩니다.
::

::read-more{to="/docs/4.x/directory-structure/app/middleware"}
미들웨어 섹션에서 route에 접근하는 방법을 더 알아보세요.
::

### `route.fullPath`의 Hydration 문제 %{#hydration-issues-with-route-fullpath}%

브라우저는 요청을 보낼 때 [URL fragments](https://url.spec.whatwg.org/#concept-url-fragment)(예: `#foo`)를 전송하지 않습니다. 따라서 `route.fullPath`를 템플릿에 반영하면 클라이언트에는 fragment가 포함되지만 서버에는 포함되지 않아 hydration 문제가 발생할 수 있습니다.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/type-aliases/routelocationnormalizedloaded"}
