---
title: "useRequestHeader"
description: "useRequestHeader를 사용하여 들어오는 특정 요청 헤더에 접근하세요."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

내장된 [`useRequestHeader`](/docs/api/composables/use-request-header) 컴포저블을 사용하여 페이지, 컴포넌트, 플러그인 내에서 들어오는 모든 요청 헤더에 접근할 수 있습니다.

```ts
// authorization 요청 헤더 가져오기
const authorization = useRequestHeader('authorization')
```

::tip
브라우저에서는 `useRequestHeader`가 `undefined`를 반환합니다.
::

## [예시](#example)

`useRequestHeader`를 사용하여 사용자가 인증되었는지 쉽게 확인할 수 있습니다.

아래 예시는 `authorization` 요청 헤더를 읽어 사용자가 제한된 리소스에 접근할 수 있는지 확인합니다.

```ts [middleware/authorized-only.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})
```
