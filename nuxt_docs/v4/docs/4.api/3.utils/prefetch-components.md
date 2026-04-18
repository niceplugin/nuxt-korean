---
title: 'prefetchComponents'
description: Nuxt는 컴포넌트 prefetch를 제어할 수 있는 유틸리티를 제공합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


컴포넌트 prefetch는 해당 컴포넌트가 렌더링에 사용될 가능성이 높다고 가정하고 백그라운드에서 코드를 다운로드하므로, 사용자가 요청했을 때 즉시 로드할 수 있습니다. 사용자가 명시적으로 요청하지 않아도 나중에 사용할 것으로 예상되는 컴포넌트를 다운로드해 캐시합니다.

`prefetchComponents`를 사용해 Nuxt 앱에 전역 등록된 개별 컴포넌트를 수동으로 prefetch할 수 있습니다. 기본적으로 Nuxt는 이를 async 컴포넌트로 등록합니다. 컴포넌트 이름은 PascalCase 형태를 사용해야 합니다.

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
현재 구현은 단순 prefetch가 아니라 컴포넌트를 preload한다는 점에서 [`preloadComponents`](/docs/4.x/api/utils/preload-components)와 정확히 동일하게 동작하며, 이 동작은 개선 작업이 진행 중입니다.
::

::note
서버에서 `prefetchComponents`는 아무 효과가 없습니다.
::
