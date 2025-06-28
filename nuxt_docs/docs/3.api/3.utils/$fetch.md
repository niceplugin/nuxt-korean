---
title: "$fetch"
description: Nuxt는 HTTP 요청을 위해 ofetch를 사용하여 전역적으로 $fetch 헬퍼를 노출합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---

Nuxt는 [ofetch](https://github.com/unjs/ofetch)를 사용하여 Vue 앱이나 API 라우트 내에서 HTTP 요청을 할 수 있도록 `$fetch` 헬퍼를 전역적으로 노출합니다.

::tip{icon="i-lucide-rocket"}
서버 사이드 렌더링 중에 `$fetch`를 호출하여 내부 [API 라우트](/docs/guide/directory-structure/server)를 가져오면 관련 함수를 직접 호출하게 되어(요청을 에뮬레이션) **추가적인 API 호출을 절약할 수 있습니다**.
::

::note{color="blue" icon="i-lucide-info"}
컴포넌트에서 `$fetch`를 [`useAsyncData`](/docs/api/composables/use-async-data)로 감싸지 않고 사용하면 데이터를 두 번 가져오게 됩니다: 처음에는 서버에서, 그리고 하이드레이션 중에 클라이언트에서 다시 한 번 가져오게 됩니다. 이는 `$fetch`가 서버에서 클라이언트로 상태를 전달하지 않기 때문입니다. 따라서 클라이언트가 데이터를 다시 받아야 하므로 양쪽 모두에서 fetch가 실행됩니다.
::

## [사용법](#usage)

컴포넌트 데이터를 가져올 때 이중 데이터 페칭을 방지하기 위해 [`useFetch`](/docs/api/composables/use-fetch) 또는 [`useAsyncData`](/docs/api/composables/use-async-data) + `$fetch` 사용을 권장합니다.

```vue [app.vue]
<script setup lang="ts">
// SSR 중에는 데이터가 서버에서 한 번, 클라이언트에서 한 번 두 번 가져와집니다.
const dataTwice = await $fetch('/api/item')

// SSR 중에는 데이터가 서버에서만 가져와지고 클라이언트로 전달됩니다.
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// useFetch를 useAsyncData + $fetch의 단축키로 사용할 수도 있습니다.
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/getting-started/data-fetching"}

클라이언트 사이드에서만 실행되는 메서드 내에서는 `$fetch`를 자유롭게 사용할 수 있습니다.

```vue [pages/contact.vue]
<script setup lang="ts">
async function contactForm() {
  await $fetch('/api/contact', {
    method: 'POST',
    body: { hello: 'world '}
  })
}
</script>

<template>
  <button @click="contactForm">Contact</button>
</template>
```

::tip
`$fetch`는 Nuxt 2용으로 만들어진 [@nuxt/http](https://github.com/nuxt/http) 및 [@nuxtjs/axios](https://github.com/nuxt-community/axios-module) 대신 Nuxt에서 HTTP 호출을 하는 권장 방법입니다.
::

::note
개발 환경에서 자체 서명된 인증서가 있는 (외부) HTTPS URL을 `$fetch`로 호출하는 경우, 환경 변수에 `NODE_TLS_REJECT_UNAUTHORIZED=0`을 설정해야 합니다.
::

### [헤더와 쿠키 전달하기](#passing-headers-and-cookies)

브라우저에서 `$fetch`를 호출할 때는 `cookie`와 같은 사용자 헤더가 API로 직접 전송됩니다.

하지만 서버 사이드 렌더링 중에는 **서버 사이드 요청 위조(SSRF)** 또는 **인증 오용**과 같은 보안 위험 때문에 `$fetch`가 사용자의 브라우저 쿠키를 포함하지 않으며, fetch 응답의 쿠키도 전달하지 않습니다.

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
// SSR 중에는 헤더나 쿠키가 전달되지 않습니다
const { data } = await useAsyncData(() => $fetch('/api/cookies'))
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const foo = getCookie(event, 'foo')
  // ... 쿠키로 무언가를 처리합니다
})
```
::

서버에서 헤더와 쿠키를 전달해야 하는 경우, 수동으로 전달해야 합니다:

```vue [pages/index.vue]
<script setup lang="ts">
// 이 코드는 사용자의 헤더와 쿠키를 `/api/cookies`로 전달합니다
const requestFetch = useRequestFetch()
const { data } = await useAsyncData(() => requestFetch('/api/cookies'))
</script>
```

하지만 서버에서 상대 URL로 `useFetch`를 호출할 때, Nuxt는 [`useRequestFetch`](/docs/api/composables/use-request-fetch)를 사용하여 헤더와 쿠키를 프록시합니다(단, `host`와 같이 전달해서는 안 되는 헤더는 제외).
