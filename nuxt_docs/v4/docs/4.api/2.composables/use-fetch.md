---
title: 'useFetch'
description: 'SSR 친화적인 컴포저블로 API 엔드포인트에서 데이터를 가져옵니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

이 컴포저블은 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)와 [`$fetch`](/docs/4.x/api/utils/dollarfetch)를 편리하게 감싼 래퍼를 제공합니다.
URL과 fetch 옵션을 기반으로 자동으로 키를 생성하고, 서버 라우트를 기준으로 요청 URL에 대한 타입 힌트를 제공하며, API 응답 타입을 추론합니다.

::note
`useFetch`는 setup 함수, 플러그인, 또는 route middleware 안에서 직접 호출하도록 설계된 컴포저블입니다. 반응형 컴포저블을 반환하며, 응답을 Nuxt payload에 추가하는 처리를 담당하여 페이지가 하이드레이션될 때 클라이언트 측에서 데이터를 다시 가져오지 않고도 서버에서 클라이언트로 전달할 수 있게 해줍니다.
::

## 사용법 %{#usage}%

```vue [app/pages/modules.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title'],
})
</script>
```

::tip{to="/docs/4.x/guide/recipes/custom-usefetch#custom-usefetch-with-createusefetch"}
미리 정의된 기본값(`baseURL`이나 인증 헤더 등)이 있는 커스텀 `useFetch`가 필요하신가요? `createUseFetch`를 사용해 완전히 타입이 지정된 커스텀 컴포저블을 만드세요.
::

::note
`data`, `status`, `error`는 Vue ref이므로 `<script setup>` 안에서 사용할 때는 `.value`로 접근해야 하며, `refresh`/`execute`와 `clear`는 일반 함수입니다.
::

`query` 옵션을 사용하면 쿼리에 검색 매개변수를 추가할 수 있습니다. 이 옵션은 [unjs/ofetch](https://github.com/unjs/ofetch)에서 확장된 것이며, URL 생성에는 [unjs/ufo](https://github.com/unjs/ufo)를 사용합니다. 객체는 자동으로 문자열화됩니다.

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' },
})
```

위 예제의 결과 URL은 `https://api.nuxt.com/modules?param1=value1&param2=value2`입니다.

