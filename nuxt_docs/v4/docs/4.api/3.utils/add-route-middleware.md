---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware()는 애플리케이션에서 미들웨어를 동적으로 추가하기 위한 헬퍼 함수입니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
라우트 미들웨어는 Nuxt 애플리케이션의 [`app/middleware/`](/docs/4.x/directory-structure/app/middleware) 디렉터리에 저장된 내비게이션 가드입니다 ([다르게 설정](/docs/4.x/api/nuxt-config#middleware)하지 않은 경우).
::

## Type %{type}%

```ts
function addRouteMiddleware (name: string, middleware: RouteMiddleware, options?: AddRouteMiddlewareOptions): void
function addRouteMiddleware (middleware: RouteMiddleware): void

interface AddRouteMiddlewareOptions {
  global?: boolean
}
```

## Parameters %{parameters}%

### `name` %{name}%

- **Type:** `string` | `RouteMiddleware`

`RouteMiddleware` 타입의 함수 또는 문자열일 수 있습니다. 함수는 다음 라우트인 `to`를 첫 번째 인자로, 현재 라우트인 `from`을 두 번째 인자로 받으며, 둘 다 Vue 라우트 객체입니다.

[라우트 객체](/docs/4.x/api/composables/use-route)의 사용 가능한 속성에 대해 더 알아보세요.

### `middleware` %{middleware}%

- **Type:** `RouteMiddleware`

두 번째 인자는 `RouteMiddleware` 타입의 함수입니다. 위와 마찬가지로 `to`와 `from` 라우트 객체를 제공합니다. `addRouteMiddleware()`의 첫 번째 인자가 이미 함수로 전달된 경우에는 선택 사항이 됩니다.

### `options` %{options}%

- **Type:** `AddRouteMiddlewareOptions`

선택적인 `options` 인자를 사용하면 `global` 값을 `true`로 설정하여 라우터 미들웨어가 전역인지 여부를 지정할 수 있습니다(기본값은 `false`로 설정됨).

## Examples %{examples}%

### Named Route Middleware %{named-route-middleware}%

이름이 있는 라우트 미들웨어는 첫 번째 인자로 문자열을, 두 번째 인자로 함수를 제공하여 정의합니다:

```ts [app/plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('Nuxt 플러그인에서 추가된 이름 있는 미들웨어')
  })
})
```

플러그인에서 정의되면, `app/middleware/` 디렉터리에 있는 동일한 이름의 기존 미들웨어를 덮어씁니다.

### Global Route Middleware %{global-route-middleware}%

전역 라우트 미들웨어는 두 가지 방식으로 정의할 수 있습니다:

- 이름 없이 함수를 첫 번째 인자로 직접 전달합니다. 이 경우 자동으로 전역 미들웨어로 처리되며, 모든 라우트 변경 시 적용됩니다.

  ```ts [app/plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('모든 라우트 변경 시 실행되는 익명 전역 미들웨어')
    })
  })
  ```

- 선택적인 세 번째 인자로 `{ global: true }`를 설정하여 라우트 미들웨어가 전역인지 여부를 나타냅니다.

  ```ts [app/plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
      console.log('모든 라우트 변경 시 실행되는 전역 미들웨어')
    },
    { global: true },
    )
  })
  ```
