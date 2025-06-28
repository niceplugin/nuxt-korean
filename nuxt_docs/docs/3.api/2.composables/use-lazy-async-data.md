---
title: useLazyAsyncData
description: 이 useAsyncData의 래퍼는 내비게이션을 즉시 트리거합니다.
links:
  - label: 소스
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

## [설명](#description)

기본적으로, [`useAsyncData`](/docs/api/composables/use-async-data)는 비동기 핸들러가 해결될 때까지 내비게이션을 차단합니다. `useLazyAsyncData`는 [`useAsyncData`](/docs/api/composables/use-async-data)의 래퍼로, `lazy` 옵션을 `true`로 설정하여 핸들러가 해결되기 전에 내비게이션을 트리거합니다.

::note
`useLazyAsyncData`는 [`useAsyncData`](/docs/api/composables/use-async-data)와 동일한 시그니처를 가집니다.
::

:read-more{to="/docs/api/composables/use-async-data"}

## [예시](#example)

```vue [pages/index.vue]
<script setup lang="ts">
/* 데이터를 가져오기 완료되기 전에 내비게이션이 발생합니다.
  컴포넌트의 템플릿 내에서 'pending' 및 'error' 상태를 직접 처리하세요.
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // count가 처음에는 null일 수 있으므로,
  // 즉시 그 내용을 사용할 수는 없지만, 감시할 수 있습니다.
})
</script>

<template>
  <div>
    {{ status === 'pending' ? '로딩 중' : count }}
  </div>
</template>
```

::warning
`useLazyAsyncData`는 컴파일러에 의해 변환되는 예약된 함수명이므로, 직접 `useLazyAsyncData`라는 이름으로 함수를 만들지 마세요.
::

:read-more{to="/docs/getting-started/data-fetching"}
