---
title: 'showError'
description: Nuxt는 필요할 때 전체 화면 에러 페이지를 빠르고 간단하게 표시하는 방법을 제공합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

[Nuxt context](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 안에서 `showError`를 사용해 에러를 표시할 수 있습니다.

**매개변수:**

- `error`: `string | Error | Partial<{ cause, data, message, name, stack, status, statusText }>`

```ts
showError('😱 이런, 에러가 발생했습니다.')
showError({
  status: 404,
  statusText: 'Page Not Found',
})
```

에러는 [`useError()`](/docs/4.x/api/composables/use-error)를 사용해 state에 설정되며, 이를 통해 컴포넌트 전반에서 반응형이고 SSR 친화적인 공유 에러 state를 만듭니다.

::tip
`showError`는 `app:error` 훅을 호출합니다.
::

:read-more{to="/docs/4.x/getting-started/error-handling"}
