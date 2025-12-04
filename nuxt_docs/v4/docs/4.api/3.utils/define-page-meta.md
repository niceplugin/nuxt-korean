---
title: 'definePageMeta'
description: '페이지 컴포넌트에 대한 메타데이터를 정의합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta`는 [`app/pages/`](/docs/4.x/directory-structure/app/pages) 디렉터리(또는 [다르게 설정된 경우](/docs/4.x/api/nuxt-config#pages)을 제외하고)에 위치한 **페이지** 컴포넌트에 대한 메타데이터를 설정하는 데 사용할 수 있는 컴파일러 매크로입니다. 이 방법을 사용하면 Nuxt 애플리케이션의 각 정적 또는 동적 라우트에 대해 사용자 지정 메타데이터를 설정할 수 있습니다.

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
```

:read-more{to="/docs/4.x/directory-structure/app/pages#page-metadata"}

## Type %{type}%

```ts [Signature]
export function definePageMeta (meta: PageMeta): void

interface PageMeta {
  validate?: ((route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>)
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

## Parameters %{parameters}%

### `meta` %{meta}%

- **Type**: `PageMeta`

  다음 페이지 메타데이터를 받는 객체입니다:

  **`name`**

  - **Type**: `string`

    이 페이지의 라우트에 대한 이름을 정의할 수 있습니다. 기본적으로 이름은 [`app/pages/` 디렉터리](/docs/4.x/directory-structure/app/pages) 내부의 경로를 기반으로 생성됩니다.

  **`path`**

  - **Type**: `string`

    파일 이름으로 표현할 수 있는 것보다 더 복잡한 패턴이 있는 경우 [사용자 지정 정규식](/docs/4.x/api/utils/define-page-meta#using-a-custom-regular-expression)을 정의할 수 있습니다.

  **`props`**
  
  - **Type**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props)

    라우트의 `params`를 페이지 컴포넌트에 전달되는 props로 접근할 수 있게 해줍니다.

  **`alias`**

  - **Type**: `string | string[]`

    레코드에 대한 별칭입니다. 레코드의 복사본처럼 동작하는 추가 경로를 정의할 수 있게 해줍니다. `/users/:id`와 `/u/:id` 같은 경로 단축어를 가질 수 있습니다. 모든 `alias`와 `path` 값은 동일한 params를 공유해야 합니다.

  **`keepalive`**

  - **Type**: `boolean` | [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive)

    라우트 변경 간에 페이지 상태를 유지하려면 `true`로 설정하거나, 세밀한 제어를 위해 [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive)를 사용할 수 있습니다.

  **`key`**

  - **Type**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    `<NuxtPage>` 컴포넌트가 다시 렌더링되는 시점을 더 세밀하게 제어해야 할 때 `key` 값을 설정합니다.

  **`layout`**

  - **Type**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    각 라우트에 대해 레이아웃의 정적 또는 동적 이름을 설정합니다. 기본 레이아웃을 비활성화해야 하는 경우 `false`로 설정할 수 있습니다.

  **`layoutTransition`**

  - **Type**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)

    현재 레이아웃에 적용할 트랜지션의 이름을 설정합니다. 이 값을 `false`로 설정하여 레이아웃 트랜지션을 비활성화할 수도 있습니다.

  **`middleware`**

  - **Type**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    `definePageMeta` 내에서 익명 또는 명명된 미들웨어를 직접 정의합니다. [라우트 미들웨어](/docs/4.x/directory-structure/app/middleware)에 대해 더 알아보세요.

  **`pageTransition`**

