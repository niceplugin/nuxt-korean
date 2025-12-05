---
title: 'useRouteAnnouncer'
description: 이 컴포저블은 페이지 제목 변경을 관찰하고 그에 따라 알림 메시지를 업데이트합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
이 컴포저블은 Nuxt v3.12+에서 사용할 수 있습니다.
::

## Description %{description}%

페이지 제목 변경을 관찰하고 그에 따라 알림 메시지를 업데이트하는 컴포저블입니다. [`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer)에 의해 사용되며 제어할 수 있습니다.
Unhead의 [`dom:rendered`](https://unhead.unjs.io/docs/typescript/head/api/hooks/dom-rendered)에 훅을 걸어 페이지의 제목을 읽고 이를 알림 메시지로 설정합니다.

## Parameters %{parameters}%

- `politeness`: 스크린 리더 알림의 긴급도를 설정합니다: `off`(알림 비활성화), `polite`(조용해질 때까지 대기), 또는 `assertive`(즉시 끊고 알림). (기본값 `polite`).

## Properties %{properties}%

### `message` %{message}%

- **type**: `Ref<string>`
- **description**: 알릴 메시지

### `politeness` %{politeness}%

- **type**: `Ref<string>`
- **description**: 스크린 리더 알림 긴급도 수준 `off`, `polite`, 또는 `assertive`

## Methods %{methods}%

### `set(message, politeness = "polite")` %{setmessage-politeness-polite}%

알릴 메시지와 그 긴급도 수준을 설정합니다.

### `polite(message)` %{politemessage}%

`politeness = "polite"`로 메시지를 설정합니다.

### `assertive(message)` %{assertivemessage}%

`politeness = "assertive"`로 메시지를 설정합니다.

## Example %{example}%

```vue [app/pages/index.vue]
<script setup lang="ts">
const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
  politeness: 'assertive',
})
</script>
```
