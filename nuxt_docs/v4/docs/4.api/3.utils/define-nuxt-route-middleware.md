---
title: "defineNuxtRouteMiddleware"
description: "defineNuxtRouteMiddleware 헬퍼 함수를 사용해 이름이 있는 라우트 미들웨어를 생성합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

라우트 미들웨어는 Nuxt 애플리케이션의 [`app/middleware/`](/docs/4.x/directory-structure/app/middleware) 디렉터리에 저장됩니다 ([다르게 설정](/docs/4.x/api/nuxt-config#middleware)하지 않은 경우).

## Type %{type}%

```ts [Signature]
export function defineNuxtRouteMiddleware (middleware: RouteMiddleware): RouteMiddleware

interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}
```

## Parameters %{parameters}%

### `middleware` %{middleware}%

- **Type**: `RouteMiddleware`

두 개의 Vue Router 라우트 위치 객체를 매개변수로 받는 함수입니다. 첫 번째는 다음 라우트인 `to`, 두 번째는 현재 라우트인 `from`입니다.

`RouteLocationNormalized`에서 사용 가능한 속성에 대해 더 알아보려면 **[Vue Router 문서](https://router.vuejs.org/api/type-aliases/routelocationnormalized)**를 참고하세요.

## Examples %{examples}%

### 오류 페이지 표시 %{showing-error-page}%

라우트 미들웨어를 사용해 오류를 발생시키고, 도움이 되는 오류 메시지를 표시할 수 있습니다:

```ts [app/middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})
```

위의 라우트 미들웨어는 사용자를 `~/error.vue` 파일에 정의된 커스텀 오류 페이지로 리디렉션하고, 미들웨어에서 전달된 오류 메시지와 코드를 노출합니다.

### 리디렉션 %{redirection}%

라우트 미들웨어 내부에서 `navigateTo` 헬퍼 함수와 [`useState`](/docs/4.x/api/composables/use-state)를 함께 사용하여, 사용자의 인증 상태에 따라 다른 라우트로 리디렉션할 수 있습니다:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useState('auth')

  if (!auth.value.isAuthenticated) {
    return navigateTo('/login')
  }

  if (to.path !== '/dashboard') {
    return navigateTo('/dashboard')
  }
})
```

[navigateTo](/docs/4.x/api/utils/navigate-to)와 [abortNavigation](/docs/4.x/api/utils/abort-navigation)은 모두 전역적으로 사용 가능한 헬퍼 함수이며, `defineNuxtRouteMiddleware` 내부에서 사용할 수 있습니다.
