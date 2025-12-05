---
title: "useRoute"
description: useRoute 컴포저블은 현재 라우트를 반환합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
Vue 컴포넌트의 템플릿 안에서는 `$route`를 사용해 라우트에 접근할 수 있습니다.
::

`useRoute` 컴포저블은 `vue-router`에 동일한 이름으로 존재하는 컴포저블을 감싼 것으로, Nuxt 애플리케이션에서 현재 라우트에 접근할 수 있게 해 줍니다.

핵심적인 차이점은 Nuxt에서는 내비게이션 이후 **페이지 콘텐츠가 변경된 뒤에만** 라우트가 업데이트되도록 이 컴포저블이 보장한다는 점입니다.
반면 `vue-router` 버전은 라우트를 **즉시** 업데이트하며,
이는 예를 들어 라우트 메타데이터에 의존하는 템플릿의 서로 다른 부분들 사이에서 동기화 문제를 일으킬 수 있습니다.

## Example %{example}%

다음 예시에서는 동적 페이지 파라미터인 `slug`를 URL의 일부로 사용하여 [`useFetch`](/docs/4.x/api/composables/use-fetch)를 통해 API를 호출합니다.

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

라우트 쿼리 파라미터(예: `/test?example=true` 경로의 `example`)에 접근해야 한다면, `useRoute().params` 대신 `useRoute().query`를 사용할 수 있습니다.

## API %{api}%

동적 파라미터와 쿼리 파라미터 외에도, `useRoute()`는 현재 라우트와 관련된 다음과 같은 계산된 ref들을 제공합니다:

- `fullPath`: 경로, 쿼리, 해시를 모두 포함하는 현재 라우트에 연결된 인코딩된 URL
- `hash`: # 문자로 시작하는 URL의 디코딩된 해시 부분
- `query`: 라우트 쿼리 파라미터에 접근
- `matched`: 현재 라우트 위치와 일치하는 정규화된 라우트들의 배열
- `meta`: 레코드에 첨부된 커스텀 데이터
- `name`: 라우트 레코드의 고유한 이름
- `path`: URL의 인코딩된 경로명 부분
- `redirectedFrom`: 현재 라우트 위치에 도달하기 전에 접근을 시도했던 라우트 위치

## Common Pitfalls %{common-pitfalls}%

### Route Synchronization Issues %{route-synchronization-issues}%

페이지 내비게이션 중 동기화 문제를 피하려면 `vue-router`의 것이 아닌 Nuxt의 `useRoute()` 컴포저블을 사용하는 것이 중요합니다.
`useRoute`를 `vue-router`에서 직접 임포트하면 Nuxt의 구현을 우회하게 됩니다.

```ts twoslash
// ❌ `vue-router`의 `useRoute`는 사용하지 마세요
// @errors: 2300
import { useRoute } from 'vue-router'
// ✅ Nuxt의 `useRoute` 컴포저블을 사용하세요
import { useRoute } from '#app'
```

### Calling `useRoute` in Middleware %{calling-useroute-in-middleware}%

미들웨어에서 `useRoute`를 사용하는 것은 예기치 않은 동작을 유발할 수 있으므로 권장되지 않습니다.
미들웨어에는 "현재 라우트"라는 개념이 없습니다.
`useRoute()` 컴포저블은 Vue 컴포넌트의 setup 함수나 Nuxt 플러그인 안에서만 사용해야 합니다.

::warning
이는 내부적으로 `useRoute()`를 사용하는 모든 컴포저블에도 동일하게 적용됩니다.
::

::read-more{to="/docs/4.x/directory-structure/app/middleware"}
미들웨어 섹션에서 라우트에 접근하는 방법에 대해 더 알아보세요.
::

### Hydration Issues with `route.fullPath` %{hydration-issues-with-routefullpath}%

브라우저는 요청을 보낼 때 [URL 프래그먼트](https://url.spec.whatwg.org/#concept-url-fragment)(예: `#foo`)를 전송하지 않습니다. 따라서 템플릿에 영향을 주기 위해 `route.fullPath`를 사용하면, 클라이언트에서는 프래그먼트를 포함하지만 서버에서는 포함하지 않기 때문에 하이드레이션 문제가 발생할 수 있습니다.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/type-aliases/routelocationnormalizedloaded"}
