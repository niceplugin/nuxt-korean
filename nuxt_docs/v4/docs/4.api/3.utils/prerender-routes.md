---
title: 'prerenderRoutes'
description: prerenderRoutes는 Nitro에 추가 라우트를 prerender하도록 힌트를 줍니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

prerendering 시에는 생성된 페이지의 HTML에 URL이 나타나지 않더라도 Nitro에 추가 경로를 prerender하라고 힌트를 줄 수 있습니다.

::important
`prerenderRoutes`는 [Nuxt context](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) 안에서만 호출할 수 있습니다.
::

::note
`prerenderRoutes`는 prerendering 중에 실행되어야 합니다. prerender되지 않는 동적 페이지/라우트에서 `prerenderRoutes`를 사용하면 실행되지 않습니다.
::

```ts
const route = useRoute()

prerenderRoutes('/')
prerenderRoutes(['/', '/about'])
```

::note
브라우저에서 호출하거나 prerendering 외부에서 호출하면 `prerenderRoutes`는 아무 효과가 없습니다.
::

API 라우트도 prerender할 수 있는데, 이는 전체 정적 생성 사이트(SSG)에서 특히 유용합니다. 이 경우 사용 가능한 서버가 있는 것처럼 `$fetch`로 데이터를 가져올 수 있습니다!

```ts
prerenderRoutes('/api/content/article/name-of-article')

// 나중에 App 어딘가에서
const articleContent = await $fetch('/api/content/article/name-of-article', {
  responseType: 'json',
})
```

::warning
프로덕션의 prerender된 API 라우트는 배포하는 제공업체에 따라 예상한 응답 헤더를 반환하지 않을 수 있습니다. 예를 들어 JSON 응답이 `application/octet-stream` 콘텐츠 타입으로 제공될 수 있습니다.
prerender된 API 라우트를 가져올 때는 항상 `responseType`을 수동으로 설정하세요.
::
