---
title: 'definePageMeta'
description: '페이지 컴포넌트의 메타데이터를 정의합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta`는 **페이지** 컴포넌트에 메타데이터를 설정할 수 있는 컴파일러 매크로입니다. 이 컴포넌트들은 [`pages/`](/docs/guide/directory-structure/pages) 디렉토리에 위치해 있습니다([별도로 설정하지 않은 경우](/docs/api/nuxt-config#pages)). 이 방법을 통해 Nuxt 애플리케이션의 각 정적 또는 동적 라우트에 맞춤 메타데이터를 설정할 수 있습니다.

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

:read-more{to="/docs/guide/directory-structure/pages#page-metadata"}

## [타입](#type)

```ts
definePageMeta(meta: PageMeta) => void

interface PageMeta {
  validate?: (route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>
  redirect?: RouteRecordRedirectOption
  name?: string
  path?: string
  props?: RouteRecordRaw['props']
  alias?: string | string[]
  pageTransition?: boolean | TransitionProps
  layoutTransition?: boolean | TransitionProps
  viewTransition?: boolean | 'always'
  key?: false | string | ((route: RouteLocationNormalizedLoaded) => string)
  keepalive?: boolean | KeepAliveProps
  layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  scrollToTop?: boolean | ((to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => boolean)
  [key: string]: unknown
}
```

## [파라미터](#parameters)

### [`meta`](#meta)

