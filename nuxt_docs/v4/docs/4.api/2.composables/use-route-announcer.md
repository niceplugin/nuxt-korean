---
title: 'useRouteAnnouncer'
description: 이 컴포저블은 페이지 제목 변경을 감지하고 이에 맞게 announcer 메시지를 업데이트합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
이 컴포저블은 Nuxt v3.12+에서 사용할 수 있습니다.
::

## 설명 %{#description}%

페이지 제목 변경을 감지하고 이에 맞게 announcer 메시지를 업데이트하는 컴포저블입니다. [`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer)에서 사용되며 제어할 수도 있습니다.
이 컴포저블은 Unhead의 `dom:rendered` 훅에 연결되어 페이지 제목을 읽고 이를 announcer 메시지로 설정합니다.

## 매개변수 %{#parameters}%

- `politeness`: 스크린 리더 안내의 긴급도를 설정합니다: `off` (안내 비활성화), `polite` (조용해질 때까지 대기), `assertive` (즉시 끼어들기).  (기본값 `polite`).

## 속성 %{#properties}%

### `message` %{#message}%

- **type**: `Ref<string>`
- **description**: 알릴 메시지

### `politeness` %{#politeness}%

- **type**: `Ref<string>`
- **description**: 스크린 리더 안내 긴급도 수준 `off`, `polite`, `assertive`

## 메서드 %{#methods}%

### `set(message, politeness = "polite")` %{#set-message-politeness-polite}%

긴급도 수준과 함께 알릴 메시지를 설정합니다.

### `polite(message)` %{#polite-message}%

`politeness = "polite"`로 메시지를 설정합니다

### `assertive(message)` %{#assertive-message}%

`politeness = "assertive"`로 메시지를 설정합니다

## 예제 %{#example}%

```vue [app/pages/index.vue]
<script setup lang="ts">
const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
  politeness: 'assertive',
})
</script>
```

::callout
페이지 내부의 동적 콘텐츠 변경(폼 검증, 토스트, 로딩 상태)을 알리려면 대신 [`useAnnouncer`](/docs/4.x/api/composables/use-announcer)를 사용하세요.
::
