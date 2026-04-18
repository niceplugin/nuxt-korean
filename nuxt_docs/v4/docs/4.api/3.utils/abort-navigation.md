---
title: 'abortNavigation'
description: 'abortNavigation은 내비게이션이 진행되지 않도록 막고, 매개변수로 오류가 설정되면 이를 throw하는 헬퍼 함수입니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::warning
`abortNavigation`은 [route middleware handler](/docs/4.x/directory-structure/app/middleware) 안에서만 사용할 수 있습니다.
::

## 타입 %{#type}%

```ts [Signature]
export function abortNavigation (err?: Error | string): false
```

## 매개변수 %{#parameters}%

### `err` %{#err}%

- **Type**: [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | `string`

  `abortNavigation`이 throw할 선택적 오류입니다.

## 예제 %{#examples}%

아래 예제는 route middleware에서 `abortNavigation`을 사용해 권한 없는 route 접근을 막는 방법을 보여줍니다:

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

### 문자열로서의 `err` %{#err-as-a-string}%

오류를 문자열로 전달할 수 있습니다:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation('권한이 부족합니다.')
  }
})
```

### 오류 객체로서의 `err` %{#err-as-an-error-object}%

오류는 [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) 객체로도 전달할 수 있습니다. 예를 들어 `catch` 블록에서 잡은 오류를 전달할 수 있습니다:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  try {
    /* 오류를 throw할 수 있는 코드 */
  } catch (err) {
    return abortNavigation(err)
  }
})
```
