---
title: "navigateTo"
description: navigateTo는 사용자를 프로그래밍적으로 이동시키는 헬퍼 함수입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

## [사용법](#usage)

`navigateTo`는 서버 사이드와 클라이언트 사이드 모두에서 사용할 수 있습니다. [Nuxt 컨텍스트](/docs/guide/going-further/nuxt-app#the-nuxt-context) 내에서 또는 직접 페이지 이동을 수행하는 데 사용할 수 있습니다.

::warning
`navigateTo`를 호출할 때 항상 그 결과에 `await` 또는 `return`을 사용해야 합니다.
::

::note
`navigateTo`는 Nitro 라우트 내에서 사용할 수 없습니다. Nitro 라우트에서 서버 사이드 리디렉션을 수행하려면 [`sendRedirect`](https://h3.dev/utils/response#sendredirectevent-location-code)를 대신 사용하세요.
::

### [Vue 컴포넌트 내에서](#within-a-vue-component)

```vue
<script setup lang="ts">
// 'to'를 문자열로 전달
await navigateTo('/search')

// ... 또는 라우트 객체로 전달
await navigateTo({ path: '/search' })

// ... 또는 쿼리 파라미터가 포함된 라우트 객체로 전달
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc'
  }
})
</script>
```

### [라우트 미들웨어 내에서](#within-route-middleware)

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // 리디렉션 코드를 '301 Moved Permanently'로 설정
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

라우트 미들웨어 내에서 `navigateTo`를 사용할 때는 **그 결과를 반드시 반환(return)해야** 미들웨어 실행 흐름이 올바르게 동작합니다.

예를 들어, 다음 구현은 **예상대로 동작하지 않습니다**:

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ 이것은 예상대로 동작하지 않습니다
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

이 경우, `navigateTo`는 실행되지만 반환되지 않아 예기치 않은 동작이 발생할 수 있습니다.

:read-more{to="/docs/guide/directory-structure/middleware"}

### [외부 URL로 이동하기](#navigating-to-an-external-url)

`navigateTo`의 `external` 파라미터는 URL로 이동하는 방식을 제어합니다:

- **`external: true` 없이**:
  - 내부 URL은 정상적으로 이동합니다.
  - 외부 URL은 에러를 발생시킵니다.

- **`external: true`와 함께**:
  - 내부 URL은 전체 페이지 새로고침으로 이동합니다.
  - 외부 URL은 정상적으로 이동합니다.

#### [예시](#example)

```vue
<script setup lang="ts">
// 에러가 발생합니다;
// 기본적으로 외부 URL로 이동하는 것은 허용되지 않습니다
await navigateTo('https://nuxt.com')

// 'external' 파라미터를 'true'로 설정하면 정상적으로 리디렉션됩니다
await navigateTo('https://nuxt.com', {
  external: true
})
</script>
```

### [새 탭에서 페이지 열기](#opening-a-page-in-a-new-tab)

```vue
<script setup lang="ts">
// 'https://nuxt.com'을 새 탭에서 엽니다
await navigateTo('https://nuxt.com', {
  open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500
    }
  }
})
</script>
```

## [타입](#type)

```ts
function navigateTo(
  to: RouteLocationRaw | undefined | null,
  options?: NavigateToOptions
) => Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw 

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

## [파라미터](#parameters)

### [`to`](#to)

**타입**: [`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/RouteLocationOptions.html#Interface-RouteLocationOptions) | `undefined` | `null`

**기본값**: `'/'`

`to`는 리디렉션할 평문 문자열 또는 라우트 객체가 될 수 있습니다. `undefined` 또는 `null`로 전달되면 기본값은 `'/'`입니다.

#### [예시](#example)

```ts
// URL을 직접 전달하면 '/blog' 페이지로 리디렉션됩니다
await navigateTo('/blog')

// 라우트 객체를 사용하면 이름이 'blog'인 라우트로 리디렉션됩니다
await navigateTo({ name: 'blog' })

// 라우트 객체를 사용하여 파라미터(id = 1)를 전달하며 'product' 라우트로 리디렉션합니다.
await navigateTo({ name: 'product', params: { id: 1 } })
```

### [`options` (선택)](#options-optional)

**타입**: `NavigateToOptions`

다음 속성을 받을 수 있는 객체입니다:

- `replace`

  - **타입**: `boolean`
  - **기본값**: `false`
  - 기본적으로 `navigateTo`는 클라이언트 사이드에서 주어진 라우트를 Vue Router 인스턴스에 push합니다.

    이 동작은 `replace`를 `true`로 설정하여 주어진 라우트가 대체(replace)되도록 변경할 수 있습니다.

- `redirectCode`

  - **타입**: `number`
  - **기본값**: `302`

  - 서버 사이드에서 리디렉션이 발생할 때, `navigateTo`는 기본적으로 주어진 경로로 리디렉션하고 리디렉션 코드를 [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)로 설정합니다.

    이 기본 동작은 다른 `redirectCode`를 제공하여 수정할 수 있습니다. 일반적으로 영구 리디렉션에는 [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)를 사용할 수 있습니다.

- `external`

  - **타입**: `boolean`
  - **기본값**: `false`

  - `true`로 설정하면 외부 URL로 이동할 수 있습니다. 그렇지 않으면, `navigateTo`는 에러를 발생시키며, 기본적으로 외부 이동은 허용되지 않습니다.

- `open`

  - **타입**: `OpenOptions`
  - [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 메서드를 사용하여 URL로 이동할 수 있습니다. 이 옵션은 클라이언트 사이드에서만 적용되며, 서버 사이드에서는 무시됩니다.

    다음 속성을 받을 수 있는 객체입니다:

  - `target`

    - **타입**: `string`
    - **기본값**: `'_blank'`

    - 공백이 없는 문자열로, 리소스가 로드될 브라우징 컨텍스트의 이름을 지정합니다.

  - `windowFeatures`

    - **타입**: `OpenWindowFeatures`

    - 다음 속성을 받을 수 있는 객체입니다:

      | 속성 | 타입    | 설명 |
      |----------|---------|--------------|
      | `popup`  | `boolean` | 브라우저가 UI 기능을 결정하는 최소한의 팝업 창을 요청합니다. |
      | `width` 또는 `innerWidth`  | `number`  | 스크롤바를 포함한 콘텐츠 영역의 너비(최소 100픽셀)를 지정합니다. |
      | `height` 또는 `innerHeight` | `number`  | 스크롤바를 포함한 콘텐츠 영역의 높이(최소 100픽셀)를 지정합니다. |
      | `left` 또는 `screenX`   | `number`  | 새 창의 수평 위치를 화면의 왼쪽 가장자리 기준으로 설정합니다. |
      | `top` 또는 `screenY`   | `number`  | 새 창의 수직 위치를 화면의 위쪽 가장자리 기준으로 설정합니다. |
      | `noopener` | `boolean` | 새 창이 `window.opener`를 통해 원본 창에 접근하지 못하도록 방지합니다. |
      | `noreferrer` | `boolean` | Referer 헤더 전송을 방지하고, 암묵적으로 `noopener`를 활성화합니다. |

      **windowFeatures** 속성에 대한 자세한 정보는 [문서](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures)를 참고하세요.
