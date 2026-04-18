---
title: 'preloadRouteComponents'
description: preloadRouteComponents를 사용하면 Nuxt 앱의 개별 페이지를 수동으로 preload할 수 있습니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

라우트 preload는 사용자가 앞으로 이동할 수 있는 특정 라우트의 컴포넌트를 미리 로드합니다. 이렇게 하면 컴포넌트를 더 일찍 사용할 수 있어 내비게이션을 막을 가능성이 줄어들고 성능이 향상됩니다.

::tip{icon="i-lucide-rocket"}
`NuxtLink` 컴포넌트를 사용 중이라면 Nuxt가 이미 필요한 라우트를 자동으로 preload합니다.
::

:read-more{to="/docs/4.x/api/components/nuxt-link"}

## 예시 %{#example}%

`navigateTo`를 사용할 때 라우트를 preload합니다.

```ts
// 렌더링을 막지 않기 위해 이 async 함수를 await하지 않습니다
// 이 컴포넌트의 setup 함수에서
preloadRouteComponents('/dashboard')

const submit = async () => {
  const results = await $fetch('/api/authentication')

  if (results.token) {
    await navigateTo('/dashboard')
  }
}
```

:read-more{to="/docs/4.x/api/utils/navigate-to"}

::note
서버에서 `preloadRouteComponents`는 아무 효과가 없습니다.
::
