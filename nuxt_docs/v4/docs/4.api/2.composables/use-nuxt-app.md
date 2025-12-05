---
title: 'useNuxtApp'
description: 'Nuxt 애플리케이션의 공유 런타임 컨텍스트에 접근합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp`은 Nuxt의 공유 런타임 컨텍스트(클라이언트와 서버 양쪽에서 사용 가능하지만 Nitro 라우트 내부에서는 사용 불가)에 접근할 수 있는 내장 컴포저블입니다. 이는 [Nuxt 컨텍스트](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context)라고도 불리며, Vue 앱 인스턴스, 런타임 훅, 런타임 설정 변수와 `ssrContext`, `payload` 같은 내부 상태에 접근하는 데 도움을 줍니다.

```vue [app/app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

현재 스코프에서 런타임 컨텍스트를 사용할 수 없는 경우, `useNuxtApp`을 호출하면 예외가 발생합니다. `nuxtApp`이 반드시 필요하지 않은 컴포저블이거나, 예외 없이 컨텍스트의 사용 가능 여부만 확인하고 싶다면 대신 [`tryUseNuxtApp`](/docs/4.x/api/composables/use-nuxt-app#tryusenuxtapp)을 사용할 수 있습니다.

<!--
note
기본적으로 Nuxt의 공유 런타임 컨텍스트는 [`buildId`](/docs/4.x/api/nuxt-config#buildid) 옵션 아래에 네임스페이스로 구분됩니다. 이를 통해 여러 런타임 컨텍스트를 지원할 수 있습니다.

## Params %{params}%

- `appName`: 선택적인 애플리케이션 이름입니다. 제공하지 않으면 Nuxt의 `buildId` 옵션이 사용됩니다. 제공하는 경우, 기존의 `buildId`와 일치해야 합니다. -->

## Methods %{methods}%

### `provide (name, value)` %{provide-name-value}%

`nuxtApp`은 [Nuxt 플러그인](/docs/4.x/directory-structure/app/plugins)을 사용해 확장할 수 있는 런타임 컨텍스트입니다. `provide` 함수를 사용해 Nuxt 플러그인을 생성하면, 값과 헬퍼 메서드를 Nuxt 애플리케이션 전역의 모든 컴포저블과 컴포넌트에서 사용할 수 있게 만들 수 있습니다.

`provide` 함수는 `name`과 `value` 파라미터를 받습니다.

```ts
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', name => `Hello ${name}!`)

