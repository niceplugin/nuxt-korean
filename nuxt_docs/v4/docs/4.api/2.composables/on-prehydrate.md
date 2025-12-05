---
title: "onPrehydrate"
description: "Nuxt가 페이지를 하이드레이션하기 직전에 클라이언트에서 콜백을 실행하려면 onPrehydrate를 사용하세요."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
이 컴포저블은 Nuxt v3.12+에서 사용할 수 있습니다.
::

`onPrehydrate`는 Nuxt가 페이지를 하이드레이션하기 직전에 클라이언트에서 콜백을 실행할 수 있게 해주는 컴포저블 라이프사이클 훅입니다.
::note
이것은 고급 유틸리티이며 주의해서 사용해야 합니다. 예를 들어, [`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251)과 [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js)는 하이드레이션 불일치를 피하기 위해 DOM을 조작합니다.
::

## Usage %{usage}%

Vue 컴포넌트의 setup 함수(예: `<script setup>` 안)나 플러그인에서 `onPrehydrate`를 호출하세요. 서버에서 호출될 때만 효과가 있으며, 클라이언트 빌드에는 포함되지 않습니다.

## Type %{type}%

```ts [Signature]
export function onPrehydrate (callback: (el: HTMLElement) => void): void
export function onPrehydrate (callback: string | ((el: HTMLElement) => void), key?: string): undefined | string
```

## Parameters %{parameters}%

| Parameter | Type | Required | Description |
| ---- | --- | --- | --- |
| `callback` | `((el: HTMLElement) => void) \| string` | Yes | Nuxt가 하이드레이션하기 전에 실행할 함수(또는 문자열화된 함수)입니다. HTML에 문자열화되어 인라인으로 포함됩니다. 외부 의존성이 있거나 콜백 외부의 변수를 참조해서는 안 됩니다. Nuxt 런타임이 초기화되기 전에 실행되므로 Nuxt나 Vue 컨텍스트에 의존해서는 안 됩니다. |
| `key` | `string` | No | (고급) prehydrate 스크립트를 식별하기 위한 고유 키로, 여러 루트 노드와 같은 고급 시나리오에서 유용합니다. |

## Return Values %{return-values}%

- 콜백 함수만으로 호출되면 `undefined`를 반환합니다.
- 콜백과 key로 호출되면 문자열(prehyrate id)을 반환하며, 이는 고급 사용 사례에서 `data-prehydrate-id` 속성을 설정하거나 접근하는 데 사용할 수 있습니다.

## Example %{example}%

```vue twoslash [app/app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// Nuxt가 하이드레이션하기 전에 코드 실행
onPrehydrate(() => {
  console.log(window)
})

// 루트 엘리먼트에 접근
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// 고급: 직접 `data-prehydrate-id`에 접근/설정
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Hi there
  </div>
</template>
```
