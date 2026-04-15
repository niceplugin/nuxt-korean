---
title: "navigateTo"
description: navigateTo는 사용자를 프로그래밍 방식으로 이동시키는 helper 함수입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

## Usage %{#usage}%

`navigateTo`는 서버 사이드와 클라이언트 사이드 모두에서 사용할 수 있습니다. 페이지 이동을 수행하기 위해 [Nuxt context](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 안에서 또는 직접 사용할 수 있습니다.

::warning
호출할 때는 항상 `navigateTo`의 결과에 `await` 또는 `return`을 사용해야 합니다.
::

::note
`navigateTo`는 Nitro routes 안에서는 사용할 수 없습니다. Nitro routes에서 서버 사이드 리디렉션을 수행하려면 대신 [`sendRedirect`](https://h3.dev/utils/response#redirectlocation-status-statustext)를 사용하세요.
::

### Within a Vue Component %{#within-a-vue-component}%

```vue
<script setup lang="ts">
// 'to'를 문자열로 전달
await navigateTo('/search')

// ... 또는 라우트 객체로
await navigateTo({ path: '/search' })

// ... 또는 쿼리 파라미터가 있는 라우트 객체로
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc',
  },
})
</script>
```

### Within Route Middleware %{#within-route-middleware}%

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // 리디렉션 코드를 '301 Moved Permanently'로 설정
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

라우트 미들웨어 안에서 `navigateTo`를 사용할 때는 미들웨어 실행 흐름이 올바르게 동작하도록 **반드시 그 결과를 반환해야 합니다**.

예를 들어 다음 구현은 **예상대로 동작하지 않습니다**:

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ 이것은 예상대로 동작하지 않습니다
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

이 경우 `navigateTo`는 실행되지만 반환되지는 않으므로 예기치 않은 동작으로 이어질 수 있습니다.

:read-more{to="/docs/4.x/directory-structure/app/middleware"}

### 외부 URL로 이동 %{#navigating-to-an-external-url}%

`navigateTo`의 `external` 파라미터는 URL 이동 처리 방식에 영향을 줍니다:

- **`external: true` 없이**:
  - 내부 URL은 예상대로 이동합니다.
  - 외부 URL은 오류를 발생시킵니다.

- **`external: true` 사용 시**:
  - 내부 URL은 전체 페이지 새로고침과 함께 이동합니다.
  - 외부 URL은 예상대로 이동합니다.

#### Example %{#example}%

```vue
<script setup lang="ts">
// 오류를 발생시킵니다;
// 외부 URL로의 이동은 기본적으로 허용되지 않습니다
await navigateTo('https://nuxt.com')

// 'external' 파라미터를 'true'로 설정하면 성공적으로 리디렉션됩니다
await navigateTo('https://nuxt.com', {
  external: true,
})
</script>
```

### 새 탭에서 페이지 열기 %{#opening-a-page-in-a-new-tab}%

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

## Type %{#type}%

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

## Parameters %{#parameters}%

### `to` %{#to}%

**Type**: [`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/routelocationoptions) | `undefined` | `null`

**Default**: `'/'`

`to`는 일반 문자열일 수도 있고 리디렉션할 라우트 객체일 수도 있습니다. `undefined` 또는 `null`로 전달되면 기본값은 `'/'`가 됩니다.

#### Example %{#example}%

```ts
// URL을 직접 전달하면 '/blog' 페이지로 리디렉션됩니다
await navigateTo('/blog')

// 라우트 객체를 사용하면 이름이 'blog'인 라우트로 리디렉션됩니다
await navigateTo({ name: 'blog' })

// 라우트 객체를 사용해 파라미터(id = 1)를 전달하면서 'product' 라우트로 리디렉션합니다.
await navigateTo({ name: 'product', params: { id: 1 } })
```

### `options` (optional) %{#options-optional}%

**Type**: `NavigateToOptions`

다음 속성을 받는 객체입니다:

- `replace`

  - **Type**: `boolean`
  - **Default**: `false`
  - 기본적으로 `navigateTo`는 클라이언트 사이드에서 주어진 라우트를 Vue Router 인스턴스에 push합니다.

    주어진 라우트를 교체해야 함을 나타내도록 `replace`를 `true`로 설정하면 이 동작을 바꿀 수 있습니다.

- `redirectCode`

  - **Type**: `number`
  - **Default**: `302`

  - 서버 사이드에서 리디렉션이 일어날 때 `navigateTo`는 주어진 경로로 리디렉션하고 기본적으로 리디렉션 코드를 [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302)로 설정합니다.

    다른 `redirectCode`를 제공하면 이 기본 동작을 변경할 수 있습니다. 일반적으로 영구 리디렉션에는 [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/301)를 사용할 수 있습니다.

- `external`

  - **Type**: `boolean`
  - **Default**: `false`

  - `true`로 설정하면 외부 URL로 이동할 수 있습니다. 그렇지 않으면 외부 이동은 기본적으로 허용되지 않으므로 `navigateTo`가 오류를 발생시킵니다.

- `open`

  - **Type**: `OpenOptions`
  - window의 [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 메서드를 사용해 URL로 이동할 수 있게 합니다. 이 옵션은 클라이언트 사이드에서만 적용되며 서버 사이드에서는 무시됩니다.

    다음 속성을 받는 객체입니다:

  - `target`

    - **Type**: `string`
    - **Default**: `'_blank'`

    - 공백이 없는 문자열로, 리소스가 로드될 브라우징 컨텍스트의 이름을 지정합니다.

  - `windowFeatures`

    - **Type**: `OpenWindowFeatures`

    - 다음 속성을 받는 객체입니다:

      | 속성                      | 타입      | 설명                                                                                           |
|---------------------------|-----------|------------------------------------------------------------------------------------------------|
| `popup`                   | `boolean` | 새 탭 대신 최소한의 팝업 창을 요청하며, UI 기능은 브라우저가 결정합니다.                        |
| `width` or `innerWidth`   | `number`  | 스크롤바를 포함한 콘텐츠 영역의 너비를 지정합니다(최소 100픽셀).                               |
| `height` or `innerHeight` | `number`  | 스크롤바를 포함한 콘텐츠 영역의 높이를 지정합니다(최소 100픽셀).                               |
| `left` or `screenX`       | `number`  | 화면 왼쪽 가장자리를 기준으로 새 창의 가로 위치를 설정합니다.                                  |
| `top` or `screenY`        | `number`  | 화면 위쪽 가장자리를 기준으로 새 창의 세로 위치를 설정합니다.                                  |
| `noopener`                | `boolean` | 새 창이 `window.opener`를 통해 원래 창에 접근하지 못하게 합니다.                               |
| `noreferrer`              | `boolean` | Referer 헤더가 전송되지 않도록 하며 암묵적으로 `noopener`를 활성화합니다.                      |

      **windowFeatures** 속성에 대한 자세한 내용은 [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures)을 참고하세요.