  - **Type**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)

    현재 페이지에 적용할 트랜지션의 이름을 설정합니다. 이 값을 `false`로 설정하여 페이지 트랜지션을 비활성화할 수도 있습니다.

  **`viewTransition`**

  - **Type**: `boolean | 'always'`

    **실험적 기능이며, [nuxt.config 파일에서 활성화한 경우에만 사용 가능](/docs/4.x/getting-started/transitions#view-transitions-api-experimental)**</br>
    현재 페이지에 대해 View Transitions를 활성화/비활성화합니다.
    `true`로 설정하면, 사용자의 브라우저가 `prefers-reduced-motion: reduce`와 일치하는 경우(권장) Nuxt는 트랜지션을 적용하지 않습니다. `always`로 설정하면 Nuxt는 항상 트랜지션을 적용합니다.

  **`redirect`**

  - **Type**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias)

    라우트가 직접 매치되었을 때 어디로 리다이렉트할지 정의합니다. 리다이렉션은 모든 네비게이션 가드 이전에 발생하며, 새 대상 위치로 새로운 네비게이션을 트리거합니다.

  **`validate`**

  - **Type**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    주어진 라우트가 이 페이지로 유효하게 렌더링될 수 있는지 검증합니다. 유효하면 true를, 그렇지 않으면 false를 반환합니다. 다른 매치를 찾을 수 없는 경우, 이는 404를 의미합니다. 또한 `statusCode`/`statusMessage`가 있는 객체를 직접 반환하여 즉시 에러로 응답할 수도 있습니다(다른 매치는 확인되지 않습니다).

  **`scrollToTop`**

  - **Type**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    페이지를 렌더링하기 전에 Nuxt가 맨 위로 스크롤할지 여부를 지정합니다. Nuxt의 기본 스크롤 동작을 덮어쓰고 싶다면, `~/router.options.ts`에서 그렇게 할 수 있습니다(자세한 내용은 [사용자 지정 라우팅](/docs/4.x/guide/recipes/custom-routing#using-routeroptions)을 참조하세요).

  **`[key: string]`**

  - **Type**: `any`

    위 속성들 외에도 **사용자 지정** 메타데이터를 설정할 수 있습니다. [`meta` 객체의 타입을 보강](/docs/4.x/directory-structure/app/pages/#typing-custom-metadata)하여 타입 안전한 방식으로 이를 수행할 수 있습니다.

## Examples %{examples}%

### Basic Usage %{basic-usage}%

아래 예시는 다음을 보여줍니다:

- `key`가 값을 반환하는 함수가 될 수 있는 방법;
- `keepalive` 속성이 여러 컴포넌트 간 전환 시 `<modal>` 컴포넌트가 캐시되지 않도록 보장하는 방법;
- `pageType`을 사용자 지정 속성으로 추가하는 방법:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,

  keepalive: {
    exclude: ['modal'],
  },

  pageType: 'Checkout',
})
</script>
```

### Defining Middleware %{defining-middleware}%

아래 예시는 `definePageMeta` 내에서 `function`을 사용해 직접 미들웨어를 정의하는 방법과, `app/middleware/` 디렉터리에 위치한 미들웨어 파일 이름과 일치하는 `string`으로 설정하는 방법을 보여줍니다:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 함수를 사용해 미들웨어 정의
  middleware: [
    function (to, from) {
      const auth = useState('auth')

      if (!auth.value.authenticated) {
        return navigateTo('/login')
      }

      if (to.path !== '/checkout') {
        return navigateTo('/checkout')
      }
    },
  ],

  // ... 또는 문자열
  middleware: 'auth',

  // ... 또는 여러 문자열
  middleware: ['auth', 'another-named-middleware'],
})
</script>
```

### Using a Custom Regular Expression %{using-a-custom-regular-expression}%

사용자 지정 정규식은 겹치는 라우트 간의 충돌을 해결하는 좋은 방법입니다. 예를 들어:

"/test-category"와 "/1234-post" 두 라우트는 `[postId]-[postSlug].vue`와 `[categorySlug].vue` 페이지 라우트 모두에 매치됩니다.

`[postId]-[postSlug]` 라우트에서 `postId`에 대해 숫자(`\d+`)만 매치되도록 하려면, `[postId]-[postSlug].vue` 페이지 템플릿에 다음을 추가할 수 있습니다:

```vue [app/pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug',
})
</script>
```

더 많은 예시는 [Vue Router의 매칭 문법](https://router.vuejs.org/guide/essentials/route-matching-syntax)을 참고하세요.

### Defining Layout %{defining-layout}%

(기본적으로) [`app/layouts/` 디렉터리](/docs/4.x/directory-structure/app/layouts)에 위치한 레이아웃의 파일 이름과 일치하는 레이아웃을 정의할 수 있습니다. 또한 `layout`을 `false`로 설정하여 레이아웃을 비활성화할 수도 있습니다:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 사용자 지정 레이아웃 설정
  layout: 'admin',

  // ... 또는 기본 레이아웃 비활성화
  layout: false,
})
</script>
```
