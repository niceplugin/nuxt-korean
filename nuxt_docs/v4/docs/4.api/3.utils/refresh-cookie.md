---
title: "refreshCookie"
description: "쿠키가 변경되었을 때 useCookie 값을 수동으로 새로 고칩니다"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

::important
이 유틸리티는 [Nuxt v3.10](/blog/v3-10)부터 사용할 수 있습니다.
::

## 목적 %{#purpose}%

`refreshCookie` 함수는 `useCookie`가 반환한 쿠키 값을 새로 고치도록 설계되었습니다.

이 함수는 브라우저에 새 쿠키 값이 설정되었다는 것을 알고 있을 때 `useCookie` ref를 업데이트하는 데 유용합니다.

## 사용법 %{#usage}%

```vue [app/app.vue]
<script setup lang="ts">
const tokenCookie = useCookie('token')

const login = async (username, password) => {
  const token = await $fetch('/api/token', { /** ... */ }) // 응답에서 `token` 쿠키를 설정함
  refreshCookie('token')
}

const loggedIn = computed(() => !!tokenCookie.value)
</script>
```

::note{to="/docs/4.x/guide/going-further/experimental-features#cookiestore"}
[Nuxt v3.12.0](https://github.com/nuxt/nuxt/releases/tag/v3.12.0)부터는 실험적 `cookieStore` 옵션이 기본적으로 활성화됩니다. 브라우저에서 쿠키가 바뀌면 `useCookie` 값을 자동으로 새로 고칩니다.
::

## 타입 %{#type}%

```ts [Signature]
export function refreshCookie (name: string): void
```