[interceptors](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors)도 사용할 수 있습니다:

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest ({ request, options }) {
    // 요청 헤더를 설정합니다
    // 이는 ofetch >= 1.4.0에 의존하므로 lockfile을 새로고침해야 할 수 있습니다
    options.headers.set('Authorization', '...')
  },
  onRequestError ({ request, options, error }) {
    // 요청 오류를 처리합니다
  },
  onResponse ({ request, response, options }) {
    // 응답 데이터를 처리합니다
    localStorage.setItem('token', response._data.token)
  },
  onResponseError ({ request, response, options }) {
    // 응답 오류를 처리합니다
  },
})
```

### 반응형 키와 공유 상태 %{#reactive-keys-and-shared-state}%

computed ref나 일반 ref를 URL로 사용할 수 있으므로, URL이 변경되면 자동으로 업데이트되는 동적 데이터 패칭이 가능합니다:

```vue [app/pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

// route가 변경되어 id가 갱신되면 데이터가 자동으로 다시 패칭됩니다
const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

여러 컴포넌트에서 같은 URL과 옵션으로 `useFetch`를 사용하면 동일한 `data`, `error`, `status` ref를 공유합니다. 이는 컴포넌트 전반의 일관성을 보장합니다.

::tip
`useFetch`로 생성한 keyed state는 Nuxt 애플리케이션 전체에서 [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data)를 사용해 가져올 수 있습니다.
::

::warning
`useFetch`는 컴파일러가 변환하는 예약 함수 이름이므로, 여러분의 함수를 `useFetch`라고 이름 붙이면 안 됩니다. 미리 정의된 옵션을 가진 커스텀 변형을 만들려면 대신 [`createUseFetch`](/docs/4.x/guide/recipes/custom-usefetch#custom-usefetch-with-createusefetch)를 사용하세요.
::

::warning
`useFetch`에서 구조 분해한 `data` 변수가 JSON으로 파싱된 객체가 아니라 문자열을 반환한다면, 컴포넌트에 `import { useFetch } from '@vueuse/core` 같은 import 문이 포함되어 있지 않은지 확인하세요.
::

:video-accordion{title="Alexander Lichter의 useFetch 오용 방지 영상 보기" videoId="njsGVmcWviY"}

:read-more{to="/docs/4.x/getting-started/data-fetching"}

### 반응형 Fetch 옵션 %{#reactive-fetch-options}%

Fetch 옵션은 반응형으로 제공할 수 있으며, `computed`, `ref`, [computed getter](https://vuejs.org/guide/essentials/computed)를 지원합니다. 반응형 fetch 옵션이 업데이트되면, 해석된 최신 반응형 값을 사용해 자동으로 다시 패칭됩니다.

```ts
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
})
// 다시 패칭됩니다: /api/search?q=new%20search
searchQuery.value = 'new search'
```

필요하다면 `watch: false`를 사용해 이 동작을 끌 수 있습니다:

```ts
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
  watch: false,
})
// 다시 패칭되지 않습니다
searchQuery.value = 'new search'
```

## 타입 %{#type}%

```ts [Signature]
export function useFetch<DataT, ErrorT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: MaybeRefOrGetter<string>
  method?: MaybeRefOrGetter<string>
  query?: MaybeRefOrGetter<SearchParams>
  params?: MaybeRefOrGetter<SearchParams>
  body?: MaybeRefOrGetter<RequestInit['body'] | Record<string, any>>
  headers?: MaybeRefOrGetter<Record<string, string> | [key: string, value: string][] | Headers>
  baseURL?: MaybeRefOrGetter<string>
  cache?: false | 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'only-if-cached' | 'reload'
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  default?: () => DataT
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  $fetch?: typeof globalThis.$fetch
  watch?: MultiWatchSources | false
}

type AsyncDataRequestContext = {
  /** 이 데이터 요청의 이유 */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | undefined>
  pending: Ref<boolean>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | undefined>
  status: Ref<AsyncDataRequestStatus>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  signal?: AbortSignal
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

## 매개변수 %{#parameters}%

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): 가져올 URL 또는 요청입니다. 문자열, Request 객체, Vue ref, 또는 문자열/Request를 반환하는 함수가 될 수 있습니다. 동적 엔드포인트를 위한 반응성을 지원합니다.

- `options` (object): fetch 요청에 대한 설정입니다. [unjs/ofetch](https://github.com/unjs/ofetch) 옵션과 [`AsyncDataOptions`](/docs/4.x/api/composables/use-async-data#params)를 확장합니다. 모든 옵션은 정적 값, `ref`, 또는 computed 값이 될 수 있습니다.

| Option          | Type                                                                    | Default    | Description                                                                                                      |
|-----------------|-------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------|
| `key`           | `MaybeRefOrGetter<string>`                                              | auto-gen   | 중복 제거를 위한 고유 키입니다. 제공하지 않으면 URL과 옵션으로부터 생성됩니다.                                   |
| `method`        | `MaybeRefOrGetter<string>`                                              | `'GET'`    | HTTP 요청 메서드입니다.                                                                                          |
| `query`         | `MaybeRefOrGetter<SearchParams>`                                        | -          | URL에 추가할 쿼리/검색 매개변수입니다. 별칭: `params`.                                                            |
| `params`        | `MaybeRefOrGetter<SearchParams>`                                        | -          | `query`의 별칭입니다.                                                                                            |
| `body`          | `MaybeRefOrGetter<RequestInit['body'] \| Record<string, any>>`          | -          | 요청 본문입니다. 객체는 자동으로 문자열화됩니다.                                                                  |
| `headers`       | `MaybeRefOrGetter<Record<string, string> \| [key, value][] \| Headers>` | -          | 요청 헤더입니다.                                                                                                 |
| `baseURL`       | `MaybeRefOrGetter<string>`                                              | -          | 요청의 기본 URL입니다.                                                                                           |
| `cache`         | `false \| string`                                                       | -          | 캐시 제어입니다. boolean은 캐시를 비활성화하고, 또는 `default`, `no-store` 등 Fetch API 값을 사용할 수 있습니다. |
| `server`        | `boolean`                                                               | `true`     | 서버에서 가져올지 여부입니다.                                                                                     |
| `lazy`          | `boolean`                                                               | `false`    | true이면 라우트 로드 후 해석됩니다(내비게이션을 막지 않음).                                                       |
| `immediate`     | `boolean`                                                               | `true`     | false이면 요청이 즉시 실행되지 않도록 막습니다.                                                                   |
| `default`       | `() => DataT`                                                           | -          | 비동기 해석 전 `data`의 기본값을 위한 팩토리입니다.                                                               |
| `timeout`       | `number`                                                                | -          | 요청 타임아웃 전까지 기다릴 밀리초 단위 숫자입니다(기본값은 `undefined`, 즉 타임아웃 없음).                      |
| `transform`     | `(input: DataT) => DataT \| Promise<DataT>`                             | -          | 해석 후 결과를 변환하는 함수입니다.                                                                               |
| `getCachedData` | `(key, nuxtApp, ctx) => DataT \| undefined`                             | -          | 캐시된 데이터를 반환하는 함수입니다. 기본값은 아래를 참고하세요.                                                  |
| `pick`          | `string[]`                                                              | -          | 결과에서 지정한 키만 선택합니다.                                                                                 |
| `watch`         | `MultiWatchSources \| false`                                            | -          | 감시하고 자동 새로고침할 반응형 소스 배열입니다. `false`는 감시를 비활성화합니다.                                 |
| `deep`          | `boolean`                                                               | `false`    | 데이터를 깊은 ref 객체로 반환합니다.                                                                              |
| `dedupe`        | `'cancel' \| 'defer'`                                                   | `'cancel'` | 같은 키를 동시에 두 번 이상 가져오지 않도록 방지합니다.                                                           |
| `$fetch`        | `typeof globalThis.$fetch`                                              | -          | 커스텀 $fetch 구현입니다. [Nuxt에서 Custom useFetch](/docs/4.x/guide/recipes/custom-usefetch)를 참고하세요.      |

::note
모든 fetch 옵션은 `computed`나 `ref` 값으로 제공할 수 있습니다. 이 값들은 감시되며, 업데이트되면 새로운 값으로 자동으로 새 요청이 만들어집니다.
::

**getCachedData 기본값:**

```ts
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
  ? nuxtApp.payload.data[key]
  : nuxtApp.static.data[key]
```
이는 `nuxt.config`에서 `experimental.payloadExtraction`이 활성화된 경우에만 데이터를 캐시합니다.

## 반환값 %{#return-values}%

| Name      | Type                                                | Description                                                                                                                                                       |
|-----------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | 비동기 fetch의 결과입니다.                                                                                                                                        |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | 데이터를 수동으로 새로고침하는 함수입니다. 기본적으로 Nuxt는 `refresh`가 완료될 때까지 다시 실행되지 않도록 기다립니다.                                           |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | `refresh`의 별칭입니다.                                                                                                                                           |
| `error`   | `Ref<ErrorT \| undefined>`                          | 데이터 패칭이 실패했을 때의 오류 객체입니다.                                                                                                                      |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | 데이터 요청의 상태입니다. 가능한 값은 아래를 참고하세요.                                                                                                          |
| `pending` | `Ref<boolean>`                                      | 현재 요청이 진행 중인지 나타내는 boolean 플래그입니다.                                                                                                            |
| `clear`   | `() => void`                                        | `data`를 `undefined`(또는 제공된 경우 `options.default()`의 값)로, `error`를 `undefined`로, `status`를 `idle`로 재설정하고 대기 중인 모든 요청을 취소합니다.     |

### 상태 값 %{#status-values}%

- `idle`: 요청이 시작되지 않았습니다(예: `{ immediate: false }` 또는 서버 렌더 시 `{ server: false }`)
- `pending`: 요청이 진행 중입니다
- `success`: 요청이 성공적으로 완료되었습니다
- `error`: 요청이 실패했습니다

::note
서버에서 데이터를 가져오지 않았다면(예: `server: false`), 하이드레이션이 완료될 때까지 데이터가 _패칭되지 않습니다_. 즉, 클라이언트 측에서 `useFetch`를 await하더라도 `<script setup>` 안에서 `data`는 계속 null로 남습니다.
::

### 예제 %{#examples}%

:link-example{to="/docs/4.x/examples/advanced/use-custom-fetch-composable"}

:link-example{to="/docs/4.x/examples/features/data-fetching"}
