---
title: 'prefetchComponents'
description: Nuxt는 컴포넌트 프리패칭을 제어할 수 있는 유틸리티를 제공합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


컴포넌트를 프리패칭하면 백그라운드에서 코드를 다운로드합니다. 이는 해당 컴포넌트가 렌더링에 사용될 가능성이 높다는 가정에 기반하며, 사용자가 컴포넌트를 요청할 때 즉시 로드될 수 있도록 합니다. 사용자가 명시적으로 요청하지 않아도, 예상되는 향후 사용을 위해 컴포넌트가 다운로드되고 캐시됩니다.

Nuxt 앱에서 전역으로 등록된 개별 컴포넌트를 수동으로 프리패칭하려면 `prefetchComponents`를 사용하세요. 기본적으로 Nuxt는 이러한 컴포넌트를 비동기 컴포넌트로 등록합니다. 컴포넌트 이름은 PascalCase 버전을 사용해야 합니다.

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
현재 구현은 단순 프리패칭이 아니라 컴포넌트를 프리로딩한다는 점에서 [`preloadComponents`](/docs/4.x/api/utils/preload-components)와 정확히 동일하게 동작하며, 이 동작을 개선하기 위해 작업 중입니다.
::

::note
서버에서 `prefetchComponents`는 아무 효과도 없습니다.
::
