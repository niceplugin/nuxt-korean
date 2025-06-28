---
title: "useError"
description: useError 컴포저블은 처리 중인 전역 Nuxt 오류를 반환합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

이 컴포저블은 처리 중인 전역 Nuxt 오류를 반환하며, 클라이언트와 서버 모두에서 사용할 수 있습니다.

```ts
const error = useError()
```

`useError`는 상태에 오류를 설정하고, 컴포넌트 전반에 걸쳐 반응형이면서 SSR에 친화적인 전역 Nuxt 오류를 생성합니다.

Nuxt 오류는 다음과 같은 속성을 가집니다:

```ts
interface {
  //  HTTP 응답 상태 코드
  statusCode: number
  // HTTP 응답 상태 메시지
  statusMessage: string
  // 오류 메시지
  message: string
}
```

:read-more{to="/docs/getting-started/error-handling"}
