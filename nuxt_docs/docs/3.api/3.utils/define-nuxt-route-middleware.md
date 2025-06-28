---
title: "defineNuxtRouteMiddleware"
description: "defineNuxtRouteMiddleware 헬퍼 함수를 사용하여 이름이 지정된 라우트 미들웨어를 생성합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

라우트 미들웨어는 Nuxt 애플리케이션의 [`middleware/`](/docs/guide/directory-structure/middleware) 디렉토리에 저장됩니다 ([별도로 설정하지 않은 경우](/docs/api/nuxt-config#middleware)).

## [타입](#type)

```ts
defineNuxtRouteMiddleware(middleware: RouteMiddleware) => RouteMiddleware

interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}
```

## [파라미터](#parameters)

### [`middleware`](#middleware)

- **타입**: `RouteMiddleware`

두 개의 Vue Router 라우트 위치 객체를 파라미터로 받는 함수입니다. 첫 번째는 다음 라우트인 `to`, 두 번째는 현재 라우트인 `from`입니다.

`RouteLocationNormalized`의 사용 가능한 속성에 대해 더 알아보려면 **[Vue Router 문서](https://router.vuejs.org/api/#RouteLocationNormalized)**를 참고하세요.

## [예시](#examples)

### [에러 페이지 표시](#showing-error-page)

라우트 미들웨어를 사용하여 에러를 발생시키고 유용한 에러 메시지를 표시할 수 있습니다:

```ts [middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})
```

위의 라우트 미들웨어는 사용자를 `~/error.vue` 파일에 정의된 커스텀 에러 페이지로 리디렉션하며, 미들웨어에서 전달된 에러 메시지와 코드를 노출합니다.

### [리디렉션](#redirection)

라우트 미들웨어 내에서 [`useState`](/docs/api/composables/use-state)와 `navigateTo` 헬퍼 함수를 조합하여 인증 상태에 따라 사용자를 다른 라우트로 리디렉션할 수 있습니다:

```ts [middleware/auth.ts]
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

[navigateTo](/docs/api/utils/navigate-to)와 [abortNavigation](/docs/api/utils/abort-navigation)는 모두 `defineNuxtRouteMiddleware` 내에서 사용할 수 있는 전역 헬퍼 함수입니다.
