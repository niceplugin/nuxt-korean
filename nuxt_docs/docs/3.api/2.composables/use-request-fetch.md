---
title: 'useRequestFetch'
description: 'useRequestFetch 컴포저블로 서버 측 fetch 요청 시 요청 컨텍스트와 헤더를 전달합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

`useRequestFetch`를 사용하여 서버 측 fetch 요청을 할 때 요청 컨텍스트와 헤더를 전달할 수 있습니다.

클라이언트 측에서 fetch 요청을 할 때는 브라우저가 필요한 헤더를 자동으로 전송합니다.
하지만 서버 측 렌더링 중에 요청을 할 때는 보안상의 이유로 헤더를 수동으로 전달해야 합니다.

::note
**전달해서는 안 되는 헤더**는 요청에 **포함되지 않습니다**. 예를 들어 다음과 같은 헤더가 있습니다:
`transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`
::

::tip
[`useFetch`](/docs/api/composables/use-fetch) 컴포저블은 내부적으로 `useRequestFetch`를 사용하여 요청 컨텍스트와 헤더를 자동으로 전달합니다.
::

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
// 사용자의 헤더를 `/api/cookies` 이벤트 핸들러로 전달합니다
// 결과: { cookies: { foo: 'bar' } }
const requestFetch = useRequestFetch()
const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))

// 아무것도 전달하지 않습니다
// 결과: { cookies: {} }
const { data: notForwarded } = await useAsyncData(() => $fetch('/api/cookies')) 
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const cookies = parseCookies(event)

  return { cookies }
})
```

::

::tip
브라우저에서 클라이언트 측 네비게이션 중에는, `useRequestFetch`가 일반 [`$fetch`](/docs/api/utils/dollarfetch)와 동일하게 동작합니다.
::
