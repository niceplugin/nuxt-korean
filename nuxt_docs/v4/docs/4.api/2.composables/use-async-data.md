---
title: 'useAsyncData'
description: useAsyncData는 SSR 친화적인 컴포저블에서 비동기적으로 resolve되는 데이터에 접근할 수 있게 해 줍니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

페이지, 컴포넌트, 플러그인 안에서 useAsyncData를 사용해 비동기적으로 resolve되는 데이터에 접근할 수 있습니다.

::note
[`useAsyncData`](/docs/4.x/api/composables/use-async-data)는 [Nuxt 컨텍스트](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context)에서 직접 호출하도록 설계된 컴포저블입니다. 반응형 컴포저블을 반환하고, 응답을 Nuxt payload에 추가하여 페이지가 하이드레이션될 때 **클라이언트 측에서 데이터를 다시 가져오지 않고도** 서버에서 클라이언트로 전달될 수 있도록 처리합니다.
::

## Usage %{usage}%

```vue [app/pages/index.vue]
<script setup lang="ts">
const { data, status, pending, error, refresh, clear } = await useAsyncData(
  'mountains',
  (_nuxtApp, { signal }) => $fetch('https://api.nuxtjs.dev/mountains', { signal }),
)
</script>
```

::warning
커스텀 useAsyncData 래퍼를 사용 중이라면, 해당 컴포저블 안에서 그것을 await 하지 마세요. 예기치 않은 동작을 유발할 수 있습니다. 커스텀 비동기 데이터 패처를 만드는 방법에 대한 자세한 내용은 [이 레시피](/docs/4.x/guide/recipes/custom-usefetch#custom-usefetchuseasyncdata)를 참고하세요.
::

::note
`data`, `status`, `pending`, `error`는 Vue ref이며 `<script setup>` 안에서 사용할 때는 `.value`로 접근해야 합니다. 반면 `refresh`/`execute`와 `clear`는 일반 함수입니다.
::

### Watch Params %{watch-params}%

내장된 `watch` 옵션을 사용하면 변경 사항이 감지될 때마다 fetcher 함수를 자동으로 다시 실행할 수 있습니다.

```vue [app/pages/index.vue]
<script setup lang="ts">
const page = ref(1)
const { data: posts } = await useAsyncData(
  'posts',
  (_nuxtApp, { signal }) => $fetch('https://fakeApi.com/posts', {
    params: {
      page: page.value,
    },
    signal,
  }), {
    watch: [page],
  },
)
</script>
```

### Reactive Keys %{reactive-keys}%

key로 computed ref, 일반 ref 또는 getter 함수를 사용할 수 있으며, key가 변경될 때 자동으로 업데이트되는 동적 데이터 패칭이 가능합니다:

```vue [app/pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

// 라우트가 변경되어 userId가 업데이트되면, 데이터가 자동으로 다시 fetch됩니다
const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id),
)
</script>
```

### Make your `handler` abortable %{make-your-handler-abortable}%

두 번째 인자로 제공되는 `signal`을 사용해 `handler` 함수를 abort 가능하게 만들 수 있습니다. 이는 사용자가 페이지에서 벗어나는 등 더 이상 필요하지 않은 요청을 취소할 때 유용합니다. `$fetch`는 abort signal을 기본적으로 지원합니다.

```ts
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => $fetch('/api/users', { signal }),
)

refresh() // 실제로 $fetch 요청을 취소합니다 (dedupe: cancel 인 경우)
refresh() // 실제로 $fetch 요청을 취소합니다 (dedupe: cancel 인 경우)
refresh()

clear() // 가장 최근의 보류 중인 handler를 취소합니다
```

또한 개별 요청을 수동으로 취소하기 위해 `AbortSignal`을 `refresh`/`execute` 함수에 전달할 수도 있습니다.

```ts
const { refresh } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => $fetch('/api/users', { signal }),
)
let abortController: AbortController | undefined

function handleUserAction () {
  abortController = new AbortController()
  refresh({ signal: abortController.signal })
}

function handleCancel () {
  abortController?.abort() // 진행 중인 refresh 요청을 중단합니다
}
```

`handler` 함수가 abort signal을 지원하지 않는 경우, 제공된 `signal`을 사용해 직접 abort 로직을 구현할 수 있습니다.

```ts
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => {
    return new Promise((resolve, reject) => {
      signal?.addEventListener('abort', () => {
        reject(new Error('Request aborted'))
      })
      return Promise.resolve(callback.call(this, yourHandler)).then(resolve, reject)
    })
  },
)
```

handler signal은 다음과 같은 경우에 abort됩니다:

- `dedupe: 'cancel'`로 새로운 요청이 만들어질 때
- `clear` 함수가 호출될 때
- `options.timeout` 기간을 초과했을 때

::warning
[`useAsyncData`](/docs/4.x/api/composables/use-async-data)는 컴파일러에 의해 변환되는 예약된 함수 이름이므로, 직접 만든 함수에 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)라는 이름을 사용해서는 안 됩니다.
::

