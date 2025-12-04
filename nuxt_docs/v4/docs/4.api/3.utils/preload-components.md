---
title: 'preloadComponents'
description: Nuxt는 컴포넌트 프리로딩을 제어할 수 있는 유틸리티를 제공합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

컴포넌트 프리로딩은 페이지에서 곧 필요하게 될 컴포넌트를 렌더링 라이프사이클 초기에 미리 로드하는 것입니다. 이를 통해 컴포넌트가 더 일찍 사용 가능해지고, 페이지 렌더링을 막을 가능성이 줄어들어 성능이 향상됩니다.

`preloadComponents`를 사용하여 Nuxt 앱에서 전역으로 등록된 개별 컴포넌트를 수동으로 프리로드할 수 있습니다. 기본적으로 Nuxt는 이들을 비동기 컴포넌트로 등록합니다. 컴포넌트 이름은 PascalCase 버전을 사용해야 합니다.

```ts
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
서버에서는 `preloadComponents`가 아무 효과도 가지지 않습니다.
::
