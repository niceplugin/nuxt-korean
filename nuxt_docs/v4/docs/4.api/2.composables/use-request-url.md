---
title: 'useRequestURL'
description: 'useRequestURL 컴포저블로 들어오는 요청 URL에 접근합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL`은 서버 사이드와 클라이언트 사이드 모두에서 동작하는 [URL object](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)를 반환하는 헬퍼 함수입니다.

::important
캐시 전략과 함께 [Hybrid Rendering](/docs/4.x/guide/concepts/rendering#hybrid-rendering)을 사용할 때는 [Nitro caching layer](https://nitro.build/guide/cache)를 통해 캐시된 응답을 처리하면서 들어오는 모든 요청 헤더가 제거됩니다(즉, `useRequestURL`의 `host`는 `localhost`를 반환합니다).

멀티 테넌트 환경의 `host`, `x-forwarded-host`처럼 응답을 캐시하고 제공할 때 고려할 헤더를 지정하려면 [`cache.varies` option](https://nitro.build/guide/cache#options)을 정의할 수 있습니다.
::

::code-group

```vue [app/pages/about.vue]
<script setup lang="ts">
const url = useRequestURL()
</script>

<template>
  <p>URL is: {{ url }}</p>
  <p>Path is: {{ url.pathname }}</p>
</template>
```

```html [Result in development]
<p>URL is: http://localhost:3000/about</p>
<p>Path is: /about</p>
```

::

::tip{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties" target="_blank"}
MDN 문서에서 URL 인스턴스 속성에 대해 알아보세요.
::
