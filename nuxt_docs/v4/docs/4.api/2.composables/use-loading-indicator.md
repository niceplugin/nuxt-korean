---
title: 'useLoadingIndicator'
description: 이 컴포저블은 앱 페이지의 로딩 상태에 접근할 수 있게 해줍니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## 설명 %{#description}%

페이지의 로딩 상태를 반환하는 컴포저블입니다. [`<NuxtLoadingIndicator>`](/docs/4.x/api/components/nuxt-loading-indicator)에서 사용되며 제어할 수도 있습니다.
이 컴포저블은 [`page:loading:start`](/docs/4.x/api/advanced/hooks#app-hooks-runtime)와 [`page:loading:end`](/docs/4.x/api/advanced/hooks#app-hooks-runtime)에 연결되어 상태를 변경합니다.

## 매개변수 %{#parameters}%

- `duration`: 로딩 바의 지속 시간(밀리초)입니다 (기본값 `2000`).
- `throttle`: 표시 및 숨김에 적용할 스로틀 시간(밀리초)입니다 (기본값 `200`).
- `estimatedProgress`: 기본적으로 Nuxt는 100%에 가까워질수록 증가 폭을 줄입니다. 진행률 추정을 사용자 정의하려면 커스텀 함수를 전달할 수 있으며, 이 함수는 로딩 바의 지속 시간(위 값)과 경과 시간을 받아 0에서 100 사이 값을 반환해야 합니다.

## 속성 %{#properties}%

### `isLoading` %{#isloading}%

- **type**: `Ref<boolean>`
- **description**: 로딩 상태

### `error` %{#error}%

- **type**: `Ref<boolean>`
- **description**: 오류 상태

### `progress` %{#progress}%

- **type**: `Ref<number>`
- **description**: 진행 상태입니다. `0`부터 `100`까지입니다.

## 메서드 %{#methods}%

### `start()` %{#start}%

`isLoading`을 true로 설정하고 `progress` 값을 증가시키기 시작합니다. `start`는 `{ force: true }` 옵션을 받아 interval을 건너뛰고 즉시 로딩 상태를 표시할 수 있습니다.

### `set()` %{#set}%

`progress` 값을 특정 값으로 설정합니다. `set`은 `{ force: true }` 옵션을 받아 interval을 건너뛰고 즉시 로딩 상태를 표시할 수 있습니다.

### `finish()` %{#finish}%

`progress` 값을 `100`으로 설정하고 모든 타이머와 interval을 중지한 뒤, `500`ms 후 로딩 상태를 초기화합니다. `finish`는 상태 초기화 전 interval을 건너뛰는 `{ force: true }` 옵션과, 로딩 바 색상을 바꾸고 error 속성을 true로 설정하는 `{ error: true }` 옵션을 받을 수 있습니다.

### `clear()` %{#clear}%

`finish()`에서 사용됩니다. 이 컴포저블이 사용하는 모든 타이머와 interval을 정리합니다.

## 예제 %{#example}%

```vue
<script setup lang="ts">
const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
  duration: 2000,
  throttle: 200,
  // 기본적으로 진행률은 이렇게 계산됩니다
  estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50),
})
</script>
```

```vue
<script setup lang="ts">
const { start, set } = useLoadingIndicator()
// set(0, { force: true })와 동일합니다
// 진행률을 0으로 설정하고 즉시 로딩을 표시합니다
start({ force: true })
</script>
```
