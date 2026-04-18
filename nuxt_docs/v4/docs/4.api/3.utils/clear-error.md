---
title: "clearError"
description: "clearError 컴포저블은 처리된 모든 에러를 지웁니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

페이지, 컴포넌트, 플러그인 안에서 `clearError`를 사용해 모든 에러를 지우고 사용자를 리디렉션할 수 있습니다.

**매개변수:**

- `options?: { redirect?: string }`

리디렉션할 선택적 경로를 제공할 수 있습니다(예를 들어 '안전한' 페이지로 이동하고 싶을 때).

```ts
// 리디렉션 없이
clearError()

// 리디렉션과 함께
clearError({ redirect: '/homepage' })
```

에러는 [`useError()`](/docs/4.x/api/composables/use-error)를 사용해 state에 설정됩니다. `clearError` 컴포저블은 이 state를 초기화하고 제공된 옵션으로 `app:error:cleared` 훅을 호출합니다.

:read-more{to="/docs/4.x/getting-started/error-handling"}
