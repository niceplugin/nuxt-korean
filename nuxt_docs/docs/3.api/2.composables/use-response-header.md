---
title: "useResponseHeader"
description: "useResponseHeader를 사용하여 서버 응답 헤더를 설정하세요."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
이 컴포저블은 Nuxt v3.14+에서 사용할 수 있습니다.
::

내장된 [`useResponseHeader`](/docs/api/composables/use-response-header) 컴포저블을 사용하여 페이지, 컴포넌트, 플러그인 내에서 서버 응답 헤더를 설정할 수 있습니다.

```ts
// 커스텀 응답 헤더를 설정합니다
const header = useResponseHeader('X-My-Header');
header.value = 'my-value';
```

## [예시](#example)

`useResponseHeader`를 사용하여 페이지별로 쉽게 응답 헤더를 설정할 수 있습니다.

```vue [pages/test.vue]
<script setup>
// pages/test.vue
const header = useResponseHeader('X-My-Header');
header.value = 'my-value';
</script>

<template>
  <h1>커스텀 헤더가 있는 테스트 페이지</h1>
  <p>이 "/test" 페이지에 대한 서버의 응답에는 커스텀 "X-My-Header" 헤더가 포함됩니다.</p>
</template>
```

Nuxt의 [미들웨어](/docs/guide/directory-structure/middleware)에서 예를 들어 `useResponseHeader`를 사용하여 모든 페이지에 대한 응답 헤더를 설정할 수 있습니다.

```ts [middleware/my-header-middleware.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-My-Always-Header');
  header.value = `I'm Always here!`;
});

```
