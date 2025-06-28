---
title: 'useRequestEvent'
description: 'useRequestEvent 컴포저블로 들어오는 요청 이벤트에 접근하세요.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

[Nuxt 컨텍스트](/docs/guide/going-further/nuxt-app#the-nuxt-context) 내에서 `useRequestEvent`를 사용하여 들어오는 요청에 접근할 수 있습니다.

```ts
// 기본 요청 이벤트 가져오기
const event = useRequestEvent()

// URL 가져오기
const url = event?.path
```

::tip
브라우저에서는 `useRequestEvent`가 `undefined`를 반환합니다.
::
