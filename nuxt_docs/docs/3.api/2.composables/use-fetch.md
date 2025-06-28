---
title: 'useFetch'
description: 'SSR에 친화적인 컴포저블로 API 엔드포인트에서 데이터를 가져옵니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

이 컴포저블은 [`useAsyncData`](/docs/api/composables/use-async-data)와 [`$fetch`](/docs/api/utils/dollarfetch)를 편리하게 감싸는 래퍼를 제공합니다.
URL과 fetch 옵션을 기반으로 자동으로 키를 생성하고, 서버 라우트를 기반으로 요청 URL에 대한 타입 힌트를 제공하며, API 응답 타입을 추론합니다.

::note
`useFetch`는 setup 함수, 플러그인 또는 라우트 미들웨어에서 직접 호출하도록 설계된 컴포저블입니다. 반응형 컴포저블을 반환하며, Nuxt 페이로드에 응답을 추가하여 페이지가 하이드레이트될 때 클라이언트에서 데이터를 다시 가져오지 않고 서버에서 클라이언트로 전달할 수 있도록 처리합니다.
::

## [사용법](#usage)

```vue [pages/modules.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title']
})
</script>
```

::warning
커스텀 useFetch 래퍼를 사용하는 경우, 컴포저블 내에서 await를 사용하지 마세요. 이는 예기치 않은 동작을 유발할 수 있습니다. 커스텀 비동기 데이터 패처를 만드는 방법에 대해서는 [이 레시피](/docs/guide/recipes/custom-usefetch#custom-usefetch)를 참고하세요.
::

::note
`data`, `status`, `error`는 Vue ref이며, `<script setup>` 내에서 사용할 때는 `.value`로 접근해야 합니다. 반면, `refresh`/`execute`와 `clear`는 일반 함수입니다.
::

`query` 옵션을 사용하면 쿼리 검색 파라미터를 쿼리에 추가할 수 있습니다. 이 옵션은 [unjs/ofetch](https://github.com/unjs/ofetch)에서 확장되었으며, [unjs/ufo](https://github.com/unjs/ufo)를 사용하여 URL을 생성합니다. 객체는 자동으로 문자열로 변환됩니다.

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' }
})
```

위 예제는 `https://api.nuxt.com/modules?param1=value1&param2=value2`와 같은 결과를 만듭니다.

