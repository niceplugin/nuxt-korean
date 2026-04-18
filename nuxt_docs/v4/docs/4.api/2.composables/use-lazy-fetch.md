---
title: 'useLazyFetch'
description: useFetch를 감싸는 이 래퍼는 즉시 탐색을 트리거합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`useLazyFetch`는 `lazy` 옵션을 `true`로 설정해 핸들러가 resolve되기 전에 탐색을 트리거하는 [`useFetch`](/docs/4.x/api/composables/use-fetch) 래퍼를 제공합니다.

## Usage %{#usage}%

기본적으로 [`useFetch`](/docs/4.x/api/composables/use-fetch)는 비동기 핸들러가 resolve될 때까지 탐색을 차단합니다. `useLazyFetch`는 데이터가 백그라운드에서 가져와지는 동안 탐색이 즉시 진행되도록 합니다.

```vue [app/pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyFetch('/api/posts')
</script>

<template>
  <div v-if="status === 'pending'">
    로딩 중 ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- do something -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch`는 [`useFetch`](/docs/4.x/api/composables/use-fetch)와 동일한 시그니처를 가집니다.
::

::warning
`useLazyFetch`를 await하는 것은 호출이 초기화되었음을 보장할 뿐입니다. 클라이언트 사이드 탐색에서는 데이터를 즉시 사용할 수 없을 수 있으므로, 컴포넌트 템플릿에서 `pending` 상태를 처리해야 합니다.
::

::warning
`useLazyFetch`는 컴파일러가 변환하는 예약 함수 이름이므로, 직접 만든 함수 이름을 `useLazyFetch`로 지정하면 안 됩니다.
::

## Type %{#type}%

```ts [Signature]
export function useLazyFetch<DataT, ErrorT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>
```

::note
`useLazyFetch`는 `lazy: true` 옵션이 설정된 `useFetch`와 같습니다. 전체 타입 정의는 [`useFetch`](/docs/4.x/api/composables/use-fetch)를 참고하세요.
::

## Parameters %{#parameters}%

`useLazyFetch`는 [`useFetch`](/docs/4.x/api/composables/use-fetch)와 동일한 매개변수를 받습니다:

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): 가져올 URL 또는 요청입니다.
- `options` (object): `lazy`가 자동으로 `true`로 설정된다는 점을 제외하면 [`useFetch` options](/docs/4.x/api/composables/use-fetch#parameters)와 같습니다.

:read-more{to="/docs/4.x/api/composables/use-fetch#parameters"}

## Return Values %{#return-values}%

[`useFetch`](/docs/4.x/api/composables/use-fetch)와 동일한 `AsyncData` 객체를 반환합니다:

| 이름      | 타입                                                | 설명                                                                                                             |
|-----------|-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | 비동기 fetch의 결과입니다.                                                                                       |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 데이터를 수동으로 새로 고치는 함수입니다.                                                                        |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh`의 별칭입니다.                                                                                          |
| `error`   | `Ref<ErrorT \| undefined>`                          | 데이터 가져오기에 실패했을 경우의 오류 객체입니다.                                                               |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | 데이터 요청의 상태입니다.                                                                                        |
| `pending` | `Ref<boolean>`                                      | 현재 요청이 진행 중인지 여부를 나타내는 boolean 플래그입니다.                                                    |
| `clear`   | `() => void`                                        | `data`를 `undefined`로, `error`를 `undefined`로 재설정하고 `status`를 `idle`로 설정하며 대기 중인 요청을 취소합니다. |

:read-more{to="/docs/4.x/api/composables/use-fetch#return-values"}

## Examples %{#examples}%

### Pending 상태 처리 %{#handling-pending-state}%

```vue [app/pages/index.vue]
<script setup lang="ts">
/* fetch가 완료되기 전에 탐색이 발생합니다.
 * 컴포넌트 템플릿 안에서 'pending' 및 'error' 상태를 직접 처리하세요
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // posts는 처음에 null일 수 있으므로 내용을 즉시
  // 사용할 수는 없지만, watch할 수는 있습니다.
})
</script>

<template>
  <div v-if="status === 'pending'">
    로딩 중 ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- do something -->
    </div>
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
