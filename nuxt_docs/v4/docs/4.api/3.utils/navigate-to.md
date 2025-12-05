---
title: "navigateTo"
description: navigateTo는 프로그래밍 방식으로 사용자를 이동시키는 헬퍼 함수입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

## Usage %{usage}%

`navigateTo`는 서버 사이드와 클라이언트 사이드 모두에서 사용할 수 있습니다. [Nuxt 컨텍스트](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 안에서 또는 직접 호출하여 페이지 네비게이션을 수행할 수 있습니다.

::warning
`navigateTo`를 호출할 때는 항상 그 결과에 `await`를 사용하거나 `return`하도록 하세요.
::

::note
`navigateTo`는 Nitro 라우트 안에서는 사용할 수 없습니다. Nitro 라우트에서 서버 사이드 리다이렉트를 수행하려면 대신 [`sendRedirect`](https://h3.dev/utils/response#redirectlocation-status-statustext)를 사용하세요.
::

### Within a Vue Component %{within-a-vue-component}%

```vue
<script setup lang="ts">
// 'to'를 문자열로 전달
await navigateTo('/search')

// ... 또는 라우트 객체로 전달
await navigateTo({ path: '/search' })

// ... 또는 쿼리 파라미터가 있는 라우트 객체로 전달
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc',
  },
})
</script>
```

### Within Route Middleware %{within-route-middleware}%

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // 리다이렉트 코드를 '301 Moved Permanently'로 설정
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

라우트 미들웨어 안에서 `navigateTo`를 사용할 때는, 미들웨어 실행 흐름이 올바르게 동작하도록 **반드시 그 결과를 반환(return)** 해야 합니다.

예를 들어, 아래 구현은 **기대한 대로 동작하지 않습니다**:

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ 이는 기대한 대로 동작하지 않습니다
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

이 경우, `navigateTo`는 실행되지만 반환되지 않기 때문에 예기치 않은 동작을 유발할 수 있습니다.

:read-more{to="/docs/4.x/directory-structure/app/middleware"}

### Navigating to an External URL %{navigating-to-an-external-url}%

`navigateTo`의 `external` 파라미터는 URL로의 네비게이션이 어떻게 처리되는지에 영향을 줍니다:

- **`external: true` 없이**:
  - 내부 URL은 예상대로 이동합니다.
  - 외부 URL은 에러를 발생시킵니다.

- **`external: true`와 함께**:
  - 내부 URL은 전체 페이지 리로드와 함께 이동합니다.
  - 외부 URL은 예상대로 이동합니다.

#### Example %{example}%

```vue
<script setup lang="ts">
// 에러가 발생합니다;
// 기본적으로 외부 URL로의 네비게이션은 허용되지 않습니다
await navigateTo('https://nuxt.com')

// 'external' 파라미터를 'true'로 설정하면 성공적으로 리다이렉트됩니다
await navigateTo('https://nuxt.com', {
  external: true,
})
</script>
```

### Opening a Page in a New Tab %{opening-a-page-in-a-new-tab}%

```vue
<script setup lang="ts">
// 'https://nuxt.com'을 새 탭에서 엽니다
await navigateTo('https://nuxt.com', {
  open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500,
    },
  },
})
</script>
```

## Type %{type}%

```ts [Signature]
export function navigateTo (
  to: RouteLocationRaw | undefined | null,
  options?: NavigateToOptions,
): Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw

interface NavigateToOptions {
  replace?: boolean
  redirectCode?: number
  external?: boolean
  open?: OpenOptions
}

type OpenOptions = {
  target: string
  windowFeatures?: OpenWindowFeatures
}

type OpenWindowFeatures = {
  popup?: boolean
  noopener?: boolean
  noreferrer?: boolean
} & XOR<{ width?: number }, { innerWidth?: number }>
  & XOR<{ height?: number }, { innerHeight?: number }>
  & XOR<{ left?: number }, { screenX?: number }>
  & XOR<{ top?: number }, { screenY?: number }>
```

## Parameters %{parameters}%

### `to` %{to}%

**Type**: [`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/routelocationoptions) | `undefined` | `null`

**Default**: `'/'`

`to`는 리다이렉트할 평문 문자열이거나 라우트 객체가 될 수 있습니다. `undefined` 또는 `null`로 전달되면 기본값으로 `'/'`가 사용됩니다.

#### Example %{example}%

```ts
// URL을 직접 전달하면 '/blog' 페이지로 리다이렉트됩니다
await navigateTo('/blog')

// 라우트 객체를 사용하면 이름이 'blog'인 라우트로 리다이렉트됩니다
await navigateTo({ name: 'blog' })

// 라우트 객체를 사용하여 파라미터(id = 1)를 전달하면서 'product' 라우트로 리다이렉트합니다.
await navigateTo({ name: 'product', params: { id: 1 } })
```

### `options` (optional) %{options-optional}%

**Type**: `NavigateToOptions`

다음 속성을 받는 객체입니다:

- `replace`

  - **Type**: `boolean`
  - **Default**: `false`
  - 기본적으로 `navigateTo`는 클라이언트 사이드에서 주어진 라우트를 Vue Router 인스턴스에 push합니다.

    이 동작은 `replace`를 `true`로 설정하여, 주어진 라우트가 교체(replace)되어야 함을 나타내도록 변경할 수 있습니다.

- `redirectCode`

  - **Type**: `number`
  - **Default**: `302`

  - 서버 사이드에서 리다이렉션이 발생할 때, `navigateTo`는 기본적으로 주어진 경로로 리다이렉트하고 리다이렉트 코드를 [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302)로 설정합니다.

    이 기본 동작은 다른 `redirectCode`를 제공하여 수정할 수 있습니다. 일반적으로 영구적인 리다이렉션에는 [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/301)를 사용할 수 있습니다.

- `external`

  - **Type**: `boolean`
  - **Default**: `false`

  - `true`로 설정하면 외부 URL로의 네비게이션을 허용합니다. 그렇지 않으면, 기본적으로 외부 네비게이션이 허용되지 않기 때문에 `navigateTo`는 에러를 발생시킵니다.

- `open`

  - **Type**: `OpenOptions`
  - window의 [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 메서드를 사용하여 URL로 네비게이션할 수 있게 합니다. 이 옵션은 클라이언트 사이드에서만 적용되며 서버 사이드에서는 무시됩니다.

    다음 속성을 받는 객체입니다:

  - `target`

    - **Type**: `string`
    - **Default**: `'_blank'`

    - 리소스가 로드될 브라우징 컨텍스트의 이름을 공백 없이 지정하는 문자열입니다.

  - `windowFeatures`

    - **Type**: `OpenWindowFeatures`

    - 다음 속성을 받는 객체입니다:

      | Property | Type    | Description |
      |----------|---------|--------------|
      | `popup`  | `boolean` | 브라우저가 결정한 UI 기능을 가진 새 탭 대신 최소한의 팝업 창을 요청합니다. |
      | `width` or `innerWidth`  | `number`  | 스크롤바를 포함한 콘텐츠 영역의 너비(최소 100픽셀)를 지정합니다. |
      | `height` or `innerHeight` | `number`  | 스크롤바를 포함한 콘텐츠 영역의 높이(최소 100픽셀)를 지정합니다. |
      | `left` or `screenX`   | `number`  | 새 창의 수평 위치를 화면의 왼쪽 가장자리 기준으로 설정합니다. |
      | `top` or `screenY`   | `number`  | 새 창의 수직 위치를 화면의 위쪽 가장자리 기준으로 설정합니다. |
      | `noopener` | `boolean` | 새 창이 `window.opener`를 통해 원본 창에 접근하지 못하도록 방지합니다. |
      | `noreferrer` | `boolean` | Referer 헤더가 전송되지 않도록 방지하며, 암묵적으로 `noopener`를 활성화합니다. |

      **windowFeatures** 속성에 대한 더 자세한 정보는 [문서](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures)를 참고하세요.
