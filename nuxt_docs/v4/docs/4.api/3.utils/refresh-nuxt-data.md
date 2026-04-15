---
title: 'refreshNuxtData'
description: Nuxt의 모든 또는 특정 asyncData 인스턴스를 새로고침합니다
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`refreshNuxtData`는 [`useAsyncData`](/docs/4.x/api/composables/use-async-data), [`useLazyAsyncData`](/docs/4.x/api/composables/use-lazy-async-data), [`useFetch`](/docs/4.x/api/composables/use-fetch), [`useLazyFetch`](/docs/4.x/api/composables/use-lazy-fetch)에서 만들어진 것을 포함해 모든 또는 특정 `asyncData` 인스턴스를 다시 가져오는 데 사용됩니다.  

::note
컴포넌트가 `<KeepAlive>`에 의해 캐시되어 비활성화 상태에 들어가더라도, 컴포넌트 안의 `asyncData`는 컴포넌트가 언마운트될 때까지 계속 다시 가져와집니다.
::

## 타입 %{#type}%

```ts [Signature]
export function refreshNuxtData (keys?: string | string[])
```

## 매개변수 %{#parameters}%

* `keys`: 데이터 패칭에 사용되는 `keys`로, 단일 문자열 또는 문자열 배열입니다. 이 매개변수는 **선택 사항**입니다. `keys`를 명시적으로 지정하지 않으면 모든 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)와 [`useFetch`](/docs/4.x/api/composables/use-fetch) 키가 다시 가져와집니다.

## 반환값 %{#return-values}%

`refreshNuxtData`는 promise를 반환하며, 모든 또는 특정 `asyncData` 인스턴스의 새로고침이 끝나면 resolve됩니다.

## 예제 %{#examples}%

### 모든 데이터 새로고침 %{#refresh-all-data}%

아래 예제는 Nuxt 애플리케이션에서 `useAsyncData`와 `useFetch`로 가져오는 모든 데이터를 새로고침합니다.

```vue [app/pages/some-page.vue]
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
    <button
      :disabled="refreshing"
      @click="refreshAll"
    >
      모든 데이터 다시 가져오기
    </button>
  </div>
</template>
```

### 특정 데이터 새로고침 %{#refresh-specific-data}%

아래 예제는 키가 `count`와 `user`에 해당하는 데이터만 새로고침합니다.

```vue [app/pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refresh () {
  refreshing.value = true
  try {
    // 키 배열을 넘겨 여러 데이터를 함께 새로고침할 수도 있습니다
    await refreshNuxtData(['count', 'user'])
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div v-if="refreshing">
    불러오는 중
  </div>
  <button @click="refresh">
    새로고침
  </button>
</template>
```

::note
`asyncData` 인스턴스에 직접 접근할 수 있다면 데이터를 다시 가져오는 선호 방식으로 해당 인스턴스의 `refresh` 또는 `execute` 메서드를 사용하는 것이 권장됩니다.
::

:read-more{to="/docs/4.x/getting-started/data-fetching"}
