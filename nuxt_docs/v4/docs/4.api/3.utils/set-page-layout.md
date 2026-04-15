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
`setPageLayout`을 사용하면 페이지의 레이아웃을 동적으로 변경할 수 있습니다. 이 함수는 Nuxt 컨텍스트에 대한 접근에 의존하므로 [Nuxt context](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 내부에서만 호출할 수 있습니다.
::

```ts [app/middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // 이동하려는 _대상_ 라우트에 레이아웃을 설정합니다
  setPageLayout('other')
})
```

## Passing Props to Layouts %{#passing-props-to-layouts}%

두 번째 인자로 객체를 제공하면 레이아웃에 props를 전달할 수 있습니다:

```ts [app/middleware/admin-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  setPageLayout('admin', {
    sidebar: true,
    title: '대시보드',
  })
})
```

이후 레이아웃은 다음 props를 받을 수 있습니다:

```vue [app/layouts/admin.vue]
<script setup lang="ts">
const props = defineProps<{
  sidebar?: boolean
  title?: string
}>()
</script>

<template>
  <div>
    <aside v-if="sidebar">
      사이드바
    </aside>
    <main>
      <h1>{{ title }}</h1>
      <slot />
    </main>
  </div>
</template>
```

::note
서버 사이드에서 레이아웃을 동적으로 설정하기로 했다면 hydration 불일치를 피하기 위해 Vue가 레이아웃을 렌더링하기 _전에_ (즉, 플러그인 또는 라우트 미들웨어 안에서) 반드시 설정해야 합니다.
::
