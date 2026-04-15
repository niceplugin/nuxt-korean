---
title: "useError"
description: useError 컴포저블은 현재 처리 중인 전역 Nuxt 오류를 반환합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

## Usage %{#usage}%

`useError` 컴포저블은 현재 처리 중인 전역 Nuxt 오류를 반환하며 클라이언트와 서버 모두에서 사용할 수 있습니다. 이 컴포저블은 앱 전반에서 반응형이며 SSR 친화적인 오류 상태를 제공합니다.

```ts
const error = useError()
```

이 컴포저블은 컴포넌트, 페이지, 플러그인에서 현재 Nuxt 오류에 접근하거나 반응하는 데 사용할 수 있습니다.

## 타입 %{#type}%

```ts
interface NuxtError<DataT = unknown> {
  status: number
  statusText: string
  message: string
  data?: DataT
  error?: true
}

export const useError: () => Ref<NuxtError | undefined>
```

## 매개변수 %{#parameters}%

이 컴포저블은 어떤 매개변수도 받지 않습니다.

## 반환값 %{#return-values}%

현재 Nuxt 오류를 담은 `Ref`를 반환합니다(오류가 없으면 `undefined`). 오류 객체는 반응형이며 오류 상태가 바뀌면 자동으로 업데이트됩니다.

## 예제 %{#example}%

```vue
<script setup lang="ts">
const error = useError()

if (error.value) {
  console.error('Nuxt 오류:', error.value)
}
</script>
```

:read-more{to="/docs/4.x/getting-started/error-handling"}
