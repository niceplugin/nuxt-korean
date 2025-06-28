---
title: 'useAsyncData'
description: useAsyncData는 SSR에 친화적인 컴포저블에서 비동기적으로 해결되는 데이터에 접근할 수 있도록 제공합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

페이지, 컴포넌트, 플러그인 내에서 useAsyncData를 사용하여 비동기적으로 해결되는 데이터에 접근할 수 있습니다.

::note
[`useAsyncData`](/docs/api/composables/use-async-data)는 [Nuxt 컨텍스트](/docs/guide/going-further/nuxt-app#the-nuxt-context)에서 직접 호출하도록 설계된 컴포저블입니다. 이 함수는 반응형 컴포저블을 반환하며, Nuxt 페이로드에 응답을 추가하여 페이지가 하이드레이션될 때 **클라이언트 측에서 데이터를 다시 가져오지 않고** 서버에서 클라이언트로 전달할 수 있도록 처리합니다.
::

## [사용법](#usage)

```vue [pages/index.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
</script>
```

::warning
커스텀 useAsyncData 래퍼를 사용하는 경우, 컴포저블 내에서 await를 사용하지 마세요. 이는 예기치 않은 동작을 유발할 수 있습니다. 커스텀 비동기 데이터 패처를 만드는 방법에 대해서는 [이 레시피](/docs/guide/recipes/custom-usefetch#custom-usefetch)를 참고하세요.
::

::note
`data`, `status`, `error`는 Vue ref이며, `<script setup>` 내에서 사용할 때는 `.value`로 접근해야 합니다. 반면, `refresh`/`execute`와 `clear`는 일반 함수입니다.
::

### [Watch Params](#watch-params)

내장된 `watch` 옵션을 사용하면 변경 사항이 감지될 때마다 fetcher 함수가 자동으로 다시 실행됩니다.

```vue [pages/index.vue]
<script setup lang="ts">
const page = ref(1)
const { data: posts } = await useAsyncData(
  'posts',
  () => $fetch('https://fakeApi.com/posts', {
    params: {
      page: page.value
    }
  }), {
    watch: [page]
  }
)
</script>
```

### [Reactive Keys](#reactive-keys)

key로 computed ref, 일반 ref 또는 getter 함수를 사용할 수 있어, key가 변경될 때마다 자동으로 업데이트되는 동적 데이터 패칭이 가능합니다:

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

// 라우트가 변경되어 userId가 업데이트되면 데이터가 자동으로 다시 패칭됩니다
const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id)
)
</script>
```

::warning
[`useAsyncData`](/docs/api/composables/use-async-data)는 컴파일러에 의해 변환되는 예약된 함수명이므로, 직접 [`useAsyncData`](/docs/api/composables/use-async-data)라는 이름의 함수를 만들지 마세요.
::

:read-more{to="/docs/getting-started/data-fetching#useasyncdata"}

## [파라미터](#params)

- `key`: 데이터 패칭이 요청 간에 올바르게 중복 제거될 수 있도록 보장하는 고유 키입니다. key를 제공하지 않으면, `useAsyncData` 인스턴스의 파일명과 라인 번호에 고유한 키가 자동으로 생성됩니다.
- `handler`: 반드시 참 값을 반환해야 하는 비동기 함수입니다(예: `undefined`나 `null`을 반환하면 안 됨). 그렇지 않으면 클라이언트 측에서 요청이 중복될 수 있습니다.
::warning
`handler` 함수는 **부작용이 없어야** 하며, SSR 및 CSR 하이드레이션 중 예측 가능한 동작을 보장합니다. 부작용을 트리거해야 하는 경우, [`callOnce`](/docs/api/utils/call-once) 유틸리티를 사용하세요.
::
- `options`:
  - `server`: 서버에서 데이터를 패칭할지 여부(기본값: `true`)
  - `lazy`: 라우트 로딩 후 비동기 함수를 실행할지 여부(기본값: `false`). 클라이언트 측 네비게이션을 차단하지 않습니다.
  - `immediate`: `false`로 설정하면 요청이 즉시 실행되지 않습니다(기본값: `true`)
  - `default`: 비동기 함수가 해결되기 전 `data`의 기본값을 설정하는 팩토리 함수 - `lazy: true` 또는 `immediate: false` 옵션과 함께 유용합니다
  - `transform`: `handler` 함수의 결과를 해결한 후 변형할 수 있는 함수
  - `getCachedData`: 캐시된 데이터를 반환하는 함수를 제공합니다. `null` 또는 `undefined`를 반환하면 fetch가 트리거됩니다. 기본값은 다음과 같습니다:
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
      ? nuxtApp.payload.data[key] 
      : nuxtApp.static.data[key]
    ```
    이는 `nuxt.config`의 `experimental.payloadExtraction`이 활성화된 경우에만 데이터를 캐싱합니다.
  - `pick`: `handler` 함수 결과에서 이 배열에 지정된 키만 선택
  - `watch`: 반응형 소스를 감시하여 자동 새로고침
  - `deep`: 데이터를 깊은 ref 객체로 반환합니다(기본값은 `true`). 깊은 반응형이 필요하지 않은 경우 `false`로 설정하여 얕은 ref 객체로 반환하면 성능이 향상될 수 있습니다.
  - `dedupe`: 동일한 키로 한 번에 여러 번 패칭하는 것을 방지(기본값: `cancel`). 가능한 옵션:
    - `cancel` - 새 요청이 들어오면 기존 요청을 취소
    - `defer` - 대기 중인 요청이 있으면 새 요청을 만들지 않음

