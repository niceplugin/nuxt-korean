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
`defineNuxtComponent()`는 [`defineComponent()`](https://vuejs.org/api/general#definecomponent)와 유사한 Options API를 사용하여 타입 안전한 Vue 컴포넌트를 정의하기 위한 헬퍼 함수입니다. `defineNuxtComponent()` 래퍼는 `asyncData` 및 `head` 컴포넌트 옵션에 대한 지원도 추가합니다.
::

::note
Nuxt에서 Vue 컴포넌트를 선언하는 권장 방식은 `<script setup lang="ts">`를 사용하는 것입니다.
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()` %{asyncdata}%

앱에서 `setup()`을 사용하지 않기로 선택한 경우, 컴포넌트 정의 내에서 `asyncData()` 메서드를 사용할 수 있습니다:

```vue [app/pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  asyncData () {
    return {
      data: {
        greetings: 'hello world!',
      },
    }
  },
})
</script>
```

## `head()` %{head}%

앱에서 `setup()`을 사용하지 않기로 선택한 경우, 컴포넌트 정의 내에서 `head()` 메서드를 사용할 수 있습니다:

```vue [app/pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  head (nuxtApp) {
    return {
      title: 'My site',
    }
  },
})
</script>
```
