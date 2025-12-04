---
title: 'useLazyFetch'
description: 이 useFetch 래퍼는 즉시 내비게이션을 트리거합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`useLazyFetch`는 [`useFetch`](/docs/4.x/api/composables/use-fetch)를 감싸는 래퍼로, `lazy` 옵션을 `true`로 설정하여 핸들러가 resolve되기 전에 내비게이션을 트리거합니다.

## Usage %{usage}%

기본적으로 [`useFetch`](/docs/4.x/api/composables/use-fetch)는 비동기 핸들러가 resolve될 때까지 내비게이션을 차단합니다. `useLazyFetch`는 내비게이션이 즉시 진행되도록 허용하며, 데이터는 백그라운드에서 가져옵니다.

```vue [app/pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyFetch('/api/posts')
</script>

<template>
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 무언가를 수행 -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch`는 [`useFetch`](/docs/4.x/api/composables/use-fetch)와 동일한 시그니처를 가집니다.
::

::warning
`useLazyFetch`를 `await`하는 것은 호출이 초기화되었음을 보장할 뿐입니다. 클라이언트 측 내비게이션에서는 데이터가 즉시 사용 가능하지 않을 수 있으며, 컴포넌트 템플릿에서 `pending` 상태를 처리해야 합니다.
::

::warning
`useLazyFetch`는 컴파일러에 의해 변환되는 예약된 함수 이름이므로, 직접 정의하는 함수 이름으로 `useLazyFetch`를 사용해서는 안 됩니다.
::

## Type %{type}%

```ts [Signature]
export function useLazyFetch<DataT, ErrorT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>
```

::note
`useLazyFetch`는 `lazy: true` 옵션이 설정된 `useFetch`와 동일합니다. 전체 타입 정의는 [`useFetch`](/docs/4.x/api/composables/use-fetch)를 참고하세요.
::

## Parameters %{parameters}%

`useLazyFetch`는 [`useFetch`](/docs/4.x/api/composables/use-fetch)와 동일한 매개변수를 받습니다:

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): 가져올 URL 또는 요청.
- `options` (object): [`useFetch` 옵션](/docs/4.x/api/composables/use-fetch#parameters)과 동일하며, `lazy`는 자동으로 `true`로 설정됩니다.

:read-more{to="/docs/4.x/api/composables/use-fetch#parameters"}

## Return Values %{return-values}%

[`useFetch`](/docs/4.x/api/composables/use-fetch)와 동일한 `AsyncData` 객체를 반환합니다:

| Name | Type | Description |
| --- | --- |--- |
| `data` | `Ref<DataT \| undefined>` | 비동기 fetch의 결과입니다. |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 데이터를 수동으로 새로고침하는 함수입니다. |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh`의 별칭입니다. |
| `error` | `Ref<ErrorT \| undefined>` | 데이터 가져오기에 실패했을 때의 에러 객체입니다. |
| `status` | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>` | 데이터 요청의 상태입니다. |
| `clear` | `() => void` | `data`를 `undefined`로, `error`를 `undefined`로 리셋하고, `status`를 `idle`로 설정하며, 보류 중인 요청을 모두 취소합니다. |

:read-more{to="/docs/4.x/api/composables/use-fetch#return-values"}

## Examples %{examples}%

### Handling Pending State %{handling-pending-state}%

```vue [app/pages/index.vue]
<script setup lang="ts">
/* 내비게이션은 fetch가 완료되기 전에 발생합니다.
 * 컴포넌트 템플릿 내에서 'pending' 및 'error' 상태를 직접 처리하세요.
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // posts가 처음에는 null일 수 있으므로
  // 즉시 그 내용에 접근할 수는 없지만, watch는 가능합니다.
})
</script>

<template>
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 무언가를 수행 -->
    </div>
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
