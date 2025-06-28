---
title: 'setPageLayout'
description: setPageLayout은 페이지의 레이아웃을 동적으로 변경할 수 있게 해줍니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout`은 페이지의 레이아웃을 동적으로 변경할 수 있게 해줍니다. 이 함수는 Nuxt 컨텍스트에 접근해야 하므로 반드시 [Nuxt 컨텍스트](/docs/guide/going-further/nuxt-app#the-nuxt-context) 내에서만 호출할 수 있습니다.
::

```ts [middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // 이동하려는 라우트에서 레이아웃을 설정합니다.
  setPageLayout('other')
})
```

::note
서버 측에서 레이아웃을 동적으로 설정하려는 경우, Vue가 레이아웃을 렌더링하기 전에(즉, 플러그인이나 라우트 미들웨어 내에서) 반드시 설정해야 하며, 그렇지 않으면 hydration 불일치가 발생할 수 있습니다.
::
