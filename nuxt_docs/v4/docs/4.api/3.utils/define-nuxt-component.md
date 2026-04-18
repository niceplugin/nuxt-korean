---
title: "defineNuxtComponent"
description: defineNuxtComponent()는 Options API로 타입 안전한 컴포넌트를 정의하기 위한 헬퍼 함수입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/component.ts
    size: xs
---

::note
`defineNuxtComponent()`는 [`defineComponent()`](https://vuejs.org/api/general#definecomponent)와 비슷하게 options API를 사용해 타입 안전한 Vue 컴포넌트를 정의하기 위한 헬퍼 함수입니다. `defineNuxtComponent()` 래퍼는 `asyncData`와 `head` 컴포넌트 옵션 지원도 추가합니다.
::

::note
Nuxt에서 Vue 컴포넌트를 선언할 때는 `<script setup lang="ts">`를 사용하는 것이 권장됩니다.
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()` %{#asyncdata}%

앱에서 `setup()`을 사용하지 않기로 했다면 컴포넌트 정의 안에서 `asyncData()` 메서드를 사용할 수 있습니다:

```vue [app/pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  asyncData () {
    return {
      data: {
        greetings: '안녕하세요!',
      },
    }
  },
})
</script>
```

## `head()` %{#head}%

앱에서 `setup()`을 사용하지 않기로 했다면 컴포넌트 정의 안에서 `head()` 메서드를 사용할 수 있습니다:

```vue [app/pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  head (nuxtApp) {
    return {
      title: '내 사이트',
    }
  },
})
</script>
```
