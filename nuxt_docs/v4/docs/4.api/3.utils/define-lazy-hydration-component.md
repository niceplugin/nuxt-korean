---
title: 'defineLazyHydrationComponent'
description: '특정 전략으로 지연 하이드레이션 컴포넌트를 정의합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/components/plugins/lazy-hydration-macro-transform.ts
    size: xs
---

`defineLazyHydrationComponent`는 특정 지연 하이드레이션 전략을 가진 컴포넌트를 생성하는 데 도움이 되는 컴파일러 매크로입니다. 지연 하이드레이션은 컴포넌트가 보이게 되거나 브라우저가 더 중요한 작업을 완료할 때까지 하이드레이션을 지연합니다. 이는 특히 필수적이지 않은 컴포넌트의 경우 초기 성능 비용을 크게 줄일 수 있습니다.

## Usage %{usage}%

### Visibility Strategy %{visibility-strategy}%

컴포넌트가 뷰포트에 보이게 될 때 하이드레이션합니다.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!--
      요소가(들) 뷰포트에 진입하기 100px 전에
      하이드레이션이 트리거됩니다.
    -->
    <LazyHydrationMyComponent :hydrate-on-visible="{ rootMargin: '100px' }" />
  </div>
</template>
```

`hydrateOnVisible` prop은 선택 사항입니다. 내부적으로 사용되는 `IntersectionObserver`의 동작을 커스터마이즈하기 위해 객체를 전달할 수 있습니다.

::read-more{to="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver" title="IntersectionObserver options"}
`hydrate-on-visible`에 대한 옵션을 더 알아보세요.
::

::note
내부적으로는 Vue의 내장 [`hydrateOnVisible` 전략](https://vuejs.org/guide/components/async#hydrate-on-visible)을 사용합니다.
::

### Idle Strategy %{idle-strategy}%

브라우저가 유휴 상태일 때 컴포넌트를 하이드레이션합니다. 컴포넌트를 가능한 한 빨리 로드해야 하지만, 크리티컬 렌더링 경로를 막지 않아야 할 때 적합합니다.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'idle',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- 브라우저가 유휴 상태이거나 2000ms 이후에 하이드레이션이 트리거됩니다. -->
    <LazyHydrationMyComponent :hydrate-on-idle="2000" />
  </div>
</template>
```

`hydrateOnIdle` prop은 선택 사항입니다. 최대 타임아웃을 지정하기 위해 양의 숫자를 전달할 수 있습니다.

Idle 전략은 브라우저가 유휴 상태일 때 하이드레이션해도 되는 컴포넌트에 적합합니다.

::note
내부적으로는 Vue의 내장 [`hydrateOnIdle` 전략](https://vuejs.org/guide/components/async#hydrate-on-idle)을 사용합니다.
::

### Interaction Strategy %{interaction-strategy}%

지정된 상호작용(예: 클릭, mouseover) 이후에 컴포넌트를 하이드레이션합니다.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'interaction',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!--
      요소가(들) 포인터에 의해 호버될 때
      하이드레이션이 트리거됩니다.
    -->
    <LazyHydrationMyComponent hydrate-on-interaction="mouseover" />
  </div>
</template>
```

`hydrateOnInteraction` prop은 선택 사항입니다. 이벤트나 이벤트 목록을 전달하지 않으면 기본적으로 `pointerenter`, `click`, `focus` 시에 하이드레이션됩니다.

::note
내부적으로는 Vue의 내장 [`hydrateOnInteraction` 전략](https://vuejs.org/guide/components/async#hydrate-on-interaction)을 사용합니다.
::

### Media Query Strategy %{media-query-strategy}%

윈도우가 미디어 쿼리와 일치할 때 컴포넌트를 하이드레이션합니다.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'mediaQuery',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!--
      윈도우 너비가 768px 이상일 때
      하이드레이션이 트리거됩니다.
    -->
    <LazyHydrationMyComponent hydrate-on-media-query="(min-width: 768px)" />
  </div>
</template>
```

::note
내부적으로는 Vue의 내장 [`hydrateOnMediaQuery` 전략](https://vuejs.org/guide/components/async#hydrate-on-media-query)을 사용합니다.
::

### Time Strategy %{time-strategy}%

지정된 지연 시간(밀리초 단위) 이후에 컴포넌트를 하이드레이션합니다.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'time',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- 1000ms 이후에 하이드레이션이 트리거됩니다. -->
    <LazyHydrationMyComponent :hydrate-after="1000" />
  </div>
</template>
```

Time 전략은 특정 시간만큼 기다려도 되는 컴포넌트에 적합합니다.

### If Strategy %{if-strategy}%

불리언 조건에 따라 컴포넌트를 하이드레이션합니다.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'if',
  () => import('./components/MyComponent.vue'),
)

const isReady = ref(false)

function myFunction () {
  // 커스텀 하이드레이션 전략을 트리거...
  isReady.value = true
}
</script>

<template>
  <div>
    <!-- isReady가 true가 될 때 하이드레이션이 트리거됩니다. -->
    <LazyHydrationMyComponent :hydrate-when="isReady" />
  </div>
</template>
```

If 전략은 항상 하이드레이션이 필요하지 않을 수 있는 컴포넌트에 가장 적합합니다.

### Never Hydrate %{never-hydrate}%

컴포넌트를 절대 하이드레이션하지 않습니다.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'never',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- 이 컴포넌트는 Vue에 의해 절대 하이드레이션되지 않습니다. -->
    <LazyHydrationMyComponent />
  </div>
</template>
```

### Listening to Hydration Events %{listening-to-hydration-events}%

모든 지연 하이드레이션 컴포넌트는 하이드레이션될 때 `@hydrated` 이벤트를 발생시킵니다.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue'),
)

function onHydrate () {
  console.log('Component has been hydrated!')
}
</script>

<template>
  <div>
    <LazyHydrationMyComponent
      :hydrate-on-visible="{ rootMargin: '100px' }"
      @hydrated="onHydrated"
    />
  </div>
</template>
```

## Parameters %{parameters}%

::warning
컴파일러가 이 매크로를 올바르게 인식하도록 하려면 외부 변수를 사용하는 것을 피하세요. 다음과 같은 방식은 매크로가 제대로 인식되지 않게 만듭니다:

```vue
<script setup lang="ts">
const strategy = 'visible'
const source = () => import('./components/MyComponent.vue')
const LazyHydrationMyComponent = defineLazyHydrationComponent(strategy, source)
</script>
```
::

### `strategy` %{strategy}%

- **Type**: `'visible' | 'idle' | 'interaction' | 'mediaQuery' | 'if' | 'time' | 'never'`
- **Required**: `true`

| Strategy      | Description                                                    |
|---------------|----------------------------------------------------------------|
| `visible`     | 컴포넌트가 뷰포트에 보이게 될 때 하이드레이션합니다.          |
| `idle`        | 브라우저가 유휴 상태이거나 지연 이후에 하이드레이션합니다.     |
| `interaction` | 사용자 상호작용(예: 클릭, 호버) 시 하이드레이션합니다.         |
| `mediaQuery`  | 지정된 미디어 쿼리 조건이 충족될 때 하이드레이션합니다.        |
| `if`          | 지정된 불리언 조건이 충족될 때 하이드레이션합니다.             |
| `time`        | 지정된 시간 지연 이후에 하이드레이션합니다.                    |
| `never`       | Vue가 컴포넌트를 하이드레이션하지 못하게 합니다.               |

### `source` %{source}%

- **Type**: `() => Promise<Component>`
- **Required**: `true`
