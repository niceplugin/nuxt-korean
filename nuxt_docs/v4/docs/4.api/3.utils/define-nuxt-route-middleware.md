---
title: "defineNuxtRouteMiddleware"
description: "defineNuxtRouteMiddleware 헬퍼 함수를 사용해 이름 있는 route middleware를 생성합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

Route middleware는 Nuxt 애플리케이션의 [`app/middleware/`](/docs/4.x/directory-structure/app/middleware)에 저장됩니다([별도로 설정하지 않는 한](/docs/4.x/api/nuxt-config#middleware)).

## 타입 %{#type}%

```ts [Signature]
export function defineNuxtRouteMiddleware (middleware: RouteMiddleware): RouteMiddleware

interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}
```

## 매개변수 %{#parameters}%

### `middleware` %{#middleware}%

- **Type**: `RouteMiddleware`

Vue Router의 route location 객체 두 개를 매개변수로 받는 함수입니다. 첫 번째는 다음 route인 `to`, 두 번째는 현재 route인 `from`입니다.

`RouteLocationNormalized`에서 사용할 수 있는 속성은 **[Vue Router 문서](https://router.vuejs.org/api/type-aliases/routelocationnormalized)**에서 더 알아보세요.

## 예제 %{#examples}%

### 오류 페이지 표시 %{#showing-error-page}%

route middleware를 사용해 오류를 발생시키고 도움이 되는 오류 메시지를 표시할 수 있습니다:

```ts [app/middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ status: 404, statusText: '페이지를 찾을 수 없음' })
  }
})
```

위 route middleware는 사용자를 `~/error.vue` 파일에 정의된 커스텀 오류 페이지로 리디렉션하고, middleware에서 전달한 오류 메시지와 코드를 노출합니다.

### 리디렉션 %{#redirection}%

route middleware 안에서 [`useState`](/docs/4.x/api/composables/use-state)를 `navigateTo` 헬퍼 함수와 함께 사용하면 인증 상태에 따라 사용자를 다른 route로 리디렉션할 수 있습니다:

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

[navigateTo](/docs/4.x/api/utils/navigate-to)와 [abortNavigation](/docs/4.x/api/utils/abort-navigation)은 모두 `defineNuxtRouteMiddleware` 안에서 사용할 수 있는 전역 헬퍼 함수입니다.
