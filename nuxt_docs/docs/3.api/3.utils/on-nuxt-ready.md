---
title: "onNuxtReady"
description: onNuxtReady 컴포저블은 앱이 초기화를 마친 후 콜백을 실행할 수 있게 해줍니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ready.ts
    size: xs
---

::important
`onNuxtReady`는 클라이언트 사이드에서만 실행됩니다. :br
앱의 초기 렌더링을 방해하지 않아야 하는 코드를 실행하기에 이상적입니다.
::

```ts [plugins/ready.client.ts]
export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    const myAnalyticsLibrary = await import('my-big-analytics-library')
    // myAnalyticsLibrary로 무언가를 수행합니다
  })
})
```

앱이 이미 초기화된 후에도 '안전하게' 실행할 수 있습니다. 이 경우, 코드는 다음 idle 콜백에서 실행되도록 등록됩니다.
