---
title: 'definePageMeta'
description: '페이지 컴포넌트의 메타데이터를 정의합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta`는 [`app/pages/`](/docs/4.x/directory-structure/app/pages) 디렉터리에 있는 **페이지** 컴포넌트에 메타데이터를 설정할 수 있는 컴파일러 매크로입니다([다르게 설정한 경우](/docs/4.x/api/nuxt-config#pages)는 제외). 이를 통해 Nuxt 애플리케이션의 각 정적 또는 동적 라우트에 맞춤 메타데이터를 설정할 수 있습니다.

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
```

:read-more{to="/docs/4.x/directory-structure/app/pages#page-metadata"}

## 타입 %{#type}%

```ts [Signature]
export function definePageMeta (meta: PageMeta): void

interface PageMeta {
  validate?: ((route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>)
  redirect?: RouteRecordRedirectOption
  name?: string
  path?: string
  props?: RouteRecordRaw['props']
  alias?: string | string[]
  groups?: string[]
  pageTransition?: boolean | TransitionProps
  layoutTransition?: boolean | TransitionProps
  viewTransition?: ViewTransitionPageOptions['enabled'] | ViewTransitionPageOptions
  key?: false | string | ((route: RouteLocationNormalizedLoaded) => string)
  keepalive?: boolean | KeepAliveProps
  layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey> | { name?: LayoutKey | false, props?: Record<string, unknown> /* or the selected layout's props */ }
  middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  scrollToTop?: boolean | ((to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => boolean)
  [key: string]: unknown
}
```

## 매개변수 %{#parameters}%

### `meta` %{#meta}%

- **Type**: `PageMeta`

  다음 페이지 메타데이터를 받을 수 있는 객체입니다:

  **`name`**

  - **Type**: `string`

    이 페이지 라우트의 이름을 정의할 수 있습니다. 기본적으로 이름은 [`app/pages/` 디렉터리](/docs/4.x/directory-structure/app/pages) 안의 경로를 기반으로 생성됩니다.

  **`path`**

  - **Type**: `string`

    파일 이름만으로 표현하기 어려운 더 복잡한 패턴이 있다면 [커스텀 정규 표현식](/docs/4.x/api/utils/define-page-meta#using-a-custom-regular-expression)을 정의할 수 있습니다.

  **`props`**
  
  - **Type**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props)

    라우트의 `params`를 페이지 컴포넌트에 전달되는 props로 접근할 수 있게 합니다.

  **`alias`**

  - **Type**: `string | string[]`

    레코드의 별칭입니다. 레코드의 복사본처럼 동작하는 추가 경로를 정의할 수 있습니다. `/users/:id`와 `/u/:id` 같은 경로 축약형을 둘 수 있습니다. 모든 `alias`와 `path` 값은 같은 params를 공유해야 합니다.

  **`groups`**

  - **Type**: `string[]`

    폴더 구조를 기준으로, 이 페이지가 속한 라우트 그룹입니다. [route groups](/docs/4.x/guide/directory-structure/app/pages#route-groups) 안의 페이지라면 자동으로 채워집니다.

  **`keepalive`**

  - **Type**: `boolean` | [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive)

    라우트 변경 사이에서도 페이지 상태를 유지하고 싶다면 `true`로 설정하거나, 더 세밀하게 제어하려면 [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive)를 사용하세요.

  **`key`**

  - **Type**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    `<NuxtPage>` 컴포넌트가 언제 다시 렌더링될지 더 세밀하게 제어해야 한다면 `key` 값을 설정하세요.

  **`layout`**

  - **Type**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>` | `{ name?: LayoutKey | false; props?: Record<string, unknown> /* or the selected layout's props */ }`

    각 라우트에 대해 레이아웃의 정적 이름 또는 동적 이름을 설정합니다. 기본 레이아웃을 비활성화해야 한다면 `false`로 설정할 수 있습니다.

    `name`과 `props`를 가진 객체를 전달해 레이아웃 컴포넌트에 타입이 지정된 props를 전달할 수도 있습니다. 레이아웃이 `defineProps`로 props를 정의하면, `definePageMeta` 안에서도 완전히 타입이 지정됩니다.

  **`layoutTransition`**

  - **Type**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)

    현재 레이아웃에 적용할 전환 이름을 설정합니다. 레이아웃 전환을 비활성화하려면 이 값을 `false`로 설정할 수도 있습니다.

  **`middleware`**

  - **Type**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    `definePageMeta` 안에서 익명 또는 이름 있는 미들웨어를 직접 정의합니다. [route middleware](/docs/4.x/directory-structure/app/middleware)에 대해 더 알아보세요.

  **`pageTransition`**

