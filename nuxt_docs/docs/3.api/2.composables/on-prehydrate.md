---
title: "onPrehydrate"
description: "onPrehydrate를 사용하여 Nuxt가 페이지를 하이드레이트하기 직전에 클라이언트에서 콜백을 실행할 수 있습니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
이 컴포저블은 Nuxt v3.12+에서 사용할 수 있습니다.
::

`onPrehydrate`는 Nuxt가 페이지를 하이드레이트하기 직전에 클라이언트에서 콜백을 실행할 수 있게 해주는
컴포저블 라이프사이클 훅입니다.

::note
이것은 고급 유틸리티이며 주의해서 사용해야 합니다. 예를 들어, [`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) 및 [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js)는 하이드레이션 불일치를 방지하기 위해 DOM을 조작합니다.
::

## [사용법](#usage)

`onPrehydrate`는 Vue 컴포넌트의 setup 함수(예: `<script setup>`), 또는 플러그인에서 직접 호출할 수 있습니다.
서버에서 호출될 때만 효과가 있으며, 클라이언트 빌드에는 포함되지 않습니다.

## [파라미터](#parameters)

- `callback`: 문자열로 변환되어 HTML에 인라인되는 함수입니다.
외부 의존성(예: 자동 임포트)이나 콜백 외부에 정의된 변수에 의존해서는 안 됩니다.
콜백은 Nuxt 런타임이 초기화되기 전에 실행되므로 Nuxt 또는 Vue 컨텍스트에 의존해서는 안 됩니다.

## [예시](#example)

```vue twoslash [app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// onPrehydrate는 Nuxt가 하이드레이트하기 전에 실행되는 것이 보장됩니다.
onPrehydrate(() => {
  console.log(window)
})

// 루트 노드가 하나만 있다면, 해당 엘리먼트에 접근할 수 있습니다.
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// _매우_ 고급 사용 사례(예: 단일 루트 노드가 없는 경우)에는
// 직접 `data-prehydrate-id`에 접근/설정할 수 있습니다.
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Hi there
  </div>
</template>
```
