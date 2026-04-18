---
title: "useRequestHeaders"
description: "useRequestHeaders를 사용해 들어오는 요청 헤더에 접근합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

내장 [`useRequestHeaders`](/docs/4.x/api/composables/use-request-headers) 컴포저블을 사용해 페이지, 컴포넌트, 플러그인 안에서 들어오는 요청 헤더에 접근할 수 있습니다.

```ts
// 모든 요청 헤더 가져오기
const headers = useRequestHeaders()

// cookie 요청 헤더만 가져오기
const { cookie } = useRequestHeaders(['cookie'])
```

::tip
브라우저에서 `useRequestHeaders`는 빈 객체를 반환합니다.
::

## 예시 %{#example}%

`useRequestHeaders`를 사용하면 SSR 중 초기 요청의 `authorization` 헤더에 접근해 이후의 내부 요청으로 전달할 수 있습니다.

아래 예시는 `authorization` 요청 헤더를 이소모픽 `$fetch` 호출에 추가합니다.

```vue [app/pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization']),
})
</script>
```
