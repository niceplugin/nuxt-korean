---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware()는 애플리케이션에서 동적으로 미들웨어를 추가하는 헬퍼 함수입니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
라우트 미들웨어는 Nuxt 애플리케이션의 [`middleware/`](/docs/guide/directory-structure/middleware) 디렉터리에 저장된 내비게이션 가드입니다(별도로 [설정하지 않은 경우](/docs/api/nuxt-config#middleware)).
::

## [타입](#type)

```ts
function addRouteMiddleware (name: string, middleware: RouteMiddleware, options?: AddRouteMiddlewareOptions): void
function addRouteMiddleware (middleware: RouteMiddleware): void

interface AddRouteMiddlewareOptions {
  global?: boolean
}
```

## [파라미터](#parameters)

### [`name`](#name)

- **타입:** `string` | `RouteMiddleware`

문자열 또는 `RouteMiddleware` 타입의 함수가 될 수 있습니다. 함수는 다음 라우트인 `to`를 첫 번째 인자로, 현재 라우트인 `from`을 두 번째 인자로 받으며, 둘 다 Vue 라우트 객체입니다.

[라우트 객체](/docs/api/composables/use-route)의 사용 가능한 속성에 대해 더 알아보세요.

### [`middleware`](#middleware)

- **타입:** `RouteMiddleware`

두 번째 인자는 `RouteMiddleware` 타입의 함수입니다. 위와 동일하게 `to`와 `from` 라우트 객체를 제공합니다. `addRouteMiddleware()`의 첫 번째 인자가 이미 함수로 전달된 경우에는 선택 사항이 됩니다.

### [`options`](#options)

- **타입:** `AddRouteMiddlewareOptions`

선택적 `options` 인자를 사용하여 `global` 값을 `true`로 설정할 수 있으며, 라우터 미들웨어가 글로벌인지 여부를 나타냅니다(기본값은 `false`).

## [예시](#examples)

### [이름이 지정된 라우트 미들웨어](#named-route-middleware)

이름이 지정된 라우트 미들웨어는 첫 번째 인자로 문자열을, 두 번째 인자로 함수를 제공하여 정의합니다:

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('Nuxt 플러그인에서 추가된 이름이 지정된 미들웨어')
  })
})
```

플러그인에서 정의된 경우, `middleware/` 디렉터리에 동일한 이름으로 존재하는 기존 미들웨어를 덮어씁니다.

### [글로벌 라우트 미들웨어](#global-route-middleware)

글로벌 라우트 미들웨어는 두 가지 방법으로 정의할 수 있습니다:

- 이름 없이 함수를 첫 번째 인자로 직접 전달합니다. 자동으로 글로벌 미들웨어로 간주되어 모든 라우트 변경 시 적용됩니다.

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('모든 라우트 변경 시 실행되는 익명 글로벌 미들웨어')
    })
  })
  ```

- 선택적 세 번째 인자 `{ global: true }`를 설정하여 라우트 미들웨어가 글로벌인지 여부를 나타냅니다.

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
        console.log('모든 라우트 변경 시 실행되는 글로벌 미들웨어')
      },
      { global: true }
    )
  })
  ```
