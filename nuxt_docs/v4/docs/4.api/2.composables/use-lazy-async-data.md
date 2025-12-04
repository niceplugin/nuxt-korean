---
title: useLazyAsyncData
description: 이 useAsyncData 래퍼는 내비게이션을 즉시 트리거합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`useLazyAsyncData`는 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)를 감싸는 래퍼로, `lazy` 옵션을 `true`로 설정하여 핸들러가 resolve되기 전에 내비게이션을 트리거합니다.

::note
기본적으로 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)는 비동기 핸들러가 resolve될 때까지 내비게이션을 차단합니다. `useLazyAsyncData`는 데이터 가져오기가 백그라운드에서 계속되는 동안 내비게이션이 즉시 발생하도록 허용합니다.
::

## Usage %{usage}%

```vue [app/pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyAsyncData('posts', () => $fetch('/api/posts'))
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      Loading...
    </div>
    <div v-else-if="status === 'error'">
      Error loading posts
    </div>
    <div v-else>
      {{ posts }}
    </div>
  </div>
</template>
```

`useLazyAsyncData`를 사용할 때는, 가져오기가 완료되기 전에 내비게이션이 발생합니다. 이는 컴포넌트 템플릿 안에서 `pending` 및 `error` 상태를 직접 처리해야 함을 의미합니다.

::warning
`useLazyAsyncData`는 컴파일러에 의해 변환되는 예약된 함수 이름이므로, 직접 만든 함수의 이름을 `useLazyAsyncData`로 지정해서는 안 됩니다.
::

## Type %{type}%

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

`useLazyAsyncData`는 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)와 동일한 시그니처를 가집니다.

## Parameters %{parameters}%

`useLazyAsyncData`는 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)와 동일한 매개변수를 받으며, `lazy` 옵션은 자동으로 `true`로 설정됩니다.

:read-more{to="/docs/4.x/api/composables/use-async-data#parameters"}

## Return Values %{return-values}%

`useLazyAsyncData`는 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)와 동일한 값을 반환합니다.

:read-more{to="/docs/4.x/api/composables/use-async-data#return-values"}

## Example %{example}%

```vue [app/pages/index.vue]
<script setup lang="ts">
/* 가져오기가 완료되기 전에 내비게이션이 발생합니다.
  컴포넌트 템플릿 안에서 'pending' 및 'error' 상태를 직접 처리하세요.
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // count는 처음에 null일 수 있으므로, 즉시 그 내용에 접근할 수는 없지만
  // watch를 통해 변화를 감지할 수 있습니다.
})
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Loading' : count }}
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