// "Hello name!"을 출력합니다.
console.log(nuxtApp.$hello('name'))
```

위 예시에서 볼 수 있듯이, `$hello`는 `nuxtApp` 컨텍스트의 새로운 커스텀 일부가 되었고, `nuxtApp`에 접근할 수 있는 모든 곳에서 사용할 수 있습니다.

### `hook(name, cb)` %{hookname-cb}%

`nuxtApp`에서 사용할 수 있는 훅은 Nuxt 애플리케이션의 런타임 동작을 커스터마이즈할 수 있게 해줍니다. Vue.js 컴포저블과 [Nuxt 플러그인](/docs/4.x/directory-structure/app/plugins)에서 런타임 훅을 사용해 렌더링 라이프사이클에 개입할 수 있습니다.

`hook` 함수는 렌더링 라이프사이클의 특정 지점에 훅을 걸어 커스텀 로직을 추가할 때 유용합니다. `hook` 함수는 주로 Nuxt 플러그인을 만들 때 사용됩니다.

Nuxt에서 호출하는 사용 가능한 런타임 훅 목록은 [Runtime Hooks](/docs/4.x/api/advanced/hooks#app-hooks-runtime)를 참고하세요.

```ts [app/plugins/test.ts]
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* 여기에 코드를 작성하세요 */
  })
  nuxtApp.hook('vue:error', (..._args) => {
    console.log('vue:error')
    // if (import.meta.client) {
    //   console.log(..._args)
    // }
  })
})
```

### `callHook(name, ...args)` %{callhookname-args}%

`callHook`은 기존 훅 중 하나를 인자로 호출하면 프로미스를 반환합니다.

```ts
await nuxtApp.callHook('my-plugin:init')
```

## Properties %{properties}%

`useNuxtApp()`은 앱을 확장하고 커스터마이즈하며 상태, 데이터, 변수를 공유하는 데 사용할 수 있는 다음 속성들을 노출합니다.

### `vueApp` %{vueapp}%

`vueApp`은 `nuxtApp`을 통해 접근할 수 있는 전역 Vue.js [애플리케이션 인스턴스](https://vuejs.org/api/application#application-api)입니다.

유용한 메서드들:
- [`component()`](https://vuejs.org/api/application#app-component) - 이름 문자열과 컴포넌트 정의를 모두 전달하면 전역 컴포넌트를 등록하고, 이름만 전달하면 이미 등록된 컴포넌트를 가져옵니다.
- [`directive()`](https://vuejs.org/api/application#app-directive) - 이름 문자열과 디렉티브 정의를 모두 전달하면 전역 커스텀 디렉티브를 등록하고, 이름만 전달하면 이미 등록된 디렉티브를 가져옵니다[(예시)](/docs/4.x/directory-structure/app/plugins#vue-directives).
- [`use()`](https://vuejs.org/api/application#app-use) - **[Vue.js 플러그인](https://vuejs.org/guide/reusability/plugins)** 을 설치합니다 [(예시)](/docs/4.x/directory-structure/app/plugins#vue-plugins).

:read-more{icon="i-simple-icons-vuedotjs" to="https://vuejs.org/api/application.html#application-api"}

### `ssrContext` %{ssrcontext}%

`ssrContext`는 서버 사이드 렌더링 중에 생성되며 서버 측에서만 사용할 수 있습니다.

Nuxt는 `ssrContext`를 통해 다음 속성들을 노출합니다:
- `url` (string) - 현재 요청 URL.
- `event` ([h3js/h3](https://github.com/h3js/h3) request event) - 현재 라우트의 요청과 응답에 접근합니다.
- `payload` (object) - NuxtApp 페이로드 객체.

### `payload` %{payload}%

`payload`는 서버 측의 데이터와 상태 변수를 클라이언트 측으로 노출합니다. 서버 측에서 전달된 후 클라이언트에서 사용할 수 있는 키는 다음과 같습니다:

- `serverRendered` (boolean) - 응답이 서버 사이드 렌더링인지 여부를 나타냅니다.
- `data` (object) - [`useFetch`](/docs/4.x/api/composables/use-fetch) 또는 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)를 사용해 API 엔드포인트에서 데이터를 가져오면, 결과 페이로드는 `payload.data`에서 접근할 수 있습니다. 이 데이터는 캐시되며, 동일한 요청이 여러 번 발생할 경우 같은 데이터를 다시 가져오는 것을 방지하는 데 도움이 됩니다.

  ::code-group
  ```vue [app/app.vue]
  <script setup lang="ts">
  const { data } = await useAsyncData('count', (_nuxtApp, { signal }) => $fetch('/api/count', { signal }))
  </script>
  ```
  ```ts [server/api/count.ts]
  export default defineEventHandler((event) => {
    return { count: 1 }
  })
  ```
  ::

  위 예시에서 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)를 사용해 `count` 값을 가져온 후, `payload.data`에 접근하면 `{ count: 1 }`이 기록되어 있는 것을 볼 수 있습니다.

  동일한 `payload.data`에 [`ssrcontext`](/docs/4.x/api/composables/use-nuxt-app#ssrcontext)에서 접근하면, 서버 측에서도 같은 값을 사용할 수 있습니다.

- `state` (object) - Nuxt에서 [`useState`](/docs/4.x/api/composables/use-state) 컴포저블을 사용해 공유 상태를 설정하면, 이 상태 데이터는 `payload.state.[name-of-your-state]`를 통해 접근할 수 있습니다.

  ```ts [app/plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
      const color = useColor()
    }
  })
  ```

  `ref`, `reactive`, `shallowRef`, `shallowReactive`, `NuxtError` 같은 더 고급 타입을 사용하는 것도 가능합니다.

  [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements)부터는 Nuxt에서 기본적으로 지원하지 않는 타입에 대해 직접 reducer/reviver를 정의할 수 있습니다.

  :video-accordion{title="클래스와 관련된 페이로드 직렬화에 대해 Alexander Lichter의 영상을 시청하세요" videoId="8w6ffRBs8a4"}

  아래 예시에서는 페이로드 플러그인을 사용해 [Luxon](https://moment.github.io/luxon/#/)의 DateTime 클래스에 대한 reducer(또는 serializer)와 reviver(또는 deserializer)를 정의합니다.

  ```ts [app/plugins/date-time-payload.ts]
  /**
   * 이 종류의 플러그인은 Nuxt 라이프사이클에서 매우 이른 시점, 페이로드를 복원하기 전에 실행됩니다.
   * 라우터나 다른 Nuxt 주입 속성에는 접근할 수 없습니다.
   *
   * "DateTime" 문자열은 타입 식별자이며,
   * reducer와 reviver 양쪽에서 동일해야 합니다.
   */
  export default definePayloadPlugin((nuxtApp) => {
    definePayloadReducer('DateTime', (value) => {
      return value instanceof DateTime && value.toJSON()
    })
    definePayloadReviver('DateTime', (value) => {
      return DateTime.fromISO(value)
    })
  })
  ```

### `isHydrating` %{ishydrating}%

클라이언트 측에서 Nuxt 앱이 하이드레이션 중인지 확인하려면 `nuxtApp.isHydrating`(boolean)을 사용하세요.

```ts [app/components/nuxt-error-boundary.ts]
export default defineComponent({
  setup (_props, { slots, emit }) {
    const nuxtApp = useNuxtApp()
    onErrorCaptured((err) => {
      if (import.meta.client && !nuxtApp.isHydrating) {
        // ...
      }
    })
  },
})
```

### `runWithContext` %{runwithcontext}%

::note
"Nuxt instance unavailable" 메시지를 보고 이곳에 오셨을 가능성이 큽니다. 이 메서드는 꼭 필요할 때만 사용하시고, 문제가 되는 예시를 보고해 주시면 프레임워크 레벨에서 궁극적으로 해결하는 데 도움이 됩니다.
::

`runWithContext` 메서드는 특정 함수를 호출하면서 명시적으로 Nuxt 컨텍스트를 부여하기 위해 사용됩니다. 일반적으로 Nuxt 컨텍스트는 암묵적으로 전달되므로 이에 대해 신경 쓸 필요가 없습니다. 하지만 미들웨어/플러그인에서 복잡한 `async`/`await` 시나리오를 다룰 때, 비동기 호출 이후 현재 인스턴스가 해제된 상황에 직면할 수 있습니다.

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // try/catch 블록 때문에 Vue/Nuxt 컴파일러가 여기서 컨텍스트를 잃습니다.
  } catch (e) {
    user = null
  }
  if (!user) {
    // `navigateTo` 호출에 올바른 Nuxt 컨텍스트를 적용합니다.
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### Usage %{usage}%

```ts
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`: 현재 Nuxt 애플리케이션의 컨텍스트가 필요한 임의의 함수입니다. 이 컨텍스트는 자동으로 올바르게 적용됩니다.

`runWithContext`는 `functionWithContext`가 반환하는 값을 그대로 반환합니다.

#### A Deeper Explanation of Context %{a-deeper-explanation-of-context}%

Vue.js Composition API(및 유사한 Nuxt 컴포저블)는 암묵적인 컨텍스트에 의존해 동작합니다. 라이프사이클 동안 Vue는 현재 컴포넌트의 임시 인스턴스(그리고 Nuxt는 nuxtApp의 임시 인스턴스)를 전역 변수에 설정하고, 같은 틱에서 이를 해제합니다. 서버 측 렌더링 시에는 여러 사용자로부터의 요청과 nuxtApp이 동일한 전역 컨텍스트에서 실행됩니다. 이 때문에 Nuxt와 Vue는 두 사용자나 컴포넌트 간에 공유 참조가 누출되는 것을 방지하기 위해 이 전역 인스턴스를 즉시 해제합니다.

이게 의미하는 바는 무엇일까요? Composition API와 Nuxt 컴포저블은 라이프사이클 동안, 그리고 비동기 작업 이전의 같은 틱에서만 사용할 수 있다는 뜻입니다:

```ts
// --- Vue 내부 ---
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