::note
내부적으로, `lazy: false`는 `<Suspense>`를 사용하여 데이터가 패칭되기 전 라우트 로딩을 차단합니다. 더 빠른 사용자 경험을 위해 `lazy: true`를 사용하고 로딩 상태를 구현하는 것을 고려하세요.
::

::read-more{to="/docs/api/composables/use-lazy-async-data"}
`useLazyAsyncData`를 사용하면 `useAsyncData`에서 `lazy: true`와 동일한 동작을 할 수 있습니다.
::

:video-accordion{title="Alexander Lichter의 getCachedData를 활용한 클라이언트 사이드 캐싱 영상 보기" videoId="aQPR0xn-MMk"}

### [공유 상태 및 옵션 일관성](#shared-state-and-option-consistency)

동일한 키로 여러 번 `useAsyncData`를 호출하면 동일한 `data`, `error`, `status` ref를 공유합니다. 이는 컴포넌트 간 일관성을 보장하지만, 옵션의 일관성이 필요합니다.

다음 옵션들은 동일한 키로 호출할 때 **반드시 일치해야 합니다**:
- `handler` 함수
- `deep` 옵션
- `transform` 함수
- `pick` 배열
- `getCachedData` 함수
- `default` 값

다음 옵션들은 **다르게 설정해도** 경고가 발생하지 않습니다:
- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

```ts
// ❌ 개발 경고가 발생합니다
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { deep: false })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { deep: true })

// ✅ 허용되는 예시
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { immediate: true })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { immediate: false })
```

## [반환값](#return-values)

- `data`: 전달된 비동기 함수의 결과입니다.
- `refresh`/`execute`: `handler` 함수가 반환하는 데이터를 새로고침할 때 사용할 수 있는 함수입니다.
- `error`: 데이터 패칭에 실패한 경우의 에러 객체입니다.
- `status`: 데이터 요청의 상태를 나타내는 문자열입니다:
  - `idle`: 요청이 시작되지 않은 상태. 예:
    - `execute`가 아직 호출되지 않았고 `{ immediate: false }`가 설정된 경우
    - 서버에서 HTML을 렌더링할 때 `{ server: false }`가 설정된 경우
  - `pending`: 요청이 진행 중인 상태
  - `success`: 요청이 성공적으로 완료된 상태
  - `error`: 요청이 실패한 상태
- `clear`: `data`를 `undefined`로, `error`를 `null`로, `status`를 `'idle'`로 설정하고, 현재 대기 중인 요청을 취소 상태로 표시하는 함수입니다.

기본적으로 Nuxt는 `refresh`가 완료될 때까지 다시 실행되지 않도록 대기합니다.

::note
서버에서 데이터를 패칭하지 않은 경우(예: `server: false`), 데이터는 하이드레이션이 완료될 때까지 _패칭되지 않습니다_. 즉, 클라이언트 측에서 [`useAsyncData`](/docs/api/composables/use-async-data)를 await 하더라도 `<script setup>` 내에서 `data`는 여전히 `null`입니다.
::

## [타입](#type)

```ts [Signature]
function useAsyncData<DataT, DataE>(
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): AsyncData<DataT, DataE>
function useAsyncData<DataT, DataE>(
  key: string | Ref<string> | ComputedRef<string>,
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
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
  watch?: WatchSource[] | false
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
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
};

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

:read-more{to="/docs/getting-started/data-fetching"}