:read-more{to="/docs/4.x/getting-started/data-fetching#useasyncdata"}

## Params %{params}%

- `key`: 요청 간 데이터 패칭이 올바르게 중복 제거될 수 있도록 보장하는 고유 key입니다. key를 제공하지 않으면, `useAsyncData` 인스턴스의 파일 이름과 줄 번호에 고유한 key가 자동으로 생성됩니다.
- `handler`: 반드시 truthy 값을 반환해야 하는 비동기 함수입니다(예: `undefined`나 `null`을 반환해서는 안 됩니다). 그렇지 않으면 클라이언트 측에서 요청이 중복될 수 있습니다.
::warning
예측 가능한 SSR 및 CSR 하이드레이션 동작을 보장하기 위해 `handler` 함수는 **부작용이 없어야 합니다**. 부작용을 트리거해야 하는 경우 [`callOnce`](/docs/4.x/api/utils/call-once) 유틸리티를 사용하세요.
::
- `options`:
  - `server`: 서버에서 데이터를 가져올지 여부 (기본값은 `true`)
  - `lazy`: 라우트를 로드한 후 비동기 함수를 resolve할지 여부로, 클라이언트 측 내비게이션을 차단하지 않습니다 (기본값은 `false`)
  - `immediate`: `false`로 설정하면 요청이 즉시 실행되는 것을 방지합니다. (기본값은 `true`)
  - `default`: 비동기 함수가 resolve되기 전에 `data`의 기본값을 설정하는 팩토리 함수입니다. `lazy: true` 또는 `immediate: false` 옵션과 함께 사용하면 유용합니다.
  - `transform`: resolve된 후 `handler` 함수 결과를 변경하는 데 사용할 수 있는 함수입니다.
  - `getCachedData`: 캐시된 데이터를 반환하는 함수를 제공합니다. `null` 또는 `undefined`를 반환하면 fetch가 트리거됩니다. 기본값은 다음과 같습니다:
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
      ? nuxtApp.payload.data[key]
      : nuxtApp.static.data[key]
    ```
    이는 `nuxt.config`의 `experimental.payloadExtraction`이 활성화된 경우에만 데이터를 캐시합니다.
  - `pick`: `handler` 함수 결과에서 이 배열에 지정된 key만 선택합니다.
  - `watch`: 반응형 소스를 감시하여 자동으로 새로고침합니다.
  - `deep`: 데이터를 deep ref 객체로 반환합니다. 기본값은 `false`이며, 얕은 ref 객체로 데이터를 반환합니다. 데이터가 깊은 반응성을 필요로 하지 않는 경우 성능 향상에 도움이 될 수 있습니다.
  - `dedupe`: 동일한 key에 대해 동시에 여러 번 fetch하는 것을 방지합니다 (기본값은 `cancel`). 가능한 옵션:
    - `cancel` - 새로운 요청이 만들어질 때 기존 요청을 취소합니다
    - `defer` - 보류 중인 요청이 있는 경우 새로운 요청을 전혀 만들지 않습니다
  - `timeout` - 요청이 타임아웃되기 전까지 대기할 시간(밀리초 단위)입니다 (기본값은 `undefined`로, 타임아웃이 없음을 의미합니다)

::note
내부적으로 `lazy: false`는 `<Suspense>`를 사용하여 데이터가 fetch되기 전까지 라우트 로딩을 차단합니다. 더 빠른 사용자 경험을 위해 `lazy: true`를 사용하고 로딩 상태를 구현하는 것을 고려해 보세요.
::

::read-more{to="/docs/4.x/api/composables/use-lazy-async-data"}
`useLazyAsyncData`를 사용하면 `useAsyncData`에서 `lazy: true`와 동일한 동작을 얻을 수 있습니다.
::

:video-accordion{title="getCachedData로 클라이언트 측 캐싱을 다루는 Alexander Lichter의 영상을 시청하세요" videoId="aQPR0xn-MMk"}

### Shared State and Option Consistency %{shared-state-and-option-consistency}%

여러 `useAsyncData` 호출에서 동일한 key를 사용할 경우, 동일한 `data`, `error`, `status`, `pending` ref를 공유합니다. 이는 컴포넌트 간 일관성을 보장하지만, 옵션의 일관성이 필요합니다.

다음 옵션은 동일한 key를 사용하는 모든 호출에서 **일관되어야 합니다**:
- `handler` 함수
- `deep` 옵션
- `transform` 함수
- `pick` 배열
- `getCachedData` 함수
- `default` 값

다음 옵션은 경고 없이 **서로 달라도 됩니다**:
- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

```ts
// ❌ 개발 환경에서 경고가 발생합니다
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: false })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: true })

