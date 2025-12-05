---
title: 'useRequestFetch'
description: 'useRequestFetch 컴포저블을 사용해 서버 사이드 fetch 요청 시 요청 컨텍스트와 헤더를 전달합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

서버 사이드 fetch 요청을 보낼 때 `useRequestFetch`를 사용해 요청 컨텍스트와 헤더를 전달할 수 있습니다.

클라이언트 사이드 fetch 요청을 보낼 때는 브라우저가 필요한 헤더를 자동으로 전송합니다.
하지만 서버 사이드 렌더링 중에 요청을 보낼 때는, 보안상의 이유로 헤더를 수동으로 전달해야 합니다.

::note
**전달되도록 설계되지 않은** 헤더는 요청에 **포함되지 않습니다**. 예를 들어 다음과 같은 헤더가 있습니다:
`transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`
::

::tip
[`useFetch`](/docs/4.x/api/composables/use-fetch) 컴포저블은 내부적으로 `useRequestFetch`를 사용해 요청 컨텍스트와 헤더를 자동으로 전달합니다.
::

::code-group

```vue [app/pages/index.vue]
<script setup lang="ts">
// 이 코드는 사용자의 헤더를 `/api/cookies` 이벤트 핸들러로 전달합니다
// 결과: { cookies: { foo: 'bar' } }
const requestFetch = useRequestFetch()
const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))

// 이 코드는 아무것도 전달하지 않습니다
// 결과: { cookies: {} }
const { data: notForwarded } = await useAsyncData((_nuxtApp, { signal }) => $fetch('/api/cookies', { signal }))
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
클라이언트 사이드 내비게이션 중 브라우저에서는, `useRequestFetch`가 일반적인 [`$fetch`](/docs/4.x/api/utils/dollarfetch)와 동일하게 동작합니다.
::
