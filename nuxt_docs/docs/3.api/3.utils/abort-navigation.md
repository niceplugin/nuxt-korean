---
title: 'abortNavigation'
description: 'abortNavigation은 네비게이션이 진행되지 않도록 방지하고, 파라미터로 에러가 설정된 경우 해당 에러를 발생시키는 헬퍼 함수입니다.'
links:
  - label: 소스
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::warning
`abortNavigation`은 [라우트 미들웨어 핸들러](/docs/guide/directory-structure/middleware) 내부에서만 사용할 수 있습니다.
::

## [타입](#type)

```ts
abortNavigation(err?: Error | string): false
```

## [파라미터](#parameters)

### [`err`](#err)

- **타입**: [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error) | `string`

  `abortNavigation`에 의해 발생될 선택적 에러입니다.

## [예시](#examples)

아래 예시는 라우트 미들웨어에서 `abortNavigation`을 사용하여 권한이 없는 라우트 접근을 방지하는 방법을 보여줍니다:

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation()
  }

  if (to.path !== '/edit-post') {
    return navigateTo('/edit-post')
  }
})
```

### [`err`를 문자열로 전달](#err-as-a-string)

에러를 문자열로 전달할 수 있습니다:

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation('권한이 부족합니다.')
  }
})
```

### [`err`를 Error 객체로 전달](#err-as-an-error-object)

에러를 [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error) 객체로 전달할 수 있습니다. 예를 들어 `catch` 블록에서 잡은 에러를 전달할 수 있습니다:

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  try {
    /* 에러가 발생할 수 있는 코드 */
  } catch (err) {
    return abortNavigation(err)
  }
})
```
