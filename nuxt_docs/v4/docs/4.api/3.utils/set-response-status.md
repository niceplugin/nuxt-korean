---
title: 'setResponseStatus'
description: setResponseStatus는 응답의 status와 statusText(선택 사항)를 설정합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Nuxt는 일급 서버 사이드 렌더링 지원을 위한 컴포저블과 유틸리티를 제공합니다.

`setResponseStatus`는 응답의 status와 statusText(선택 사항)를 설정합니다.

::important
`setResponseStatus`는 [Nuxt context](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 안에서만 호출할 수 있습니다.
::

```ts
const event = useRequestEvent()

// 브라우저에서는 event가 undefined입니다
if (event) {
  // 사용자 정의 404 페이지를 위해 상태 코드를 404로 설정
  setResponseStatus(event, 404)

  // 상태 메시지도 함께 설정
  setResponseStatus(event, 404, 'Page Not Found')
}
```

::note
브라우저에서 `setResponseStatus`는 아무 효과가 없습니다.
::

:read-more{to="/docs/4.x/getting-started/error-handling"}
