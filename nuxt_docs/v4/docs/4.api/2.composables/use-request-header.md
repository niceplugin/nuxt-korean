---
title: "useRequestHeader"
description: "useRequestHeader를 사용해 특정 들어오는 요청 헤더에 접근합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

내장 [`useRequestHeader`](/docs/4.x/api/composables/use-request-header) 컴포저블을 사용해 페이지, 컴포넌트, 플러그인 안에서 들어오는 어떤 요청 헤더든 접근할 수 있습니다.

```ts
// authorization 요청 헤더 가져오기
const authorization = useRequestHeader('authorization')
```

::tip
브라우저에서 `useRequestHeader`는 `undefined`를 반환합니다.
::

## 예시 %{#example}%

`useRequestHeader`를 사용하면 사용자가 인증되었는지 쉽게 판단할 수 있습니다.

아래 예시는 `authorization` 요청 헤더를 읽어 사용자가 제한된 리소스에 접근할 수 있는지 확인합니다.

```ts [app/middleware/authorized-only.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})
```
