---
title: 'preloadRouteComponents'
description: preloadRouteComponents는 Nuxt 앱에서 개별 페이지를 수동으로 미리 불러올 수 있게 해줍니다.
links:
  - label: 소스
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

라우트 미리 불러오기는 사용자가 앞으로 이동할 수 있는 특정 라우트의 컴포넌트를 미리 불러옵니다. 이렇게 하면 컴포넌트가 더 빨리 준비되어 내비게이션이 지연되는 것을 방지할 수 있어 성능이 향상됩니다.

::tip{icon="i-lucide-rocket"}
`NuxtLink` 컴포넌트를 사용하는 경우 Nuxt는 이미 필요한 라우트를 자동으로 미리 불러옵니다.
::

:read-more{to="/docs/api/components/nuxt-link"}

## [예시](#example)

`navigateTo`를 사용할 때 라우트를 미리 불러옵니다.

```ts
// 렌더링을 차단하지 않기 위해 이 비동기 함수를 await하지 않습니다.
// 이 컴포넌트의 setup 함수에서
preloadRouteComponents('/dashboard')

const submit = async () => {
  const results = await $fetch('/api/authentication')

  if (results.token) {
    await navigateTo('/dashboard')
  }
}
```

:read-more{to="/docs/api/utils/navigate-to"}

::note
서버에서는 `preloadRouteComponents`가 아무런 효과가 없습니다.
::
