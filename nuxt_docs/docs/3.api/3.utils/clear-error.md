---
title: "clearError"
description: "clearError 컴포저블은 처리된 모든 에러를 초기화합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

페이지, 컴포넌트, 플러그인 내에서 `clearError`를 사용하여 모든 에러를 초기화하고 사용자를 리디렉션할 수 있습니다.

**파라미터:**

- `options?: { redirect?: string }`

선택적으로 리디렉션할 경로를 지정할 수 있습니다(예: '안전한' 페이지로 이동하고 싶은 경우).

```js
// 리디렉션 없이
clearError()

// 리디렉션과 함께
clearError({ redirect: '/homepage' })
```

에러는 [`useError()`](/docs/api/composables/use-error)를 사용하여 상태에 설정됩니다. `clearError` 컴포저블은 이 상태를 초기화하고, 제공된 옵션과 함께 `app:error:cleared` 훅을 호출합니다.

:read-more{to="/docs/getting-started/error-handling"}
