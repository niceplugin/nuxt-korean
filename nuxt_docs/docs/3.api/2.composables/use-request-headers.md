---
title: "useRequestHeaders"
description: "useRequestHeaders를 사용하여 들어오는 요청 헤더에 접근하세요."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

내장 [`useRequestHeaders`](/docs/api/composables/use-request-headers) 컴포저블을 사용하여 페이지, 컴포넌트, 플러그인 내에서 들어오는 요청 헤더에 접근할 수 있습니다.

```js
// 모든 요청 헤더 가져오기
const headers = useRequestHeaders()

// cookie 요청 헤더만 가져오기
const headers = useRequestHeaders(['cookie'])
```

::tip
브라우저에서는 `useRequestHeaders`가 빈 객체를 반환합니다.
::

## [예시](#example)

`useRequestHeaders`를 사용하여 SSR 중에 초기 요청의 `authorization` 헤더를 이후의 내부 요청에 프록시할 수 있습니다.

아래 예시는 `authorization` 요청 헤더를 이소모픽 `$fetch` 호출에 추가합니다.

```vue [pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization'])
})
</script>
```
