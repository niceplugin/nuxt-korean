---
title: "useError"
description: useError 컴포저블은 현재 처리 중인 전역 Nuxt 에러를 반환합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

## Usage %{usage}%

`useError` 컴포저블은 현재 처리 중인 전역 Nuxt 에러를 반환하며, 클라이언트와 서버 모두에서 사용할 수 있습니다. 이 컴포저블은 앱 전반에서 반응형이고 SSR 친화적인 에러 상태를 제공합니다.

```ts
const error = useError()
```

이 컴포저블은 컴포넌트, 페이지 또는 플러그인에서 사용하여 현재 Nuxt 에러에 접근하거나 이에 반응할 수 있습니다.

## Type %{type}%

```ts
interface NuxtError<DataT = unknown> {
  statusCode: number
  statusMessage: string
  message: string
  data?: DataT
  error?: true
}

export const useError: () => Ref<NuxtError | undefined>
```

## Parameters %{parameters}%

이 컴포저블은 어떤 매개변수도 받지 않습니다.

## Return Values %{return-values}%

현재 Nuxt 에러(또는 에러가 없으면 `undefined`)를 포함하는 `Ref`를 반환합니다. 에러 객체는 반응형이며, 에러 상태가 변경될 때 자동으로 업데이트됩니다.

## Example %{example}%

```vue
<script setup lang="ts">
const error = useError()

if (error.value) {
  console.error('Nuxt error:', error.value)
}
</script>
```

:read-more{to="/docs/4.x/getting-started/error-handling"}
