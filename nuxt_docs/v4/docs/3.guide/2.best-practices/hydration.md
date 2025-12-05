---
navigation.title: 'Nuxt와 하이드레이션'
title: Nuxt와 하이드레이션
description: 하이드레이션 문제를 해결하는 것이 중요한 이유
---

개발을 하다 보면 하이드레이션 문제를 마주칠 수 있습니다. 이러한 경고를 무시하지 마세요.

# 왜 이것들을 고치는 것이 중요할까요?

하이드레이션 불일치는 단순한 경고가 아니라, 애플리케이션을 망가뜨릴 수 있는 심각한 문제의 신호입니다.

## 성능 영향 %{performance-impact}%

- **상호작용 가능 시점 증가**: 하이드레이션 오류는 Vue가 전체 컴포넌트 트리를 다시 렌더링하도록 강제하여, Nuxt 앱이 상호작용 가능해지기까지의 시간을 증가시킵니다
- **나쁜 사용자 경험**: 사용자가 콘텐츠 깜빡임이나 예기치 않은 레이아웃 이동을 볼 수 있습니다

## 기능 문제 %{functionality-issues}%

- **깨진 상호작용성**: 이벤트 리스너가 제대로 연결되지 않아 버튼과 폼이 동작하지 않을 수 있습니다
- **상태 불일치**: 사용자가 보는 것과 애플리케이션이 렌더링되었다고 생각하는 것 사이에 애플리케이션 상태가 동기화되지 않을 수 있습니다
- **SEO 문제**: 검색 엔진이 실제로 사용자가 보는 것과 다른 콘텐츠를 색인할 수 있습니다

# 어떻게 감지하나요

## 개발 콘솔 경고 %{development-console-warnings}%

개발 중 브라우저 콘솔에서 Vue가 하이드레이션 불일치 경고를 로그로 남깁니다:

![브라우저 콘솔에 표시된 Vue 하이드레이션 불일치 경고 스크린샷](/assets/docs/best-practices/vue-console-hydration.png)

# 흔한 원인들

## 서버 컨텍스트에서의 브라우저 전용 API %{browser-only-apis-in-server-context}%

**문제**: 서버 사이드 렌더링 중에 브라우저 전용 API를 사용하는 경우.

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
// 이것은 서버와 클라이언트 모두에서 동작합니다
const userTheme = useCookie('theme', { default: () => 'light' })
</script>
```

## 일관되지 않은 데이터 %{inconsistent-data}%

**문제**: 서버와 클라이언트 간의 서로 다른 데이터.

```html
<template>
  <div>{{ Math.random() }}</div>
</template>
```

**해결책**: SSR 친화적인 상태를 사용하세요:

```html
<template>
  <div>{{ state }}</div>
</template>

<script setup>
const state = useState('random', () => Math.random())
</script>
```

## 클라이언트 상태 기반 조건부 렌더링 %{conditional-rendering-based-on-client-state}%

**문제**: SSR 중에 클라이언트 전용 조건을 사용하는 경우.

```html
<template>
  <div v-if="window?.innerWidth > 768">
    Desktop content
  </div>
</template>
```

**해결책**: 미디어 쿼리를 사용하거나 클라이언트 측에서 처리하세요:

```html
<template>
  <div class="responsive-content">
    <div class="hidden md:block">Desktop content</div>
    <div class="md:hidden">Mobile content</div>
  </div>
</template>
```

## 부작용이 있는 서드파티 라이브러리 %{third-party-libraries-with-side-effects}%

**문제**: DOM을 수정하거나 브라우저 의존성이 있는 라이브러리(태그 매니저에서 이런 일이 매우 자주 발생합니다).

```html
<script setup>
if (import.meta.client) {
    const { default: SomeBrowserLibrary } = await import('browser-only-lib')
    SomeBrowserLibrary.init()
}
</script>
```

**해결책**: 하이드레이션이 완료된 후 라이브러리를 초기화하세요:

```html
<script setup>
onMounted(async () => {
  const { default: SomeBrowserLibrary } = await import('browser-only-lib')
  SomeBrowserLibrary.init()
})
</script>
```

## 시간 기반 동적 콘텐츠 %{dynamic-content-based-on-time}%

**문제**: 현재 시간에 따라 변경되는 콘텐츠.

```html
<template>
  <div>{{ greeting }}</div>
</template>

<script setup>
const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : 'Good afternoon'
</script>
```

**해결책**: [`NuxtTime`](/docs/4.x/api/components/nuxt-time) 컴포넌트를 사용하거나 클라이언트 측에서 처리하세요:

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
        Hello!
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
const greeting = ref('Hello!')

onMounted(() => {
  const hour = new Date().getHours()
  greeting.value = hour < 12 ? 'Good morning' : 'Good afternoon'
})
</script>
```

## 요약 %{in-summary}%

1. **SSR 친화적인 composable 사용**: [`useFetch`](/docs/4.x/api/composables/use-fetch), [`useAsyncData`](/docs/4.x/api/composables/use-async-data), [`useState`](/docs/4.x/api/composables/use-state)
2. **클라이언트 전용 코드를 감싸기**: 브라우저 전용 콘텐츠에는 [`ClientOnly`](/docs/4.x/api/components/client-only) 컴포넌트를 사용하세요
3. **일관된 데이터 소스**: 서버와 클라이언트가 동일한 데이터를 사용하도록 하세요
4. **setup에서 부작용 피하기**: 브라우저 의존 코드들은 `onMounted`로 옮기세요

::tip
하이드레이션을 더 잘 이해하기 위해 [Vue의 SSR 하이드레이션 불일치 문서](https://vuejs.org/guide/scaling-up/ssr#hydration-mismatch)를 읽어볼 수 있습니다.
::