// ✅ 허용되는 패턴입니다
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: true })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: false })
```

::tip
`useAsyncData`로 생성된 key 기반 상태는 Nuxt 애플리케이션 전역에서 [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data)를 사용해 가져올 수 있습니다.
::

## Return Values %{return-values}%

- `data`: 전달된 비동기 함수의 결과입니다.
- `refresh`/`execute`: `handler` 함수가 반환하는 데이터를 새로고침하는 데 사용할 수 있는 함수입니다.
- `error`: 데이터 패칭이 실패했을 때의 에러 객체입니다.
- `status`: 데이터 요청 상태를 나타내는 문자열입니다:
  - `idle`: 요청이 시작되지 않은 상태로, 예를 들어:
    - `{ immediate: false }`가 설정되어 있고 아직 `execute`가 호출되지 않은 경우
    - 서버에서 HTML을 렌더링할 때 `{ server: false }`가 설정된 경우
  - `pending`: 요청이 진행 중인 상태
  - `success`: 요청이 성공적으로 완료된 상태
  - `error`: 요청이 실패한 상태
- `pending`: 요청이 진행 중일 때 `true`가 되는 `Ref<boolean>`입니다 (즉, `status.value === 'pending'`인 동안).
- `clear`: `data`를 `undefined`(또는 제공된 경우 `options.default()`의 값)로 설정하고, `error`를 `undefined`로 설정하며, `status`를 `idle`로 설정하고, 현재 보류 중인 요청을 취소된 것으로 표시하는 데 사용할 수 있는 함수입니다.

기본적으로 Nuxt는 `refresh`가 완료될 때까지 다시 실행되지 않도록 대기합니다.

::note
서버에서 데이터를 가져오지 않은 경우(예: `server: false`인 경우), 데이터는 하이드레이션이 완료될 때까지 _가져오지 않습니다_. 즉, 클라이언트 측에서 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)를 await하더라도 `<script setup>` 안에서는 `data`가 계속 `undefined` 상태로 남습니다.
::

## Type %{type}%

```ts [Signature]
export type AsyncDataHandler<ResT> = (nuxtApp: NuxtApp, options: { signal: AbortSignal }) => Promise<ResT>

export function useAsyncData<DataT, DataE> (
  handler: AsyncDataHandler<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, DataE>
export function useAsyncData<DataT, DataE> (
  key: MaybeRefOrGetter<string>,
  handler: AsyncDataHandler<DataT>,
  options?: AsyncDataOptions<DataT>,
): Promise<AsyncData<DataT, DataE>>

type AsyncDataOptions<DataT> = {
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT | Ref<DataT> | null
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: MultiWatchSources | false
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  timeout?: number
}

type AsyncDataRequestContext = {
  /** 이 데이터 요청의 이유 */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | undefined>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | undefined>
  status: Ref<AsyncDataRequestStatus>
  pending: Ref<boolean>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  signal?: AbortSignal
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
