---
title: 'preloadComponents'
description: Nuxt는 컴포넌트 프리로딩을 제어할 수 있는 유틸리티를 제공합니다.
links:
  - label: 소스
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

컴포넌트 프리로딩은 페이지에서 곧 필요하게 될 컴포넌트들을 미리 로드하여, 렌더링 라이프사이클 초기에 로딩을 시작할 수 있게 해줍니다. 이를 통해 컴포넌트가 더 빨리 사용 가능해지고, 페이지 렌더링을 지연시키는 일이 줄어들어 성능이 향상됩니다.

`preloadComponents`를 사용하여 Nuxt 앱에 전역으로 등록된 개별 컴포넌트를 수동으로 프리로딩할 수 있습니다. 기본적으로 Nuxt는 이러한 컴포넌트들을 비동기 컴포넌트로 등록합니다. 컴포넌트 이름은 반드시 파스칼 케이스(PascalCase)로 사용해야 합니다.

```js
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
서버에서는 `preloadComponents`가 아무런 효과가 없습니다.
::
