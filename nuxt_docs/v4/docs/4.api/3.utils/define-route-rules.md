---
title: 'defineRouteRules'
description: '페이지 수준에서 하이브리드 렌더링을 위한 route rules를 정의합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/4.x/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
이 기능은 실험적이며, 사용하려면 `nuxt.config`에서 `experimental.inlineRouteRules` 옵션을 활성화해야 합니다.
::

## Usage %{#usage}%

```vue [app/pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true,
})
</script>

<template>
  <h1>안녕하세요!</h1>
</template>
```

다음과 같이 변환됩니다:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
  },
})
```

::note
[`nuxt build`](/docs/4.x/api/commands/build)를 실행하면 홈 페이지는 `.output/public/index.html`로 프리렌더링되어 정적으로 제공됩니다.
::

## Notes %{#notes}%

- `~/pages/foo/bar.vue`에 정의된 규칙은 `/foo/bar` 요청에 적용됩니다.
- `~/pages/foo/[id].vue`의 규칙은 `/foo/**` 요청에 적용됩니다.

페이지의 [`definePageMeta`](/docs/4.x/api/utils/define-page-meta)에 설정한 커스텀 `path` 또는 `alias`를 사용하는 경우처럼 더 세밀한 제어가 필요하다면 `routeRules`를 `nuxt.config` 안에 직접 설정해야 합니다.

::read-more{to="/docs/4.x/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
`routeRules`에 대해 더 알아보세요.
::
