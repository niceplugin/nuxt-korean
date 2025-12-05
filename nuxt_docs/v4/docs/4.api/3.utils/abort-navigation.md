---
title: 'abortNavigation'
description: 'abortNavigation은 탐색이 수행되지 않도록 막고, 매개변수로 설정된 오류가 있다면 그 오류를 던지는 헬퍼 함수입니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::warning
`abortNavigation`은 [라우트 미들웨어 핸들러](/docs/4.x/directory-structure/app/middleware) 내부에서만 사용할 수 있습니다.
::

## Type %{type}%

```ts [Signature]
export function abortNavigation (err?: Error | string): false
```

## Parameters %{parameters}%

### `err` %{err}%

- **Type**: [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | `string`

  `abortNavigation`에 의해 던져질 선택적 오류입니다.

## Examples %{examples}%

아래 예시는 라우트 미들웨어에서 `abortNavigation`을 사용하여 권한이 없는 라우트 접근을 막는 방법을 보여줍니다:

```ts [app/middleware/auth.ts]
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

### 문자열로서의 `err` %{err-as-a-string}%

오류를 문자열로 전달할 수 있습니다:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation('Insufficient permissions.')
  }
})
```

### Error 객체로서의 `err` %{err-as-an-error-object}%

[`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) 객체(예: `catch` 블록에서 포착된 것)를 오류로 전달할 수 있습니다:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  try {
    /* 오류를 던질 수 있는 코드 */
  } catch (err) {
    return abortNavigation(err)
  }
})
```