- **타입**: `PageMeta`

  다음과 같은 페이지 메타데이터를 받는 객체입니다:

  **`name`**

  - **타입**: `string`

    이 페이지의 라우트에 대한 이름을 정의할 수 있습니다. 기본적으로 이름은 [`pages/` 디렉토리](/docs/guide/directory-structure/pages) 내의 경로를 기반으로 생성됩니다.

  **`path`**

  - **타입**: `string`

    파일 이름으로 표현할 수 있는 것보다 더 복잡한 패턴이 필요한 경우 [사용자 지정 정규 표현식](#using-a-custom-regular-expression)을 정의할 수 있습니다.

  **`props`**
  
  - **타입**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props)

    라우트의 `params`를 페이지 컴포넌트에 전달되는 props로 접근할 수 있게 해줍니다.

  **`alias`**

  - **타입**: `string | string[]`

    레코드의 별칭입니다. 레코드의 복사본처럼 동작하는 추가 경로를 정의할 수 있습니다. `/users/:id`와 `/u/:id`와 같은 경로 단축어를 가질 수 있습니다. 모든 `alias`와 `path` 값은 동일한 params를 공유해야 합니다.

  **`keepalive`**

  - **타입**: `boolean` | [`KeepAliveProps`](https://vuejs.org/api/built-in-components.html#keepalive)

    라우트 변경 시 페이지 상태를 유지하려면 `true`로 설정하거나, 세밀한 제어를 위해 [`KeepAliveProps`](https://vuejs.org/api/built-in-components.html#keepalive)를 사용할 수 있습니다.

  **`key`**

  - **타입**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    `<NuxtPage>` 컴포넌트가 다시 렌더링되는 시점을 더 세밀하게 제어하고 싶을 때 `key` 값을 설정합니다.

  **`layout`**

  - **타입**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    각 라우트에 대해 레이아웃의 정적 또는 동적 이름을 설정합니다. 기본 레이아웃을 비활성화해야 하는 경우 `false`로 설정할 수 있습니다.

  **`layoutTransition`**

  - **타입**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition)

    현재 레이아웃에 적용할 전환의 이름을 설정합니다. 이 값을 `false`로 설정하여 레이아웃 전환을 비활성화할 수도 있습니다.

  **`middleware`**

  - **타입**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/NavigationGuard.html#navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    `definePageMeta` 내에서 익명 또는 명명된 미들웨어를 직접 정의할 수 있습니다. [라우트 미들웨어](/docs/guide/directory-structure/middleware)에 대해 더 알아보세요.

  **`pageTransition`**

  - **타입**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition)

    현재 페이지에 적용할 전환의 이름을 설정합니다. 이 값을 `false`로 설정하여 페이지 전환을 비활성화할 수도 있습니다.

  **`viewTransition`**

  - **타입**: `boolean | 'always'`

    **실험적 기능, [nuxt.config 파일에서 활성화한 경우에만 사용 가능](/docs/getting-started/transitions#view-transitions-api-experimental)**</br>
    현재 페이지에 대해 View Transitions를 활성화/비활성화합니다.
    `true`로 설정하면, 사용자의 브라우저가 `prefers-reduced-motion: reduce`와 일치할 경우 Nuxt는 전환을 적용하지 않습니다(권장). `always`로 설정하면 Nuxt는 항상 전환을 적용합니다.

  **`redirect`**

  - **타입**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias.html#redirect-and-alias)

    라우트가 직접 일치할 경우 리디렉션할 위치입니다. 리디렉션은 모든 네비게이션 가드 전에 발생하며, 새로운 대상 위치로 새로운 네비게이션을 트리거합니다.

  **`validate`**

  - **타입**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    주어진 라우트가 이 페이지로 유효하게 렌더링될 수 있는지 검증합니다. 유효하면 true, 아니면 false를 반환합니다. 다른 일치 항목을 찾을 수 없으면 404가 됩니다. `statusCode`/`statusMessage`가 포함된 객체를 직접 반환하여 즉시 에러로 응답할 수도 있습니다(다른 일치 항목은 확인하지 않음).

  **`scrollToTop`**

  - **타입**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    Nuxt가 페이지를 렌더링하기 전에 맨 위로 스크롤할지 여부를 지정합니다. Nuxt의 기본 스크롤 동작을 덮어쓰고 싶다면 `~/app/router.options.ts`에서 설정할 수 있습니다([커스텀 라우팅](/docs/guide/recipes/custom-routing#using-approuteroptions) 참고).

  **`[key: string]`**

  - **타입**: `any`

    위 속성 외에도 **사용자 지정** 메타데이터를 설정할 수 있습니다. 타입 안전하게 하고 싶다면 [`meta` 객체의 타입을 확장](/docs/guide/directory-structure/pages/#typing-custom-metadata)할 수 있습니다.

## [예시](#examples)

### [기본 사용법](#basic-usage)

아래 예시는 다음을 보여줍니다:

- `key`가 값을 반환하는 함수가 될 수 있는 방법;
- `keepalive` 속성이 여러 컴포넌트 간 전환 시 `<modal>` 컴포넌트가 캐시되지 않도록 하는 방법;
- `pageType`을 사용자 지정 속성으로 추가하는 방법:

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,

  keepalive: {
    exclude: ['modal']
  },

  pageType: 'Checkout'
})
</script>
```

### [미들웨어 정의하기](#defining-middleware)

아래 예시는 미들웨어를 `definePageMeta` 내에서 직접 `function`으로 정의하거나, `middleware/` 디렉토리에 위치한 미들웨어 파일 이름과 일치하는 `string`으로 설정하는 방법을 보여줍니다:

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 미들웨어를 함수로 정의
  middleware: [
    function (to, from) {
      const auth = useState('auth')

      if (!auth.value.authenticated) {
          return navigateTo('/login')
      }

      if (to.path !== '/checkout') {
        return navigateTo('/checkout')
      }
    }
  ],

  // ... 또는 문자열로
  middleware: 'auth'

  // ... 또는 여러 문자열로
  middleware: ['auth', 'another-named-middleware']
})
</script>
```

### [사용자 지정 정규 표현식 사용하기](#using-a-custom-regular-expression)

사용자 지정 정규 표현식은 겹치는 라우트 간의 충돌을 해결하는 좋은 방법입니다. 예를 들어:

"/test-category"와 "/1234-post" 두 라우트는 `[postId]-[postSlug].vue`와 `[categorySlug].vue` 페이지 라우트 모두에 일치합니다.

`[postId]-[postSlug]` 라우트에서 `postId`에 대해 숫자(`\d+`)만 일치하도록 하려면, `[postId]-[postSlug].vue` 페이지 템플릿에 다음을 추가할 수 있습니다:

```vue [pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug' 
})
</script>
```

더 많은 예시는 [Vue Router의 매칭 문법](https://router.vuejs.org/guide/essentials/route-matching-syntax.html)을 참고하세요.

### [레이아웃 정의하기](#defining-layout)

(기본적으로) [`layouts/` 디렉토리](/docs/guide/directory-structure/layouts)에 위치한 레이아웃 파일 이름과 일치하는 레이아웃을 정의할 수 있습니다. `layout`을 `false`로 설정하여 레이아웃을 비활성화할 수도 있습니다:

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 커스텀 레이아웃 설정
  layout: 'admin'

  // ... 또는 기본 레이아웃 비활성화
  layout: false
})
</script>
```
