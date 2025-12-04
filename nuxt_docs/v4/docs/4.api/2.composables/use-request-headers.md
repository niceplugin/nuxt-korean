---
title: "useRequestHeaders"
description: "useRequestHeaders를 사용하여 들어오는 요청 헤더에 접근합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

페이지, 컴포넌트 및 플러그인 내에서 들어오는 요청 헤더에 접근하기 위해 내장된 [`useRequestHeaders`](/docs/4.x/api/composables/use-request-headers) 컴포저블을 사용할 수 있습니다.

```ts
// 모든 요청 헤더 가져오기
const headers = useRequestHeaders()

// cookie 요청 헤더만 가져오기
const { cookie } = useRequestHeaders(['cookie'])
```

::tip
브라우저에서는 `useRequestHeaders`가 빈 객체를 반환합니다.
::

## Example %{example}%

SSR 동안 초기 요청의 `authorization` 헤더에 접근하고 이를 이후의 내부 요청에 프록시하기 위해 `useRequestHeaders`를 사용할 수 있습니다.

아래 예시는 `authorization` 요청 헤더를 등방성(isomorphic) `$fetch` 호출에 추가합니다.

```vue [app/pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization']),
})
</script>
```
