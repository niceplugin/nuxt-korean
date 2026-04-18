---
title: "useResponseHeader"
description: "useResponseHeader를 사용해 서버 응답 헤더를 설정합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
이 컴포저블은 Nuxt v3.14+에서 사용할 수 있습니다.
::

내장 [`useResponseHeader`](/docs/4.x/api/composables/use-response-header) 컴포저블을 사용해 페이지, 컴포넌트, 플러그인 안에서 어떤 서버 응답 헤더든 설정할 수 있습니다.

```ts
// 사용자 정의 응답 헤더 설정
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
```

## 예시 %{#example}%

`useResponseHeader`를 사용하면 페이지별로 응답 헤더를 쉽게 설정할 수 있습니다.

```vue [app/pages/test.vue]
<script setup>
// pages/test.vue
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
</script>

<template>
  <h1>사용자 정의 헤더가 있는 테스트 페이지</h1>
  <p>이 "/test" 페이지에 대한 서버 응답에는 사용자 정의 "X-My-Header" 헤더가 포함됩니다.</p>
</template>
```

예를 들어 Nuxt [middleware](/docs/4.x/directory-structure/app/middleware) 안에서 `useResponseHeader`를 사용해 모든 페이지에 대한 응답 헤더를 설정할 수도 있습니다.

```ts [app/middleware/my-header-middleware.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-My-Always-Header')
  header.value = `I'm Always here!`
})
```
