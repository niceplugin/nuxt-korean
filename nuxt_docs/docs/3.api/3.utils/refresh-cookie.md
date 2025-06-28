---
title: "refreshCookie"
description: "쿠키가 변경되었을 때 useCookie 값을 수동으로 새로고침합니다"
navigation:
  badge: New
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

::important
이 유틸리티는 [Nuxt v3.10](https://nuxt.com/blog/v3-10)부터 사용할 수 있습니다.
::

## [목적](#purpose)

`refreshCookie` 함수는 `useCookie`로 반환된 쿠키 값을 새로고침하기 위해 설계되었습니다.

브라우저에서 새로운 쿠키 값이 설정된 것을 알 때 `useCookie` ref를 업데이트하는 데 유용합니다.

## [사용법](#usage)

```vue [app.vue]
<script setup lang="ts">
const tokenCookie = useCookie('token')

const login = async (username, password) => {
  const token = await $fetch('/api/token', { ... }) // 응답에서 `token` 쿠키를 설정합니다
  refreshCookie('token')
}

const loggedIn = computed(() => !!tokenCookie.value)
</script>
```

::note{to="/docs/guide/going-further/experimental-features#cookiestore"}
브라우저에서 쿠키가 변경될 때 `useCookie` 값을 자동으로 새로고침하려면 실험적 `cookieStore` 옵션을 활성화할 수 있습니다.
::

## [타입](#type)

```ts
refreshCookie(name: string): void
```
