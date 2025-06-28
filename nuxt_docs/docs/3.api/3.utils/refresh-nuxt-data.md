---
title: 'refreshNuxtData'
description: Nuxt에서 모든 또는 특정 asyncData 인스턴스를 새로고침합니다
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`refreshNuxtData`는 [`useAsyncData`](/docs/api/composables/use-async-data), [`useLazyAsyncData`](/docs/api/composables/use-lazy-async-data), [`useFetch`](/docs/api/composables/use-fetch), [`useLazyFetch`](/docs/api/composables/use-lazy-fetch)에서 가져온 것을 포함하여 모든 또는 특정 `asyncData` 인스턴스를 다시 가져오는 데 사용됩니다.  

::note
컴포넌트가 `<KeepAlive>`에 의해 캐시되고 비활성화 상태에 들어가더라도, 컴포넌트가 언마운트될 때까지 컴포넌트 내부의 `asyncData`는 계속해서 다시 가져옵니다.
::

## [Type](#type)

```ts
refreshNuxtData(keys?: string | string[])
```

## [Parameters](#parameters)

* `keys`: 데이터를 가져오는 데 사용되는 `keys`로서, 하나의 문자열 또는 문자열 배열입니다. 이 매개변수는 **선택 사항**입니다. `keys`가 명시적으로 지정되지 않은 경우, 모든 [`useAsyncData`](/docs/api/composables/use-async-data) 및 [`useFetch`](/docs/api/composables/use-fetch) 키가 다시 가져와집니다.

## [Return Values](#return-values)

`refreshNuxtData`는 모든 또는 특정 `asyncData` 인스턴스가 새로고침되면 해결되는 프로미스를 반환합니다.

## [Examples](#examples)

### [모든 데이터 새로고침](#refresh-all-data)

아래 예시는 Nuxt 애플리케이션에서 `useAsyncData`와 `useFetch`를 사용하여 가져온 모든 데이터를 새로고침합니다.

```vue [pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refreshAll () {
  refreshing.value = true
  try {
    await refreshNuxtData()
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div>
    <button :disabled="refreshing" @click="refreshAll">
      모든 데이터 다시 가져오기
    </button>
  </div>
</template>
```

### [특정 데이터 새로고침](#refresh-specific-data)

아래 예시는 키가 `count`와 `user`에 일치하는 데이터만 새로고침합니다.

```vue [pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refresh () {
  refreshing.value = true
  try {
    // 여러 데이터를 새로고침하려면 키 배열을 전달할 수도 있습니다
    await refreshNuxtData(['count', 'user'])
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div v-if="refreshing">
    로딩 중
  </div>
  <button @click="refresh">새로고침</button>
</template>
```

::note
`asyncData` 인스턴스에 접근할 수 있다면, 데이터를 다시 가져오는 권장 방법으로 해당 인스턴스의 `refresh` 또는 `execute` 메서드를 사용하는 것이 좋습니다.
::

:read-more{to="/docs/getting-started/data-fetching"}
