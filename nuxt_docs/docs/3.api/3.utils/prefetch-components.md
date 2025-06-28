---
title: 'prefetchComponents'
description: Nuxt는 컴포넌트 프리페치(prefetch)를 제어할 수 있는 유틸리티를 제공합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


컴포넌트 프리페치는 코드가 백그라운드에서 다운로드되도록 하며, 이는 해당 컴포넌트가 렌더링에 사용될 가능성이 높다는 가정에 기반합니다. 사용자가 해당 컴포넌트를 요청할 경우 즉시 로드될 수 있도록 해줍니다. 사용자가 명시적으로 요청하지 않아도, 컴포넌트는 예상되는 미래의 사용을 위해 다운로드되고 캐시됩니다.

`prefetchComponents`를 사용하여 Nuxt 앱에 전역으로 등록된 개별 컴포넌트를 수동으로 프리페치할 수 있습니다. 기본적으로 Nuxt는 이러한 컴포넌트들을 비동기(async) 컴포넌트로 등록합니다. 컴포넌트 이름은 반드시 파스칼 케이스(PascalCase)로 사용해야 합니다.

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
현재 구현은 [`preloadComponents`](/docs/api/utils/preload-components)와 정확히 동일하게 동작하며, 단순 프리페치가 아닌 프리로드로 컴포넌트를 불러옵니다. 이 동작을 개선하기 위해 작업 중입니다.
::

::note
서버에서는 `prefetchComponents`가 아무런 효과가 없습니다.
::
