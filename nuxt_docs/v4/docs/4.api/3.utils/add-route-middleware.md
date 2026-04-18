---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware()는 애플리케이션에 미들웨어를 동적으로 추가하는 헬퍼 함수입니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
Route middleware는 Nuxt 애플리케이션의 [`app/middleware/`](/docs/4.x/directory-structure/app/middleware) 디렉터리에 저장되는 navigation guards입니다([별도로 설정하지 않는 한](/docs/4.x/api/nuxt-config#middleware)).
::

## 타입 %{#type}%

```ts
function addRouteMiddleware (name: string, middleware: RouteMiddleware, options?: AddRouteMiddlewareOptions): void
function addRouteMiddleware (middleware: RouteMiddleware): void

interface AddRouteMiddlewareOptions {
  global?: boolean
}
```

## 매개변수 %{#parameters}%

### `name` %{#name}%

- **Type:** `string` | `RouteMiddleware`

문자열이거나 `RouteMiddleware` 타입 함수일 수 있습니다. 함수는 첫 번째 인자로 다음 route인 `to`, 두 번째 인자로 현재 route인 `from`을 받으며 둘 다 Vue route 객체입니다.

[route objects](/docs/4.x/api/composables/use-route)에서 사용할 수 있는 속성을 더 알아보세요.

### `middleware` %{#middleware}%

- **Type:** `RouteMiddleware`

두 번째 인자는 `RouteMiddleware` 타입 함수입니다. 위와 마찬가지로 `to`와 `from` route 객체를 제공합니다. `addRouteMiddleware()`의 첫 번째 인자로 이미 함수가 전달된 경우에는 선택 사항이 됩니다.

### `options` %{#options}%

- **Type:** `AddRouteMiddlewareOptions`

선택적 `options` 인자를 사용하면 `global` 값을 `true`로 설정해 router middleware를 전역으로 적용할지 여부를 지정할 수 있습니다(기본값 `false`).

## 예제 %{#examples}%

### 이름 있는 Route Middleware %{#named-route-middleware}%

이름 있는 route middleware는 첫 번째 인자에 문자열, 두 번째 인자에 함수를 전달해 정의합니다:

```ts [app/plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('Nuxt plugin에 이름 있는 미들웨어가 추가되었습니다')
  })
})
```

plugin 안에서 정의하면 `app/middleware/` 디렉터리에 있는 같은 이름의 기존 middleware를 덮어씁니다.

### 전역 Route Middleware %{#global-route-middleware}%

전역 route middleware는 두 가지 방식으로 정의할 수 있습니다:

- 이름 없이 함수를 첫 번째 인자로 직접 전달합니다. 자동으로 전역 middleware로 처리되어 모든 route 변경에 적용됩니다.

  ```ts [app/plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('모든 route 변경에서 실행되는 익명 전역 미들웨어')
    })
  })
  ```

- 선택적인 세 번째 인자 `{ global: true }`를 설정해 route middleware가 전역인지 여부를 지정합니다.

  ```ts [app/plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
      console.log('모든 route 변경에서 실행되는 전역 미들웨어')
    },
    { global: true },
    )
  })
  ```