// Vue / Nuxt는 setup() 호출 시 현재 컴포넌트를 참조하는 전역 변수를 _vueInstance에 설정합니다.
async function setup () {
  getCurrentInstance() // 동작함
  await someAsyncOperation() // 비동기 작업 이전의 같은 틱에서 Vue가 컨텍스트를 해제합니다!
  getCurrentInstance() // null
}
```

이에 대한 고전적인 해결책은 첫 호출 시 현재 인스턴스를 `const instance = getCurrentInstance()` 같은 로컬 변수에 캐시하고 이후 컴포저블 호출에서 이를 사용하는 것입니다. 하지만 이 경우, 중첩된 모든 컴포저블 호출이 이제 인스턴스를 인자로 명시적으로 받아야 하고, composition-api의 암묵적인 컨텍스트에 의존할 수 없게 됩니다. 이는 컴포저블의 설계 한계일 뿐, 그 자체로 버그는 아닙니다.

이 한계를 극복하기 위해 Vue는 `<script setup>`에 대해 애플리케이션 코드를 컴파일할 때, 각 호출 이후 컨텍스트를 복원하는 작업을 내부적으로 수행합니다:

```ts
const __instance = getCurrentInstance() // Vue 컴파일러가 생성
getCurrentInstance() // 동작함!
await someAsyncOperation() // Vue가 컨텍스트를 해제
__restoreInstance(__instance) // Vue 컴파일러가 생성
getCurrentInstance() // 여전히 동작함!
```

Vue가 실제로 무엇을 하는지에 대한 더 나은 설명은 [unjs/unctx#2 (comment)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723)를 참고하세요.

#### Solution %{solution}%

여기서 `runWithContext`를 사용해 `<script setup>`이 동작하는 방식과 유사하게 컨텍스트를 복원할 수 있습니다.

Nuxt는 내부적으로 [unjs/unctx](https://github.com/unjs/unctx)를 사용해 플러그인과 미들웨어에서도 Vue와 유사한 방식으로 컴포저블을 지원합니다. 이를 통해 `navigateTo()` 같은 컴포저블이 `nuxtApp`을 직접 전달하지 않고도 동작할 수 있으며, Composition API의 DX와 성능 이점을 Nuxt 프레임워크 전체로 확장합니다.

Nuxt 컴포저블은 Vue Composition API와 동일한 설계를 가지므로, 이러한 변환을 마법처럼 수행하기 위해 유사한 해결책이 필요합니다. [unjs/unctx#2](https://github.com/unjs/unctx/issues/2) (제안), [unjs/unctx#4](https://github.com/unjs/unctx/pull/4) (변환 구현), [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884) (Nuxt 통합)을 확인해 보세요.

현재 Vue는 `<script setup>`에서 async/await 사용에 대해서만 비동기 컨텍스트 복원을 지원합니다. Nuxt에서는 `defineNuxtPlugin()`과 `defineNuxtRouteMiddleware()`에 대한 변환 지원이 추가되었으며, 이를 사용할 경우 Nuxt가 자동으로 컨텍스트 복원 변환을 적용합니다.

#### Remaining Issues %{remaining-issues}%

`await`를 포함한 `try/catch` 문에서 컨텍스트를 자동으로 복원하는 `unjs/unctx` 변환은 버그가 있는 것으로 보이며, 위에서 제안한 우회 방법의 필요성을 제거하려면 궁극적으로 이 문제가 해결되어야 합니다.

#### Native Async Context %{native-async-context}%

새로운 실험적 기능을 사용하면 [Node.js `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage)와 새로운 unctx 지원을 통해 네이티브 비동기 컨텍스트 지원을 활성화할 수 있습니다. 이를 통해 변환이나 수동 컨텍스트 전달/호출 없이 **모든 중첩 비동기 컴포저블**에서 **네이티브로** 비동기 컨텍스트를 사용할 수 있습니다.

::tip
네이티브 비동기 컨텍스트 지원은 현재 Bun과 Node에서 동작합니다.
::

:read-more{to="/docs/4.x/guide/going-further/experimental-features#asynccontext"}

## tryUseNuxtApp %{tryusenuxtapp}%

이 함수는 `useNuxtApp`과 정확히 동일하게 동작하지만, 컨텍스트를 사용할 수 없는 경우 예외를 던지는 대신 `null`을 반환합니다.

`nuxtApp`이 반드시 필요하지 않은 컴포저블이거나, 예외 없이 컨텍스트의 사용 가능 여부만 확인하고 싶을 때 사용할 수 있습니다.

사용 예시:

```ts [composable.ts]
export function useStandType () {
  // 클라이언트에서는 항상 동작
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

<!-- ### Params

- `appName`: 선택적인 애플리케이션 이름입니다. 제공하지 않으면 Nuxt의 `buildId` 옵션이 사용됩니다. 제공하는 경우, 기존의 `buildId`와 일치해야 합니다. -->
