---
title: 'useLazyFetch'
description: useFetch의 래퍼로, 내비게이션을 즉시 트리거합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

## [설명](#description)

기본적으로, [`useFetch`](/docs/api/composables/use-fetch)는 비동기 핸들러가 해결될 때까지 내비게이션을 차단합니다. `useLazyFetch`는 [`useFetch`](/docs/api/composables/use-fetch)의 래퍼로, `lazy` 옵션을 `true`로 설정하여 핸들러가 해결되기 전에 내비게이션을 트리거합니다.

::note
`useLazyFetch`는 [`useFetch`](/docs/api/composables/use-fetch)와 동일한 시그니처를 가집니다.
::

::note
이 모드에서 `useLazyFetch`를 await하면 호출이 초기화됨만을 보장합니다. 클라이언트 사이드 내비게이션 시 데이터가 즉시 사용 가능하지 않을 수 있으므로, 앱에서 pending 상태를 반드시 처리해야 합니다.
::

:read-more{to="/docs/api/composables/use-fetch"}

## [예시](#example)

```vue [pages/index.vue]
<script setup lang="ts">
/* 내비게이션이 데이터 패칭이 완료되기 전에 발생합니다.
 * 컴포넌트의 템플릿에서 'pending' 및 'error' 상태를 직접 처리하세요.
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // posts가 처음에는 null일 수 있으므로,
  // 즉시 그 내용을 사용할 수는 없지만, 감시할 수 있습니다.
})
</script>

<template>
  <div v-if="status === 'pending'">
    로딩 중 ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- 무언가를 처리 -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch`는 컴파일러에 의해 변환되는 예약된 함수명이므로, 직접 `useLazyFetch`라는 이름으로 함수를 정의하지 마세요.
::

:read-more{to="/docs/getting-started/data-fetching"}
