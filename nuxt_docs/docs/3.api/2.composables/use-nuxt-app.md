---
title: 'useNuxtApp'
description: 'Nuxt 애플리케이션의 공유 런타임 컨텍스트에 접근합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp`은 Nuxt의 공유 런타임 컨텍스트(일명 [Nuxt 컨텍스트](/docs/guide/going-further/nuxt-app#the-nuxt-context))에 접근할 수 있는 내장 컴포저블입니다. 이 컨텍스트는 클라이언트와 서버 모두에서 사용할 수 있지만(Nitro 라우트 내에서는 사용할 수 없음), Vue 앱 인스턴스, 런타임 훅, 런타임 설정 변수, `ssrContext` 및 `payload`와 같은 내부 상태에 접근하는 데 도움이 됩니다.

```vue [app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

현재 스코프에서 런타임 컨텍스트를 사용할 수 없는 경우, `useNuxtApp`을 호출하면 예외가 발생합니다. `nuxtApp`이 필요하지 않은 컴포저블이거나, 예외 없이 컨텍스트의 사용 가능 여부만 확인하고 싶다면 [`tryUseNuxtApp`](#tryusenuxtapp)을 대신 사용할 수 있습니다.

<!--
note
기본적으로 Nuxt의 공유 런타임 컨텍스트는 [`buildId`](/docs/api/nuxt-config#buildid) 옵션 아래에 네임스페이스로 구분됩니다. 이를 통해 여러 런타임 컨텍스트를 지원할 수 있습니다.

## [Params](#params)

- `appName`: 선택적인 애플리케이션 이름입니다. 제공하지 않으면 Nuxt의 `buildId` 옵션이 사용됩니다. 그렇지 않으면 기존의 `buildId`와 일치해야 합니다. -->

## [Methods](#methods)

### [`provide (name, value)`](#provide-name-value)

`nuxtApp`은 [Nuxt 플러그인](/docs/guide/directory-structure/plugins)을 사용하여 확장할 수 있는 런타임 컨텍스트입니다. `provide` 함수를 사용하여 Nuxt 플러그인을 생성하고, 값과 헬퍼 메서드를 Nuxt 애플리케이션의 모든 컴포저블과 컴포넌트에서 사용할 수 있도록 제공합니다.

`provide` 함수는 `name`과 `value` 파라미터를 받습니다.

```js
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', (name) => `Hello ${name}!`)

// "Hello name!"이 출력됩니다!
console.log(nuxtApp.$hello('name'))
```

위 예시에서 볼 수 있듯이, `$hello`는 `nuxtApp` 컨텍스트의 새로운 커스텀 속성이 되었으며, `nuxtApp`에 접근할 수 있는 모든 곳에서 사용할 수 있습니다.

### [`hook(name, cb)`](#hookname-cb)

`nuxtApp`에서 사용할 수 있는 훅을 통해 Nuxt 애플리케이션의 런타임 동작을 커스터마이즈할 수 있습니다. Vue.js 컴포저블과 [Nuxt 플러그인](/docs/guide/directory-structure/plugins)에서 런타임 훅을 사용하여 렌더링 라이프사이클에 연결할 수 있습니다.

`hook` 함수는 특정 시점의 렌더링 라이프사이클에 커스텀 로직을 추가할 때 유용합니다. 주로 Nuxt 플러그인을 만들 때 사용됩니다.

Nuxt에서 호출하는 사용 가능한 런타임 훅은 [Runtime Hooks](/docs/api/advanced/hooks#app-hooks-runtime)를 참고하세요.

```ts [plugins/test.ts]
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

### [`callHook(name, ...args)`](#callhookname-args)

`callHook`은 기존 훅 중 하나를 호출할 때 프로미스를 반환합니다.

```ts
await nuxtApp.callHook('my-plugin:init')
```

## [Properties](#properties)

`useNuxtApp()`은 앱을 확장하고 커스터마이즈하며 상태, 데이터, 변수를 공유할 수 있는 다음과 같은 속성을 노출합니다.

### [`vueApp`](#vueapp)

