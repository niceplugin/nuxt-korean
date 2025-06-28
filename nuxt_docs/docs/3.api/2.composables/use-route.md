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
Vue 컴포넌트의 템플릿 내에서는 `$route`를 사용하여 라우트에 접근할 수 있습니다.
::

## [예시](#example)

다음 예시에서는 동적 페이지 파라미터인 `slug`를 URL의 일부로 사용하여 [`useFetch`](/docs/api/composables/use-fetch)를 통해 API를 호출합니다.

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

라우트 쿼리 파라미터(예를 들어 `/test?example=true` 경로의 `example`)에 접근해야 하는 경우, `useRoute().params` 대신 `useRoute().query`를 사용할 수 있습니다.

## [API](#api)

동적 파라미터와 쿼리 파라미터 외에도, `useRoute()`는 현재 라우트와 관련된 다음과 같은 계산된 참조값들을 제공합니다:

- `fullPath`: 경로, 쿼리, 해시를 포함하는 현재 라우트와 연관된 인코딩된 URL
- `hash`: #으로 시작하는 URL의 디코딩된 해시 부분
- `query`: 라우트 쿼리 파라미터에 접근
- `matched`: 현재 라우트 위치와 일치하는 정규화된 라우트 배열
- `meta`: 레코드에 첨부된 커스텀 데이터
- `name`: 라우트 레코드의 고유 이름
- `path`: URL의 인코딩된 경로명 부분
- `redirectedFrom`: 현재 라우트 위치에 도달하기 전에 접근을 시도했던 라우트 위치

::note
브라우저는 요청을 보낼 때 [URL 프래그먼트](https://url.spec.whatwg.org/#concept-url-fragment)(예: `#foo`)를 전송하지 않습니다. 따라서 템플릿에서 `route.fullPath`를 사용하면, 클라이언트에서는 프래그먼트가 포함되지만 서버에서는 포함되지 않아 하이드레이션 문제가 발생할 수 있습니다.
::

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/#RouteLocationNormalizedLoaded"}
