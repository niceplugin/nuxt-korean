---
title: 'useAnnouncer'
description: 스크린 리더에 메시지를 알리기 위한 컴포저블입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/announcer.ts
    size: xs
---

::important
이 컴포저블은 Nuxt v3.17+에서 사용할 수 있습니다.
::

## Description %{#description}%

동적 콘텐츠 변경 사항을 스크린 리더에 알리기 위한 컴포저블입니다. 라우트 변경을 자동으로 알리는 [`useRouteAnnouncer`](/docs/api/composables/use-route-announcer)와 달리 `useAnnouncer`는 무엇을 언제 알릴지 수동으로 제어할 수 있게 해 줍니다.

폼 유효성 검사, 비동기 작업, 토스트 알림, 실시간 콘텐츠 변경과 같은 페이지 내 업데이트에 사용하세요.

## Parameters %{#parameters}%

- `politeness`: 스크린 리더 알림의 기본 긴급도를 설정합니다: `off` (알림 비활성화), `polite` (조용해질 때까지 대기), `assertive` (즉시 중단하고 알림). (기본값 `polite`)

## Properties %{#properties}%

### `message` %{#message}%

- **type**: `Ref<string>`
- **description**: 현재 알릴 메시지

### `politeness` %{#politeness}%

- **type**: `Ref<'polite' | 'assertive' | 'off'>`
- **description**: 스크린 리더 알림 긴급도 수준

## Methods %{#methods}%

### `set(message, politeness = "polite")` %{#set-message-politeness-polite}%

긴급도 수준과 함께 알릴 메시지를 설정합니다.

### `polite(message)` %{#polite-message}%

`politeness = "polite"`로 메시지를 설정합니다. 스크린 리더가 현재 작업을 마칠 때까지 기다릴 수 있는 긴급하지 않은 업데이트에 사용하세요.

### `assertive(message)` %{#assertive-message}%

`politeness = "assertive"`로 메시지를 설정합니다. 스크린 리더를 즉시 중단시켜야 하는 긴급한 업데이트에 사용하세요.

## Example %{#example}%

```vue [app/pages/contact.vue]
<script setup lang="ts">
const { polite, assertive } = useAnnouncer()

async function submitForm () {
  try {
    await $fetch('/api/contact', { method: 'POST', body: formData })
    polite('메시지를 성공적으로 보냈습니다')
  } catch (error) {
    assertive('오류: 메시지 전송에 실패했습니다')
  }
}
</script>
```

## Use Cases %{#use-cases}%

### 폼 유효성 검사 %{#form-validation}%

```vue [app/components/LoginForm.vue]
<script setup lang="ts">
const { assertive } = useAnnouncer()

function validateForm () {
  const errors = []
  if (!email.value) { errors.push('이메일은 필수입니다') }
  if (!password.value) { errors.push('비밀번호는 필수입니다') }

  if (errors.length) {
    assertive(`폼에 ${errors.length}개의 오류가 있습니다: ${errors.join(', ')}`)
    return false
  }
  return true
}
</script>
```

### 로딩 상태 %{#loading-states}%

```vue [app/pages/dashboard.vue]
<script setup lang="ts">
const { polite } = useAnnouncer()

const { data, status } = await useFetch('/api/data')

watch(status, (newStatus) => {
  if (newStatus === 'pending') {
    polite('데이터를 불러오는 중...')
  } else if (newStatus === 'success') {
    polite('데이터를 성공적으로 불러왔습니다')
  }
})
</script>
```

### 검색 결과 %{#search-results}%

```vue [app/components/Search.vue]
<script setup lang="ts">
const { polite } = useAnnouncer()

const results = ref([])

watch(results, (newResults) => {
  polite(`${newResults.length}개의 결과를 찾았습니다`)
})
</script>
```

::callout
알림이 DOM에 렌더링되도록 하려면 앱에 [`<NuxtAnnouncer>`](/docs/4.x/api/components/nuxt-announcer) 컴포넌트를 추가해야 합니다.
::

::callout
라우트/페이지 변경을 자동으로 알리려면 [`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer) 컴포넌트와 함께 [`useRouteAnnouncer`](/docs/4.x/api/composables/use-route-announcer)를 대신 사용하세요.
::
