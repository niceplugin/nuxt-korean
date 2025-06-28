---
title: 'defineRouteRules'
description: '페이지 수준에서 하이브리드 렌더링을 위한 라우트 규칙을 정의합니다.'
links:
  - label: 소스
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
이 기능은 실험적이며 사용하려면 `nuxt.config`에서 `experimental.inlineRouteRules` 옵션을 활성화해야 합니다.
::

## [사용법](#usage)

```vue [pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true
})
</script>

<template>
  <h1>Hello world!</h1>
</template>
```

다음과 같이 변환됩니다:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }
  }
})
```

::note
[`nuxt build`](/docs/api/commands/build)를 실행할 때, 홈 페이지는 `.output/public/index.html`로 사전 렌더링되어 정적으로 제공됩니다.
::

## [참고 사항](#notes)

- `~/pages/foo/bar.vue`에 정의된 규칙은 `/foo/bar` 요청에 적용됩니다.
- `~/pages/foo/[id].vue`에 정의된 규칙은 `/foo/**` 요청에 적용됩니다.

페이지의 [`definePageMeta`](/docs/api/utils/define-page-meta)에서 사용자 지정 `path` 또는 `alias`를 사용하는 경우와 같이 더 많은 제어가 필요한 경우, `nuxt.config` 내에서 직접 `routeRules`를 설정해야 합니다.

::read-more{to="/docs/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
`routeRules`에 대해 더 알아보기.
::
