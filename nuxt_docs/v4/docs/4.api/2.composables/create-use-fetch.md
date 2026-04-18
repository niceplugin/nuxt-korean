---
title: 'createUseFetch'
description: 미리 정의된 기본 옵션으로 커스텀 useFetch 컴포저블을 만드는 팩토리 함수입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`createUseFetch`는 미리 정의된 옵션으로 커스텀 [`useFetch`](/docs/4.x/api/composables/use-fetch) 컴포저블을 만듭니다. 결과로 만들어진 컴포저블은 완전한 타입을 가지며 `useFetch`와 정확히 동일하게 동작하지만, 여러분의 기본값이 내장되어 있습니다.

::note
`createUseFetch`는 compiler macro입니다. `composables/` 디렉터리(또는 Nuxt compiler가 스캔하는 임의의 디렉터리) 안에서 **export된** 선언으로 사용해야 합니다. Nuxt는 빌드 타임에 중복 제거 키를 자동으로 주입합니다.
::

## 사용법 %{#usage}%

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch({
  baseURL: 'https://api.nuxt.com',
})
```

```vue [app/pages/modules.vue]
<script setup lang="ts">
const { data: modules } = await useAPI('/modules')
</script>
```

결과로 만들어진 `useAPI` 컴포저블은 [`useFetch`](/docs/4.x/api/composables/use-fetch)와 동일한 시그니처와 반환 타입을 가지며, 호출자는 모든 옵션을 사용하거나 재정의할 수 있습니다.

## 타입 %{#type}%

```ts [Signature]
function createUseFetch (
  options?: Partial<UseFetchOptions>,
): typeof useFetch

function createUseFetch (
  options: (callerOptions: UseFetchOptions) => Partial<UseFetchOptions>,
): typeof useFetch
```

## 옵션 %{#options}%

`createUseFetch`는 [`useFetch`](/docs/4.x/api/composables/use-fetch#parameters)와 동일한 모든 옵션(`baseURL`, `headers`, `query`, `onRequest`, `onResponse`, `server`, `lazy`, `transform`, `getCachedData` 등)을 받을 수 있습니다.

전체 옵션 목록은 [`useFetch` 문서](/docs/4.x/api/composables/use-fetch#parameters)를 참고하세요.

## 기본 모드 vs 재정의 모드 %{#default-vs-override-mode}%

### 기본 모드(plain object) %{#default-mode-plain-object}%

plain object를 전달하면 팩토리 옵션은 **기본값**으로 동작합니다. 호출자는 어떤 옵션이든 재정의할 수 있습니다:

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch({
  baseURL: 'https://api.nuxt.com',
  lazy: true,
})
```

```ts
// 기본 baseURL을 사용합니다
const { data } = await useAPI('/modules')

// 호출자가 baseURL을 재정의합니다
const { data } = await useAPI('/modules', { baseURL: 'https://other-api.com' })
```

### 재정의 모드(function) %{#override-mode-function}%

함수를 전달하면 팩토리 옵션이 호출자의 옵션을 **재정의**합니다. 이 함수는 호출자의 옵션을 인자로 받으므로, 이를 읽어 재정의 값을 계산할 수 있습니다:

```ts [app/composables/useAPI.ts]
// 호출자가 무엇을 넘기든 baseURL은 항상 강제됩니다
export const useAPI = createUseFetch(callerOptions => ({
  baseURL: 'https://api.nuxt.com',
}))
```

이 방식은 호출자가 변경해서는 안 되는 인증 헤더나 특정 base URL 같은 설정을 강제할 때 유용합니다.

## 커스텀 `$fetch`와 함께 사용하기 %{#combining-with-a-custom-fetch}%

커스텀 `$fetch` 인스턴스를 `createUseFetch`에 전달할 수 있습니다:

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch(callerOptions => ({
  $fetch: useNuxtApp().$api as typeof $fetch,
  ...callerOptions,
}))
```

::important
여기서는 **함수 시그니처**(재정의 모드)가 필요합니다. 그래야 [`useNuxtApp()`](/docs/4.x/api/composables/use-nuxt-app)이 Nuxt 인스턴스가 없는 모듈 스코프가 아니라 setup 컨텍스트(컴포저블 호출 지점)에서 호출되기 때문입니다.
::

:read-more{to="/docs/4.x/guide/recipes/custom-usefetch"}

:read-more{to="/docs/4.x/api/composables/use-fetch"}
