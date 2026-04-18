---
title: useLazyAsyncData
description: useAsyncData를 감싼 이 래퍼는 내비게이션을 즉시 트리거합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`useLazyAsyncData`는 `lazy` 옵션을 `true`로 설정해 handler가 resolve되기 전에 내비게이션이 시작되도록 하는 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 래퍼를 제공합니다.

::note
기본적으로 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)는 async handler가 resolve될 때까지 내비게이션을 막습니다. `useLazyAsyncData`를 사용하면 데이터 패칭이 백그라운드에서 계속되는 동안 내비게이션이 즉시 진행됩니다.
::

## 사용법 %{#usage}%

```vue [app/pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyAsyncData('posts', () => $fetch('/api/posts'))
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      불러오는 중...
    </div>
    <div v-else-if="status === 'error'">
      게시물을 불러오는 중 오류가 발생했습니다
    </div>
    <div v-else>
      {{ posts }}
    </div>
  </div>
</template>
```

`useLazyAsyncData`를 사용할 때는 패칭이 끝나기 전에 내비게이션이 진행됩니다. 즉, 컴포넌트 템플릿 안에서 `pending`과 `error` 상태를 직접 처리해야 합니다.

::warning
`useLazyAsyncData`는 컴파일러가 변환하는 예약 함수 이름이므로 직접 만든 함수를 `useLazyAsyncData`라고 이름 붙이면 안 됩니다.
::

## 타입 %{#type}%

```ts [Signature]
export function useLazyAsyncData<DataT, ErrorT> (
  handler: (ctx?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, ErrorT>

export function useLazyAsyncData<DataT, ErrorT> (
  key: string,
  handler: (ctx?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, ErrorT>
```

`useLazyAsyncData` has the same signature as [`useAsyncData`](/docs/4.x/api/composables/use-async-data).

## 매개변수 %{#parameters}%

`useLazyAsyncData`는 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)와 같은 매개변수를 받으며, `lazy` 옵션만 자동으로 `true`로 설정됩니다.

:read-more{to="/docs/4.x/api/composables/use-async-data#parameters"}

## 반환값 %{#return-values}%

`useLazyAsyncData`는 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)와 동일한 값을 반환합니다.

:read-more{to="/docs/4.x/api/composables/use-async-data#return-values"}

## 예제 %{#example}%

```vue [app/pages/index.vue]
<script setup lang="ts">
/* 패칭이 완료되기 전에 내비게이션이 진행됩니다.
  컴포넌트 템플릿 안에서 'pending'와 'error' 상태를 직접 처리하세요
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // count는 처음에 null일 수 있으므로 내용을 즉시
  // 사용할 수는 없지만 watch할 수는 있습니다.
})
</script>

<template>
  <div>
    {{ status === 'pending' ? '불러오는 중' : count }}
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
