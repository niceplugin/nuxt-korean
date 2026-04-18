---
title: 'useAsyncData'
description: useAsyncData는 SSR 친화적인 컴포저블에서 비동기로 해석되는 데이터에 접근할 수 있게 해줍니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

페이지, 컴포넌트, 플러그인 안에서 useAsyncData를 사용하면 비동기로 해석되는 데이터에 접근할 수 있습니다.

::note
[`useAsyncData`](/docs/4.x/api/composables/use-async-data)는 [Nuxt context](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context)에서 직접 호출하도록 설계된 컴포저블입니다. 반응형 컴포저블을 반환하며, 응답을 Nuxt payload에 추가하는 처리를 담당하여 페이지가 하이드레이션될 때 **클라이언트 측에서 데이터를 다시 가져오지 않고도** 서버에서 클라이언트로 전달할 수 있게 해줍니다.
::

## 사용법 %{#usage}%

```vue [app/pages/index.vue]
<script setup lang="ts">
const { data, status, pending, error, refresh, clear } = await useAsyncData(
  'mountains',
  (_nuxtApp, { signal }) => $fetch('https://api.nuxtjs.dev/mountains', { signal }),
)
</script>
```

::tip{to="/docs/4.x/guide/recipes/custom-usefetch#custom-usefetch-with-createusefetch"}
미리 정의된 기본값이 있는 커스텀 `useAsyncData`가 필요하신가요? `createUseAsyncData`를 사용해 완전히 타입이 지정된 커스텀 컴포저블을 만드세요. 자세한 내용은 [custom useFetch 레시피](/docs/4.x/guide/recipes/custom-usefetch)를 참고하세요.
::

::note
`data`, `status`, `pending`, `error`는 Vue ref이므로 `<script setup>` 안에서 사용할 때는 `.value`로 접근해야 하며, `refresh`/`execute`와 `clear`는 일반 함수입니다.
::

### watch 매개변수 %{#watch-params}%

내장 `watch` 옵션을 사용하면 변경이 감지될 때 fetcher 함수를 자동으로 다시 실행할 수 있습니다.

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

### 반응형 키 %{#reactive-keys}%

computed ref, 일반 ref, getter 함수를 키로 사용할 수 있으므로 키가 바뀌면 자동으로 업데이트되는 동적 데이터 패칭이 가능합니다:

```vue [app/pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

// route가 변경되어 userId가 갱신되면 데이터가 자동으로 다시 패칭됩니다
const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id),
)
</script>
```

### `handler`를 중단 가능하게 만들기 %{#make-your-handler-abortable}%

두 번째 인자로 제공되는 `signal`을 사용하면 `handler` 함수를 중단 가능하게 만들 수 있습니다. 사용자가 페이지를 떠나는 것처럼 더 이상 요청이 필요하지 않을 때 요청을 취소하는 데 유용합니다. `$fetch`는 기본적으로 abort signal을 지원합니다.

```ts
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => $fetch('/api/users', { signal }),
)

refresh() // 실제로 $fetch 요청을 취소합니다 (dedupe: cancel 인 경우)
refresh() // 실제로 $fetch 요청을 취소합니다 (dedupe: cancel 인 경우)
refresh()

clear() // 가장 최근의 대기 중 handler를 취소합니다
```

개별 요청을 수동으로 취소하려면 `refresh`/`execute` 함수에 `AbortSignal`을 전달할 수도 있습니다.

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

`handler` 함수가 abort signal을 지원하지 않는다면, 제공되는 `signal`을 사용해 직접 abort 로직을 구현할 수 있습니다.

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

handler signal은 다음 경우에 abort됩니다:

- `dedupe: 'cancel'`로 새 요청이 만들어질 때
- `clear` 함수가 호출될 때
- `options.timeout` 시간이 초과될 때

::warning
[`useAsyncData`](/docs/4.x/api/composables/use-async-data)는 컴파일러가 변환하는 예약 함수 이름이므로, 여러분의 함수를 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)라고 이름 붙이면 안 됩니다.
::

:read-more{to="/docs/4.x/getting-started/data-fetching#useasyncdata"}

## 매개변수 %{#params}%

