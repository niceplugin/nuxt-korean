---
title: 'setResponseStatus'
description: setResponseStatus는 응답의 statusCode(및 선택적으로 statusMessage)를 설정합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Nuxt는 일류 서버 사이드 렌더링 지원을 위한 컴포저블과 유틸리티를 제공합니다.

`setResponseStatus`는 응답의 statusCode(및 선택적으로 statusMessage)를 설정합니다.

::important
`setResponseStatus`는 [Nuxt 컨텍스트](/docs/guide/going-further/nuxt-app#the-nuxt-context)에서만 호출할 수 있습니다.
::

```js
const event = useRequestEvent()

// event는 브라우저에서는 undefined입니다.
if (event) {
  // 커스텀 404 페이지를 위해 상태 코드를 404로 설정합니다.
  setResponseStatus(event, 404)

  // 상태 메시지도 함께 설정합니다.
  setResponseStatus(event, 404, 'Page Not Found')
}
```

::note
브라우저에서는 `setResponseStatus`가 아무런 효과가 없습니다.
::

:read-more{to="/docs/getting-started/error-handling"}
