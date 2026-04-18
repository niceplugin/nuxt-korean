---
title: 'createUseAsyncData'
description: 미리 정의된 기본 옵션으로 커스텀 useAsyncData 컴포저블을 만드는 팩토리 함수입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`createUseAsyncData`는 미리 정의된 옵션으로 커스텀 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 컴포저블을 만듭니다. 결과로 만들어진 컴포저블은 완전한 타입을 가지며 `useAsyncData`와 정확히 동일하게 동작하지만, 여러분의 기본값이 내장되어 있습니다.

::note
`createUseAsyncData`는 compiler macro입니다. `composables/` 디렉터리(또는 Nuxt compiler가 스캔하는 임의의 디렉터리) 안에서 **export된** 선언으로 사용해야 합니다. Nuxt는 빌드 타임에 중복 제거 키를 자동으로 주입합니다.
::

## 사용법 %{#usage}%

```ts [app/composables/useCachedData.ts]
export const useCachedData = createUseAsyncData({
  getCachedData (key, nuxtApp) {
    return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
  },
})
```

```vue [app/pages/index.vue]
<script setup lang="ts">
const { data: mountains } = await useCachedData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains'),
)
</script>
```

결과로 만들어진 컴포저블은 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)와 동일한 시그니처와 반환 타입을 가지며, 호출자는 모든 옵션을 사용하거나 재정의할 수 있습니다.

## 타입 %{#type}%

```ts [Signature]
function createUseAsyncData (
  options?: Partial<AsyncDataOptions>,
): typeof useAsyncData

function createUseAsyncData (
  options: (callerOptions: AsyncDataOptions) => Partial<AsyncDataOptions>,
): typeof useAsyncData
```

## 옵션 %{#options}%

`createUseAsyncData`는 [`useAsyncData`](/docs/4.x/api/composables/use-async-data#params)와 동일한 모든 옵션(`server`, `lazy`, `immediate`, `default`, `transform`, `pick`, `getCachedData`, `deep`, `dedupe`, `timeout`, `watch` 포함)을 받을 수 있습니다.

전체 옵션 목록은 [`useAsyncData` 문서](/docs/4.x/api/composables/use-async-data#params)를 참고하세요.

## 기본 모드 vs 재정의 모드 %{#default-vs-override-mode}%

### 기본 모드(plain object) %{#default-mode-plain-object}%

plain object를 전달하면 팩토리 옵션은 **기본값**으로 동작합니다. 호출자는 어떤 옵션이든 재정의할 수 있습니다:

```ts [app/composables/useLazyData.ts]
export const useLazyData = createUseAsyncData({
  lazy: true,
  server: false,
})
```

```ts
// 기본값을 사용합니다 (lazy: true, server: false)
const { data } = await useLazyData('key', () => fetchSomeData())

// 호출자가 server를 true로 재정의합니다
const { data } = await useLazyData('key', () => fetchSomeData(), { server: true })
```

### 재정의 모드(function) %{#override-mode-function}%

함수를 전달하면 팩토리 옵션이 호출자의 옵션을 **재정의**합니다. 이 함수는 호출자의 옵션을 인자로 받습니다:

```ts [app/composables/useStrictData.ts]
// deep는 항상 false로 강제됩니다
export const useStrictData = createUseAsyncData(callerOptions => ({
  deep: false,
}))
```

:read-more{to="/docs/4.x/guide/recipes/custom-usefetch"}

:read-more{to="/docs/4.x/api/composables/use-async-data"}
