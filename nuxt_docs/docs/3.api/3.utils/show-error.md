---
title: 'showError'
description: Nuxt는 필요할 때 전체 화면 오류 페이지를 빠르고 간단하게 표시할 수 있는 방법을 제공합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

[Nuxt 컨텍스트](/docs/guide/going-further/nuxt-app#the-nuxt-context) 내에서 `showError`를 사용하여 오류를 표시할 수 있습니다.

**매개변수:**

- `error`: `string | Error | Partial<{ cause, data, message, name, stack, statusCode, statusMessage }>`

```ts
showError("😱 오, 오류가 발생했습니다.")
showError({
  statusCode: 404,
  statusMessage: "페이지를 찾을 수 없습니다"
})
```

이 오류는 [`useError()`](/docs/api/composables/use-error)를 사용하여 상태에 설정되며, 컴포넌트 간에 반응형이고 SSR에 친화적인 공유 오류 상태를 생성합니다.

::tip
`showError`는 `app:error` 훅을 호출합니다.
::

:read-more{to="/docs/getting-started/error-handling"}
