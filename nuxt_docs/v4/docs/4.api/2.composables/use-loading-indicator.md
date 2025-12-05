---
title: 'useLoadingIndicator'
description: 이 컴포저블은 앱 페이지의 로딩 상태에 접근할 수 있게 해줍니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## Description %{description}%

페이지의 로딩 상태를 반환하는 컴포저블입니다. [`<NuxtLoadingIndicator>`](/docs/4.x/api/components/nuxt-loading-indicator)에서 사용되며 제어할 수 있습니다.
상태를 변경하기 위해 [`page:loading:start`](/docs/4.x/api/advanced/hooks#app-hooks-runtime) 및 [`page:loading:end`](/docs/4.x/api/advanced/hooks#app-hooks-runtime)에 훅을 겁니다.

## Parameters %{parameters}%

- `duration`: 로딩 바의 지속 시간(밀리초, 기본값 `2000`).
- `throttle`: 나타나고 사라지는 것을 지연시키는 시간(밀리초, 기본값 `200`).
- `estimatedProgress`: 기본적으로 Nuxt는 100%에 가까워질수록 속도를 늦춥니다. 진행률 추정을 커스터마이즈하기 위해 사용자 정의 함수를 제공할 수 있으며, 이 함수는 로딩 바의 지속 시간(위의 값)과 경과 시간을 인자로 받습니다. 0에서 100 사이의 값을 반환해야 합니다.

## Properties %{properties}%

### `isLoading` %{isloading}%

- **type**: `Ref<boolean>`
- **description**: 로딩 상태

### `error` %{error}%

- **type**: `Ref<boolean>`
- **description**: 에러 상태

### `progress` %{progress}%

- **type**: `Ref<number>`
- **description**: 진행률 상태. `0`에서 `100`까지.

## Methods %{methods}%

### `start()` %{start}%

`isLoading`을 true로 설정하고 `progress` 값을 증가시키기 시작합니다. `start`는 `{ force: true }` 옵션을 받아 인터벌을 건너뛰고 즉시 로딩 상태를 표시할 수 있습니다.

### `set()` %{set}%

`progress` 값을 특정 값으로 설정합니다. `set`은 `{ force: true }` 옵션을 받아 인터벌을 건너뛰고 즉시 로딩 상태를 표시할 수 있습니다.

### `finish()` %{finish}%

`progress` 값을 `100`으로 설정하고, 모든 타이머와 인터벌을 중지한 다음 `500`ms 후에 로딩 상태를 리셋합니다. `finish`는 상태가 리셋되기 전의 인터벌을 건너뛰기 위한 `{ force: true }` 옵션과, 로딩 바 색상을 변경하고 에러 속성을 true로 설정하기 위한 `{ error: true }` 옵션을 받습니다.

### `clear()` %{clear}%

`finish()`에서 사용됩니다. 컴포저블에서 사용하는 모든 타이머와 인터벌을 정리합니다.

## Example %{example}%

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
// set(0, { force: true })와 동일
// 진행률을 0으로 설정하고, 즉시 로딩을 표시
start({ force: true })
</script>
```