또한 [인터셉터](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors)를 사용할 수도 있습니다:

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest({ request, options }) {
    // 요청 헤더를 설정합니다
    // 이 기능은 ofetch >= 1.4.0에 의존하므로 lockfile을 새로고침해야 할 수 있습니다
    options.headers.set('Authorization', '...')
  },
  onRequestError({ request, options, error }) {
    // 요청 오류를 처리합니다
  },
  onResponse({ request, response, options }) {
    // 응답 데이터를 처리합니다
    localStorage.setItem('token', response._data.token)
  },
  onResponseError({ request, response, options }) {
    // 응답 오류를 처리합니다
  }
})
```

### [반응형 키와 공유 상태](#reactive-keys-and-shared-state)

URL로 computed ref 또는 일반 ref를 사용할 수 있어, URL이 변경될 때마다 자동으로 데이터를 다시 가져오는 동적 데이터 패칭이 가능합니다:

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

// 라우트가 변경되어 id가 업데이트되면 데이터가 자동으로 다시 패칭됩니다
const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

여러 컴포넌트에서 동일한 URL과 옵션으로 `useFetch`를 사용할 때, 이들은 동일한 `data`, `error`, `status` ref를 공유합니다. 이를 통해 컴포넌트 간의 일관성을 보장합니다.

::warning
`useFetch`는 컴파일러에 의해 변환되는 예약된 함수명이므로, 직접 만든 함수에 `useFetch`라는 이름을 사용하지 마세요.
::

::warning
`useFetch`에서 구조 분해된 `data` 변수가 문자열을 반환하고 JSON 파싱된 객체가 아니라면, 컴포넌트에 `import { useFetch } from '@vueuse/core'`와 같은 import 문이 포함되어 있지 않은지 확인하세요.
::

:video-accordion{title="Alexander Lichter의 영상을 보고 useFetch를 잘못 사용하는 것을 피하세요" videoId="njsGVmcWviY"}

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:read-more{to="/docs/getting-started/data-fetching"}

:link-example{to="/docs/examples/features/data-fetching"}

## [파라미터](#params)

- `URL`: 가져올 URL입니다.
- `Options` ([unjs/ofetch](https://github.com/unjs/ofetch) 옵션 및 [AsyncDataOptions](/docs/api/composables/use-async-data#params) 확장):
  - `method`: 요청 메서드.
  - `query`: [ufo](https://github.com/unjs/ufo)를 사용하여 URL에 쿼리 검색 파라미터를 추가합니다.
  - `params`: `query`의 별칭
  - `body`: 요청 본문 - 객체가 전달되면 자동으로 문자열로 변환됩니다.
  - `headers`: 요청 헤더.
  - `baseURL`: 요청의 기본 URL.
  - `timeout`: 요청을 자동으로 중단할 밀리초
  - `cache`: [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch#cache)에 따라 캐시 제어를 처리합니다.
    - 캐시를 비활성화하려면 boolean 값을 전달하거나, 다음 값 중 하나를 전달할 수 있습니다: `default`, `no-store`, `reload`, `no-cache`, `force-cache`, `only-if-cached`.

::note
모든 fetch 옵션은 `computed` 또는 `ref` 값을 받을 수 있습니다. 이 값들이 업데이트되면 자동으로 새로운 요청이 이루어집니다.
::

- `Options` ([`useAsyncData`](/docs/api/composables/use-async-data)에서 가져옴):
  - `key`: 데이터 패칭이 요청 간에 제대로 중복 제거될 수 있도록 하는 고유 키. 제공하지 않으면 URL과 fetch 옵션을 기반으로 자동 생성됩니다.
  - `server`: 서버에서 데이터를 가져올지 여부(기본값은 `true`)
  - `lazy`: 클라이언트 사이드 네비게이션을 차단하는 대신, 라우트 로딩 후 비동기 함수를 해결할지 여부(기본값은 `false`)
  - `immediate`: `false`로 설정하면 요청이 즉시 실행되지 않습니다. (기본값은 `true`)
  - `default`: 비동기 함수가 해결되기 전에 `data`의 기본값을 설정하는 팩토리 함수 - `lazy: true` 또는 `immediate: false` 옵션과 함께 유용합니다.
  - `transform`: 해결 후 `handler` 함수 결과를 변경하는 데 사용할 수 있는 함수
  - `getCachedData`: 캐시된 데이터를 반환하는 함수를 제공합니다. `null` 또는 `undefined`를 반환하면 fetch가 트리거됩니다. 기본값은 다음과 같습니다:
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
      ? nuxtApp.payload.data[key] 
      : nuxtApp.static.data[key]
    ```
    이는 `nuxt.config`의 `experimental.payloadExtraction`이 활성화된 경우에만 데이터를 캐싱합니다.
  - `pick`: `handler` 함수 결과에서 이 배열에 지정된 키만 선택
  - `watch`: 반응형 소스 배열을 감시하고 변경 시 fetch 결과를 자동으로 새로고침합니다. fetch 옵션과 URL은 기본적으로 감시됩니다. `watch: false`를 사용하면 반응형 소스를 완전히 무시할 수 있습니다. `immediate: false`와 함께 사용하면 완전히 수동적인 `useFetch`가 가능합니다. ([여기서 예시를 볼 수 있습니다](/docs/getting-started/data-fetching#watch))
  - `deep`: 데이터를 깊은 ref 객체로 반환합니다(기본값은 `true`). 깊은 반응성이 필요하지 않은 경우 성능 향상을 위해 `false`로 설정할 수 있습니다.
  - `dedupe`: 동일한 키로 동시에 여러 번 패칭하는 것을 방지합니다(기본값은 `cancel`). 가능한 옵션:
    - `cancel` - 새 요청이 만들어질 때 기존 요청을 취소합니다
    - `defer` - 대기 중인 요청이 있으면 새 요청을 만들지 않습니다

::note
`url` 파라미터에 함수나 ref를 제공하거나, `options` 파라미터에 함수를 인자로 제공하면, 해당 `useFetch` 호출은 코드베이스의 다른 `useFetch` 호출과 일치하지 않습니다. 옵션이 동일해 보여도 마찬가지입니다. 강제로 일치시키고 싶다면 `options`에 직접 키를 제공하세요.
::

::note
개발 환경에서 (외부) HTTPS URL을 자체 서명된 인증서로 호출하려면, 환경 변수에 `NODE_TLS_REJECT_UNAUTHORIZED=0`을 설정해야 합니다.
::

:video-accordion{title="Alexander Lichter의 getCachedData를 활용한 클라이언트 사이드 캐싱 영상 보기" videoId="aQPR0xn-MMk"}

## [반환값](#return-values)

- `data`: 전달된 비동기 함수의 결과입니다.
- `refresh`/`execute`: `handler` 함수가 반환하는 데이터를 새로고침하는 데 사용할 수 있는 함수입니다.
- `error`: 데이터 패칭에 실패한 경우의 에러 객체입니다.
- `status`: 데이터 요청의 상태를 나타내는 문자열:
  - `idle`: 요청이 시작되지 않은 상태, 예를 들어:
    - `execute`가 아직 호출되지 않았고 `{ immediate: false }`가 설정된 경우
    - 서버에서 HTML을 렌더링할 때 `{ server: false }`가 설정된 경우
  - `pending`: 요청이 진행 중인 상태
  - `success`: 요청이 성공적으로 완료된 상태
  - `error`: 요청이 실패한 상태
- `clear`: `data`를 `undefined`로, `error`를 `null`로, `status`를 `'idle'`로 설정하고, 현재 대기 중인 요청을 취소된 것으로 표시하는 함수입니다.

기본적으로 Nuxt는 `refresh`가 완료될 때까지 다시 실행할 수 없습니다.

::note
서버에서 데이터를 가져오지 않은 경우(예: `server: false`로 설정), 데이터는 하이드레이션이 완료될 때까지 _가져오지 않습니다_. 즉, 클라이언트 사이드에서 `useFetch`를 await 하더라도 `<script setup>` 내에서는 `data`가 null로 남아있게 됩니다.
::

## [타입](#type)

```ts [Signature]
function useFetch<DataT, ErrorT>(
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: string
  method?: string
  query?: SearchParams
  params?: SearchParams
  body?: RequestInit['body'] | Record<string, any>
  headers?: Record<string, string> | [key: string, value: string][] | Headers
  baseURL?: string
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: WatchSource[] | false
}

type AsyncDataRequestContext = {
  /** 이 데이터 요청의 원인 */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```
