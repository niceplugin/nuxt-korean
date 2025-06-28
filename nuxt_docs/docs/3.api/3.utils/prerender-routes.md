---
title: 'prerenderRoutes'
description: prerenderRoutes는 Nitro에게 추가 경로를 프리렌더링하도록 힌트를 제공합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

프리렌더링 시, 생성된 페이지의 HTML에 해당 URL이 나타나지 않더라도 Nitro에게 추가 경로를 프리렌더링하도록 힌트를 줄 수 있습니다.

::important
`prerenderRoutes`는 [Nuxt 컨텍스트](/docs/guide/going-further/nuxt-app#the-nuxt-context) 내에서만 호출할 수 있습니다.
::

::note
`prerenderRoutes`는 프리렌더링 중에 실행되어야 합니다. 프리렌더링되지 않은 동적 페이지/경로에서 `prerenderRoutes`를 사용할 경우, 실행되지 않습니다.
::

```js
const route = useRoute()

prerenderRoutes('/')
prerenderRoutes(['/', '/about'])
```

::note
브라우저에서 또는 프리렌더링 외부에서 호출될 경우, `prerenderRoutes`는 아무런 효과가 없습니다.
::

API 경로도 프리렌더링할 수 있으며, 이는 완전히 정적으로 생성된 사이트(SSG)에서 특히 유용합니다. 이렇게 하면 서버가 있는 것처럼 `$fetch`로 데이터를 가져올 수 있습니다!

```js
prerenderRoutes('/api/content/article/name-of-article')

// 앱의 다른 곳에서
const articleContent = await $fetch('/api/content/article/name-of-article', {
  responseType: 'json',
})
```

::warning
프로덕션 환경에서 프리렌더링된 API 경로는 배포하는 제공자에 따라 예상한 응답 헤더를 반환하지 않을 수 있습니다. 예를 들어, JSON 응답이 `application/octet-stream` 콘텐츠 타입으로 제공될 수 있습니다.
프리렌더링된 API 경로를 가져올 때는 항상 수동으로 `responseType`을 설정하세요.
::
