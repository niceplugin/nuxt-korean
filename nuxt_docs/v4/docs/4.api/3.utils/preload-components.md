---
title: 'preloadComponents'
description: Nuxt는 컴포넌트 preload를 제어할 수 있는 유틸리티를 제공합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

컴포넌트 preload는 페이지가 곧 필요로 할 컴포넌트를 렌더링 라이프사이클 초기에 미리 로드하도록 합니다. 이렇게 하면 컴포넌트를 더 일찍 사용할 수 있어 페이지 렌더링을 막을 가능성이 줄어들고 성능이 향상됩니다.

`preloadComponents`를 사용해 Nuxt 앱에 전역 등록된 개별 컴포넌트를 수동으로 preload할 수 있습니다. 기본적으로 Nuxt는 이를 async 컴포넌트로 등록합니다. 컴포넌트 이름은 PascalCase 형태를 사용해야 합니다.

```ts
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
서버에서 `preloadComponents`는 아무 효과가 없습니다.
::