- `key`: 요청 전반에서 데이터 패칭이 올바르게 중복 제거되도록 보장하는 고유 키입니다. 키를 제공하지 않으면 `useAsyncData`가 사용된 파일 이름과 줄 번호를 기반으로 고유 키가 자동 생성됩니다.
- `handler`: truthy 값을 반환해야 하는 비동기 함수입니다(예를 들어 `undefined`나 `null`이면 안 됩니다). 그렇지 않으면 클라이언트 측에서 요청이 중복될 수 있습니다.
::warning
예측 가능한 SSR 및 CSR 하이드레이션 동작을 위해 `handler` 함수는 **부수 효과가 없어야 합니다**. 부수 효과를 실행해야 한다면 [`callOnce`](/docs/4.x/api/utils/call-once) 유틸리티를 사용하세요.
::
- `options`:
  - `server`: 서버에서 데이터를 패칭할지 여부입니다(기본값은 `true`)
  - `lazy`: 클라이언트 측 내비게이션을 막는 대신, 라우트를 로드한 뒤 비동기 함수를 해석할지 여부입니다(기본값은 `false`)
  - `immediate`: `false`로 설정하면 요청이 즉시 실행되지 않도록 막습니다(기본값은 `true`)
  - `default`: 비동기 함수가 해석되기 전에 `data`의 기본값을 설정하는 팩토리 함수입니다. `lazy: true` 또는 `immediate: false`와 함께 유용합니다
  - `transform`: 해석된 뒤 `handler` 함수의 결과를 변경하는 데 사용할 수 있는 함수입니다
  - `getCachedData`: 캐시된 데이터를 반환하는 함수를 제공합니다. `undefined`를 반환하면 fetch가 트리거됩니다. 기본값은 다음과 같습니다:
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
      ? nuxtApp.payload.data[key]
      : nuxtApp.static.data[key]
    ```
    이는 `nuxt.config`에서 `experimental.payloadExtraction`이 활성화된 경우에만 데이터를 캐시합니다.
  - `pick`: `handler` 함수 결과에서 이 배열에 지정한 키만 선택합니다
  - `watch`: 반응형 소스를 감시해 자동 새로고침합니다
  - `deep`: 데이터를 깊은 ref 객체로 반환합니다. 기본값은 `false`이며 shallow ref 객체로 반환됩니다. 데이터가 깊은 반응성을 필요로 하지 않는다면 성능 향상에 도움이 될 수 있습니다.
  - `dedupe`: 같은 키를 동시에 두 번 이상 가져오지 않도록 방지합니다(기본값은 `cancel`). 가능한 옵션은 다음과 같습니다:
    - `cancel` - 새 요청이 만들어지면 기존 요청을 취소합니다
    - `defer` - 대기 중인 요청이 있다면 새 요청을 전혀 만들지 않습니다
  - `timeout` - 요청 타임아웃 전까지 기다릴 밀리초 단위 숫자입니다(기본값은 `undefined`이며, 이는 타임아웃이 없음을 의미합니다)

::note
내부적으로 `lazy: false`는 데이터를 가져오기 전까지 라우트 로딩을 막기 위해 `<Suspense>`를 사용합니다. 더 빠른 사용자 경험을 위해 `lazy: true`를 사용하고 별도의 로딩 상태를 구현하는 것을 고려하세요.
::

::read-more{to="/docs/4.x/api/composables/use-lazy-async-data"}
`useAsyncData`에서 `lazy: true`와 같은 동작을 얻으려면 `useLazyAsyncData`를 사용할 수 있습니다.
::

:video-accordion{title="Alexander Lichter의 getCachedData 클라이언트 측 캐싱 영상 보기" videoId="aQPR0xn-MMk"}

### 공유 상태와 옵션 일관성 %{#shared-state-and-option-consistency}%

동일한 키로 여러 `useAsyncData` 호출을 사용하면 같은 `data`, `error`, `status`, `pending` ref를 공유합니다. 이는 컴포넌트 전반의 일관성을 보장하지만, 옵션 일관성도 요구합니다.

같은 키를 사용하는 모든 호출에서 다음 옵션은 **반드시 일관되어야 합니다**:
- `handler` 함수
- `deep` 옵션
- `transform` 함수
- `pick` 배열
- `getCachedData` 함수
- `default` 값

다음 옵션은 경고를 발생시키지 않고 **서로 달라도 됩니다**:
- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

```ts
// ❌ 개발 경고가 발생합니다
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: false })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: true })

// ✅ 허용됩니다
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: true })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: false })
```

::tip
`useAsyncData`로 생성한 keyed state는 Nuxt 애플리케이션 전체에서 [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data)를 사용해 가져올 수 있습니다.
::

## 반환값 %{#return-values}%

- `data`: 전달된 비동기 함수의 결과입니다.
- `refresh`/`execute`: `handler` 함수가 반환한 데이터를 새로고침하는 데 사용할 수 있는 함수입니다.
- `error`: 데이터 패칭이 실패했을 때의 오류 객체입니다.
- `status`: 데이터 요청의 상태를 나타내는 문자열입니다:
  - `idle`: 요청이 시작되지 않았을 때입니다. 예:
    - `execute`가 아직 호출되지 않았고 `{ immediate: false }`가 설정된 경우
    - 서버에서 HTML을 렌더링할 때 `{ server: false }`가 설정된 경우
  - `pending`: 요청이 진행 중입니다
  - `success`: 요청이 성공적으로 완료되었습니다
  - `error`: 요청이 실패했습니다
- `pending`: 요청이 진행 중일 때(`status.value === 'pending'`인 동안) `true`인 `Ref<boolean>`입니다.
- `clear`: `data`를 `undefined`(또는 제공된 경우 `options.default()`의 값)로 설정하고, `error`를 `undefined`로 설정하고, `status`를 `idle`로 설정하며, 현재 대기 중인 모든 요청을 취소된 것으로 표시하는 함수입니다.

기본적으로 Nuxt는 `refresh`가 완료될 때까지 다시 실행되지 않도록 기다립니다.

::note
서버에서 데이터를 가져오지 않았다면(예: `server: false`), 하이드레이션이 완료될 때까지 데이터가 _패칭되지 않습니다_. 즉, 클라이언트 측에서 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)를 await하더라도 `<script setup>` 안에서 `data`는 계속 `undefined`로 남습니다.
::

## 타입 %{#type}%

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