  - **Type**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)

    현재 페이지에 적용할 전환 이름을 설정합니다. 페이지 전환을 비활성화하려면 이 값을 `false`로 설정할 수도 있습니다.

  **`viewTransition`**

  - **Type**: `boolean | 'always' | ViewTransitionPageOptions`

    **실험적 기능이며, [nuxt.config 파일에서 활성화했을 때만 사용 가능](/docs/4.x/getting-started/transitions#view-transitions-api-experimental)**</br>
    현재 페이지에 대해 View Transitions를 활성화/비활성화합니다.
    true로 설정하면 사용자의 브라우저가 `prefers-reduced-motion: reduce`와 일치할 경우 Nuxt는 전환을 적용하지 않습니다(권장). `always`로 설정하면 Nuxt는 항상 전환을 적용합니다.

    [view transition types](/docs/4.x/getting-started/transitions#view-transition-types)를 구성하기 위해 `ViewTransitionPageOptions` 객체를 전달할 수도 있습니다:
    - `enabled`: `boolean | 'always'` - 전환을 활성화/비활성화합니다
    - `types`: `string[] | (to, from) => string[]` - 이 페이지가 포함된 모든 전환에 적용되는 타입입니다
    - `toTypes`: `string[] | (to, from) => string[]` - 이 페이지로 **이동할 때만** 적용되는 타입입니다
    - `fromTypes`: `string[] | (to, from) => string[]` - 이 페이지에서 **이동할 때만** 적용되는 타입입니다

  **`redirect`**

  - **Type**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias)

    라우트가 직접 매칭되었을 때 어디로 리디렉션할지 지정합니다. 리디렉션은 모든 navigation guard보다 먼저 일어나며, 새로운 대상 위치로 새 내비게이션을 트리거합니다.

  **`validate`**

  - **Type**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    주어진 라우트가 이 페이지로 유효하게 렌더링될 수 있는지 검증합니다. 유효하면 true를, 그렇지 않으면 false를 반환합니다. 다른 매치를 찾을 수 없다면 404가 됩니다. `status`/`statusText`가 있는 객체를 직접 반환해 즉시 오류 응답을 보낼 수도 있습니다(다른 매치는 검사하지 않음).

  **`scrollToTop`**

  - **Type**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    페이지를 렌더링하기 전에 Nuxt가 맨 위로 스크롤할지 여부를 알려줍니다. Nuxt의 기본 스크롤 동작을 덮어쓰고 싶다면 `~/router.options.ts`에서 설정할 수 있습니다(자세한 내용은 [custom routing](/docs/4.x/guide/recipes/custom-routing#using-routeroptions) 참고).

  **`[key: string]`**

  - **Type**: `any`

    위 속성들 외에도 **커스텀** 메타데이터를 설정할 수 있습니다. 이를 타입 안전하게 하고 싶다면 [`meta` 객체의 타입을 확장](/docs/4.x/directory-structure/app/pages/#typing-custom-metadata)할 수 있습니다.

## 예제 %{#examples}%

### 기본 사용법 %{#basic-usage}%

아래 예제는 다음을 보여줍니다:

- `key`가 값을 반환하는 함수가 될 수 있다는 점
- `keepalive` 속성이 여러 컴포넌트 사이를 전환할 때 `<modal>` 컴포넌트가 캐시되지 않도록 보장하는 방법
- 커스텀 속성으로 `pageType`을 추가하는 방법

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

### 미들웨어 정의하기 %{#defining-middleware}%

아래 예제는 `definePageMeta` 안에서 미들웨어를 직접 `function`으로 정의하거나, `app/middleware/` 디렉터리에 있는 미들웨어 파일 이름과 일치하는 `string`으로 설정하는 방법을 보여줍니다:

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

### 커스텀 정규 표현식 사용하기 %{#using-a-custom-regular-expression}%

커스텀 정규 표현식은 겹치는 라우트 사이의 충돌을 해결하는 좋은 방법입니다. 예를 들어:

두 라우트 "/test-category"와 "/1234-post"는 모두 `[postId]-[postSlug].vue`와 `[categorySlug].vue` 페이지 라우트에 매칭됩니다.

`[postId]-[postSlug]` 라우트에서 `postId`가 숫자(`\d+`)에만 매칭되도록 하려면 `[postId]-[postSlug].vue` 페이지 템플릿에 다음을 추가할 수 있습니다:

```vue [app/pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug',
})
</script>
```

더 많은 예제는 [Vue Router의 Matching Syntax](https://router.vuejs.org/guide/essentials/route-matching-syntax)를 참고하세요.

### 레이아웃 정의하기 %{#defining-layout}%

레이아웃 파일 이름과 일치하는 레이아웃을 정의할 수 있습니다(기본 위치는 [`app/layouts/` 디렉터리](/docs/4.x/directory-structure/app/layouts)). `layout`을 `false`로 설정해 레이아웃을 비활성화할 수도 있습니다:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // 커스텀 레이아웃 설정
  layout: 'admin',

  // ... 또는 기본 레이아웃 비활성화
  layout: false,
})
</script>
```

### 레이아웃에 Props 전달하기 %{#passing-props-to-a-layout}%

`layout`에 객체 문법을 사용하면 레이아웃에 props를 전달할 수 있습니다. 레이아웃이 `defineProps`로 props를 정의했다면 props는 완전히 타입이 지정됩니다.

::code-group

```vue [app/pages/dashboard.vue]
<script setup lang="ts">
definePageMeta({
  layout: {
    name: 'panel',
    props: {
      sidebar: true,
      title: 'Dashboard',
    },
  },
})
</script>
```

```vue [app/layouts/panel.vue]
<script setup lang="ts">
const props = defineProps<{
  sidebar?: boolean
  title?: string
}>()
</script>

<template>
  <div>
    <aside v-if="sidebar">
      Sidebar
    </aside>
    <main>
      <h1>{{ title }}</h1>
      <slot />
    </main>
  </div>
</template>
```

::

::tip
`definePageMeta`로 설정한 레이아웃 props는 레이아웃의 `defineProps`를 기준으로 완전히 타입이 지정됩니다. 에디터에서 자동완성과 타입 검사를 받을 수 있습니다.
::

:read-more{to="/docs/4.x/directory-structure/app/layouts#passing-props-to-layouts"}
