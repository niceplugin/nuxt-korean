---
navigation.title: 'Nuxt와 하이드레이션'
title: Nuxt와 하이드레이션
description: 하이드레이션 문제를 해결하는 것이 왜 중요한지
---

개발 중에는 하이드레이션 문제를 마주할 수 있습니다. 그런 경고를 무시하지 마세요.

## 왜 해결하는 것이 중요한가요? %{#why-is-it-important-to-fix-them}%

하이드레이션 불일치는 단순한 경고가 아닙니다. 애플리케이션을 망가뜨릴 수 있는 심각한 문제의 신호입니다:

### 성능 영향 %{#performance-impact}%

- **상호작용 가능 시간 증가**: 하이드레이션 오류는 Vue가 전체 컴포넌트 트리를 다시 렌더링하도록 강제하며, 이로 인해 Nuxt 앱이 상호작용 가능해지기까지의 시간이 늘어납니다
- **좋지 않은 사용자 경험**: 사용자는 콘텐츠 깜빡임이나 예상치 못한 레이아웃 이동을 볼 수 있습니다

### 기능 문제 %{#functionality-issues}%

- **상호작용 손상**: 이벤트 리스너가 올바르게 붙지 않아 버튼과 폼이 동작하지 않을 수 있습니다
- **상태 불일치**: 애플리케이션 상태가 사용자가 보는 내용과 애플리케이션이 렌더링되었다고 생각하는 내용 사이에서 어긋날 수 있습니다
- **SEO 문제**: 검색 엔진이 사용자가 실제로 보는 것과 다른 콘텐츠를 색인할 수 있습니다

## 어떻게 감지하나요 %{#how-to-detect-them}%

### 개발 콘솔 경고 %{#development-console-warnings}%

Vue는 개발 중 브라우저 콘솔에 하이드레이션 불일치 경고를 기록합니다:

![브라우저 콘솔의 Vue 하이드레이션 불일치 경고 스크린샷](/assets/docs/best-practices/vue-console-hydration.png)

## 흔한 원인 %{#common-reasons}%

### 서버 컨텍스트에서의 브라우저 전용 API %{#browser-only-apis-in-server-context}%

**문제**: 서버 사이드 렌더링 중 브라우저 전용 API를 사용함.

```html
<template>
  <div>User preference: {{ userTheme }}</div>
</template>

<script setup>
// 이것은 하이드레이션 불일치를 일으킵니다!
// localStorage는 서버에 존재하지 않습니다!
const userTheme = localStorage.getItem('theme') || 'light'
</script>
```

**해결책**: [`useCookie`](/docs/4.x/api/composables/use-cookie)를 사용할 수 있습니다:

```html
<template>
  <div>User preference: {{ userTheme }}</div>
</template>

<script setup>
// 이것은 서버와 클라이언트 양쪽에서 동작합니다
const userTheme = useCookie('theme', { default: () => 'light' })
</script>
```

### 일관되지 않은 데이터 %{#inconsistent-data}%

**문제**: 서버와 클라이언트 간 데이터가 다름.

```html
<template>
  <div>{{ Math.random() }}</div>
</template>
```

**해결책**: SSR 친화적인 상태를 사용합니다:

```html
<template>
  <div>{{ state }}</div>
</template>

<script setup>
const state = useState('random', () => Math.random())
</script>
```

### 클라이언트 상태 기반 조건부 렌더링 %{#conditional-rendering-based-on-client-state}%

**문제**: SSR 중 클라이언트 전용 조건을 사용함.

```html
<template>
  <div v-if="window?.innerWidth > 768">
    데스크톱 콘텐츠
  </div>
</template>
```

**해결책**: 미디어 쿼리를 사용하거나 클라이언트 사이드에서 처리합니다:

```html
<template>
  <div class="responsive-content">
    <div class="hidden md:block">데스크톱 콘텐츠</div>
    <div class="md:hidden">모바일 콘텐츠</div>
  </div>
</template>
```

### 부작용이 있는 서드파티 라이브러리 %{#third-party-libraries-with-side-effects}%

**문제**: DOM을 수정하거나 브라우저 의존성이 있는 라이브러리 (태그 매니저에서 아주 자주 발생함).

```html
<script setup>
if (import.meta.client) {
    const { default: SomeBrowserLibrary } = await import('browser-only-lib')
    SomeBrowserLibrary.init()
}
</script>
```

**해결책**: 하이드레이션이 완료된 후 라이브러리를 초기화합니다:

```html
<script setup>
onMounted(async () => {
  const { default: SomeBrowserLibrary } = await import('browser-only-lib')
  SomeBrowserLibrary.init()
})
</script>
```

### 시간 기반 동적 콘텐츠 %{#dynamic-content-based-on-time}%

**문제**: 현재 시간에 따라 변경되는 콘텐츠.

```html
<template>
  <div>{{ greeting }}</div>
</template>

<script setup>
const hour = new Date().getHours()
const greeting = hour < 12 ? '좋은 아침' : '좋은 오후'
</script>
```

**해결책**: [`NuxtTime`](/docs/4.x/api/components/nuxt-time) 컴포넌트를 사용하거나 클라이언트 사이드에서 처리합니다:

```html
<template>
  <div>
    <NuxtTime :date="new Date()" format="HH:mm" />
  </div>
</template>
```

```html
<template>
  <div>
    <ClientOnly>
      {{ greeting }}
      <template #fallback>
        안녕하세요!
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
const greeting = ref('안녕하세요!')

onMounted(() => {
  const hour = new Date().getHours()
  greeting.value = hour < 12 ? '좋은 아침' : '좋은 오후'
})
</script>
```

## 요약하면 %{#in-summary}%

1. **SSR 친화적인 컴포저블 사용**: [`useFetch`](/docs/4.x/api/composables/use-fetch), [`useAsyncData`](/docs/4.x/api/composables/use-async-data), [`useState`](/docs/4.x/api/composables/use-state)
2. **클라이언트 전용 코드 감싸기**: 브라우저 전용 콘텐츠에는 [`ClientOnly`](/docs/4.x/api/components/client-only) 컴포넌트를 사용합니다
3. **일관된 데이터 소스**: 서버와 클라이언트가 동일한 데이터를 사용하도록 보장합니다
4. **setup에서 부작용 피하기**: 브라우저 의존 코드를 `onMounted`로 옮깁니다

::tip
하이드레이션을 더 잘 이해하려면 [SSR hydration mismatch에 대한 Vue 문서](https://vuejs.org/guide/scaling-up/ssr#hydration-mismatch)를 읽어보세요.
::
