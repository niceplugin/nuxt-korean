---
title: 'setPageLayout'
description: setPageLayout을 사용하면 페이지의 레이아웃을 동적으로 변경할 수 있습니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout`을 사용하면 페이지의 레이아웃을 동적으로 변경할 수 있습니다. 이는 Nuxt 컨텍스트에 대한 접근에 의존하므로 [Nuxt 컨텍스트](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 내에서만 호출할 수 있습니다.
::

```ts [app/middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // 이동하려는 라우트에 레이아웃을 설정합니다
  setPageLayout('other')
})
```

::note
서버 측에서 레이아웃을 동적으로 설정하기로 선택한 경우, Vue에 의해 레이아웃이 렌더링되기 전에(즉, 플러그인 또는 라우트 미들웨어 내에서) 반드시 설정해야 하며, 그렇지 않으면 하이드레이션 불일치가 발생할 수 있습니다.
::