`vueApp`은 `nuxtApp`을 통해 접근할 수 있는 전역 Vue.js [애플리케이션 인스턴스](https://vuejs.org/api/application.html#application-api)입니다.

유용한 메서드:
- [`component()`](https://vuejs.org/api/application.html#app-component) - 이름 문자열과 컴포넌트 정의를 모두 전달하면 전역 컴포넌트를 등록하고, 이름만 전달하면 이미 등록된 컴포넌트를 반환합니다.
- [`directive()`](https://vuejs.org/api/application.html#app-directive) - 이름 문자열과 디렉티브 정의를 모두 전달하면 전역 커스텀 디렉티브를 등록하고, 이름만 전달하면 이미 등록된 디렉티브를 반환합니다[(예시)](/docs/guide/directory-structure/plugins#vue-directives).
- [`use()`](https://vuejs.org/api/application.html#app-use) - **[Vue.js 플러그인](https://vuejs.org/guide/reusability/plugins.html)**을 설치합니다[(예시)](/docs/guide/directory-structure/plugins#vue-plugins).

:read-more{icon="i-simple-icons-vuedotjs" to="https://vuejs.org/api/application.html#application-api"}

### [`ssrContext`](#ssrcontext)

`ssrContext`는 서버 사이드 렌더링 중에 생성되며, 서버 측에서만 사용할 수 있습니다.

Nuxt는 `ssrContext`를 통해 다음과 같은 속성을 제공합니다:
- `url` (string) - 현재 요청 URL.
- `event` ([unjs/h3](https://github.com/unjs/h3) 요청 이벤트) - 현재 라우트의 요청 및 응답에 접근합니다.
- `payload` (object) - NuxtApp payload 객체.

### [`payload`](#payload)

`payload`는 서버 측에서 클라이언트 측으로 데이터와 상태 변수를 노출합니다. 서버 측에서 전달된 후 클라이언트에서 다음 키를 사용할 수 있습니다:

- `serverRendered` (boolean) - 응답이 서버 사이드 렌더링되었는지 여부를 나타냅니다.
- `data` (object) - [`useFetch`](/docs/api/composables/use-fetch) 또는 [`useAsyncData`](/docs/api/composables/use-async-data)를 사용하여 API 엔드포인트에서 데이터를 가져오면, 결과 payload는 `payload.data`에서 접근할 수 있습니다. 이 데이터는 캐시되어 동일한 요청이 여러 번 발생할 경우 중복 요청을 방지합니다.

  ::code-group
  ```vue [app.vue]
  <script setup lang="ts">
  const { data } = await useAsyncData('count', () => $fetch('/api/count'))
  </script>
  ```
  ```ts [server/api/count.ts]
  export default defineEventHandler(event => {
    return { count: 1 }
  })
  ```
  ::

  위 예시에서 [`useAsyncData`](/docs/api/composables/use-async-data)를 사용해 `count` 값을 가져온 후, `payload.data`에 접근하면 `{ count: 1 }`이 기록되어 있는 것을 볼 수 있습니다.

  동일한 [`ssrcontext`](#ssrcontext)에서 `payload.data`에 접근하면 서버 측에서도 동일한 값을 확인할 수 있습니다.

- `state` (object) - Nuxt에서 [`useState`](/docs/api/composables/use-state) 컴포저블을 사용해 공유 상태를 설정하면, 이 상태 데이터는 `payload.state.[name-of-your-state]`를 통해 접근할 수 있습니다.

  ```ts [plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
      const color = useColor()
    }
  })
  ```

  또한 `ref`, `reactive`, `shallowRef`, `shallowReactive`, `NuxtError`와 같은 더 고급 타입도 사용할 수 있습니다.

  [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements)부터는 Nuxt에서 지원하지 않는 타입에 대해 직접 reducer/reviver를 정의할 수 있습니다.

  :video-accordion{title="Alexander Lichter가 클래스와 관련된 payload 직렬화에 대해 설명하는 영상을 시청하세요" videoId="8w6ffRBs8a4"}

  아래 예시에서는 [Luxon](https://moment.github.io/luxon/#/) DateTime 클래스를 위한 reducer(또는 serializer)와 reviver(또는 deserializer)를 payload 플러그인으로 정의합니다.

  ```ts [plugins/date-time-payload.ts]
  /**
   * 이 종류의 플러그인은 Nuxt 라이프사이클에서 매우 이른 시점에 실행되며, payload를 복원하기 전에 실행됩니다.
   * 라우터나 Nuxt에서 주입된 다른 속성에는 접근할 수 없습니다.
   *
   * "DateTime" 문자열은 타입 식별자이며,
   * reducer와 reviver 모두에서 동일해야 합니다.
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

### [`isHydrating`](#ishydrating)

클라이언트 측에서 Nuxt 앱이 하이드레이션 중인지 확인하려면 `nuxtApp.isHydrating`(boolean)을 사용하세요.

```ts [components/nuxt-error-boundary.ts]
export default defineComponent({
  setup (_props, { slots, emit }) {
    const nuxtApp = useNuxtApp()
    onErrorCaptured((err) => {
      if (import.meta.client && !nuxtApp.isHydrating) {
        // ...
      }
    })
  }
})
```

### [`runWithContext`](#runwithcontext)

::note
"Nuxt 인스턴스를 사용할 수 없음" 메시지로 인해 이곳에 오셨을 수 있습니다. 이 메서드는 꼭 필요한 경우에만 사용하시고, 문제가 되는 예시를 보고해주시면 프레임워크 차원에서 궁극적으로 해결할 수 있습니다.
::

`runWithContext` 메서드는 함수를 호출할 때 명시적으로 Nuxt 컨텍스트를 부여하는 데 사용됩니다. 일반적으로 Nuxt 컨텍스트는 암묵적으로 전달되므로 신경 쓸 필요가 없습니다. 하지만 미들웨어/플러그인에서 복잡한 `async`/`await` 시나리오를 다룰 때, 비동기 호출 이후 현재 인스턴스가 해제되는 경우가 발생할 수 있습니다.

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // try/catch 블록 때문에 Vue/Nuxt 컴파일러가 컨텍스트를 잃어버립니다.
  } catch (e) {
    user = null
  }
  if (!user) {
    // `navigateTo` 호출에 올바른 Nuxt 컨텍스트를 적용합니다.
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### [사용법](#usage)

```js
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`: 현재 Nuxt 애플리케이션의 컨텍스트가 필요한 모든 함수. 이 컨텍스트는 자동으로 올바르게 적용됩니다.

`runWithContext`는 `functionWithContext`가 반환하는 값을 그대로 반환합니다.

#### [컨텍스트에 대한 더 깊은 설명](#a-deeper-explanation-of-context)

Vue.js Composition API(및 Nuxt 컴포저블도 마찬가지)는 암묵적인 컨텍스트에 의존하여 동작합니다. 라이프사이클 동안 Vue는 현재 컴포넌트의 임시 인스턴스(및 Nuxt의 임시 nuxtApp 인스턴스)를 전역 변수에 설정하고, 같은 틱에서 해제합니다. 서버 측 렌더링 시에는 여러 사용자의 요청이 동시에 들어오고, nuxtApp이 동일한 전역 컨텍스트에서 실행됩니다. 이 때문에 Nuxt와 Vue는 두 사용자나 컴포넌트 간에 공유 참조가 누출되는 것을 방지하기 위해 즉시 이 전역 인스턴스를 해제합니다.

이게 무슨 의미일까요? Composition API와 Nuxt 컴포저블은 라이프사이클 중, 그리고 비동기 작업 전 동일한 틱 내에서만 사용할 수 있습니다:

```js
// --- Vue 내부 --- 
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

// Vue / Nuxt는 setup() 호출 시 _vueInstance에 현재 컴포넌트를 전역 변수로 설정합니다.
async function setup() {
  getCurrentInstance() // 동작함
  await someAsyncOperation() // Vue는 비동기 작업 전 같은 틱에서 컨텍스트를 해제함!
  getCurrentInstance() // null
}
```

이 문제에 대한 고전적인 해결책은 첫 호출 시 현재 인스턴스를 로컬 변수에 캐싱(`const instance = getCurrentInstance()`)하고, 이후 컴포저블 호출에서 이를 사용하는 것입니다. 하지만 이 경우, 중첩된 모든 컴포저블 호출이 인스턴스를 명시적으로 인자로 받아야 하며, composition-api의 암묵적 컨텍스트에 의존할 수 없습니다. 이는 컴포저블의 설계적 한계일 뿐, 문제는 아닙니다.

이 한계를 극복하기 위해 Vue는 애플리케이션 코드를 컴파일할 때 내부적으로 작업을 수행하여 `<script setup>`의 각 호출 후 컨텍스트를 복원합니다:

```js
const __instance = getCurrentInstance() // Vue 컴파일러가 생성
getCurrentInstance() // 동작함!
await someAsyncOperation() // Vue가 컨텍스트를 해제함
__restoreInstance(__instance) // Vue 컴파일러가 생성
getCurrentInstance() // 여전히 동작함!
```

Vue가 실제로 어떻게 동작하는지 더 잘 설명한 내용은 [unjs/unctx#2 (comment)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723)를 참고하세요.

#### [해결책](#solution)

여기서 `<script setup>`이 동작하는 방식과 유사하게 컨텍스트를 복원하기 위해 `runWithContext`를 사용할 수 있습니다.

Nuxt는 내부적으로 [unjs/unctx](https://github.com/unjs/unctx)를 사용하여 플러그인과 미들웨어에서 Vue와 유사한 컴포저블을 지원합니다. 이를 통해 `navigateTo()`와 같은 컴포저블이 `nuxtApp`을 직접 전달하지 않아도 동작할 수 있으며, Composition API의 DX와 성능 이점을 Nuxt 프레임워크 전체에 제공합니다.

Nuxt 컴포저블은 Vue Composition API와 동일한 설계를 가지고 있으므로, 이러한 변환을 마법처럼 수행할 유사한 솔루션이 필요합니다. [unjs/unctx#2](https://github.com/unjs/unctx/issues/2) (제안), [unjs/unctx#4](https://github.com/unjs/unctx/pull/4) (변환 구현), [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884) (Nuxt 통합)를 참고하세요.

Vue는 현재 `<script setup>`의 async/await 사용에 대해서만 비동기 컨텍스트 복원을 지원합니다. Nuxt에서는 `defineNuxtPlugin()`과 `defineNuxtRouteMiddleware()`에 대한 변환 지원이 추가되어, 이를 사용할 때 Nuxt가 자동으로 컨텍스트 복원을 적용합니다.

#### [남은 이슈](#remaining-issues)

`unjs/unctx`의 컨텍스트 자동 복원 변환은 `await`가 포함된 `try/catch` 문에서 버그가 있는 것으로 보이며, 위에서 제안한 우회 방법의 필요성을 제거하려면 궁극적으로 이 문제가 해결되어야 합니다.

#### [네이티브 비동기 컨텍스트](#native-async-context)

새로운 실험적 기능을 사용하면 [Node.js `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage)와 새로운 unctx 지원을 통해 **어떤 중첩된 비동기 컴포저블**에서도 변환이나 수동 컨텍스트 전달/호출 없이 **네이티브**로 비동기 컨텍스트를 사용할 수 있습니다.

::tip
네이티브 비동기 컨텍스트 지원은 현재 Bun과 Node에서 동작합니다.
::

:read-more{to="/docs/guide/going-further/experimental-features#asynccontext"}

## [tryUseNuxtApp](#tryusenuxtapp)

이 함수는 `useNuxtApp`과 동일하게 동작하지만, 컨텍스트를 사용할 수 없는 경우 예외를 발생시키는 대신 `null`을 반환합니다.

`nuxtApp`이 필요하지 않은 컴포저블이거나, 예외 없이 컨텍스트의 사용 가능 여부만 확인하고 싶을 때 사용할 수 있습니다.

사용 예시:

```ts [composable.ts]
export function useStandType() {
  // 클라이언트에서는 항상 동작합니다
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

<!-- ### Params

- `appName`: 선택적인 애플리케이션 이름입니다. 제공하지 않으면 Nuxt의 `buildId` 옵션이 사용됩니다. 그렇지 않으면 기존의 `buildId`와 일치해야 합니다. -->
