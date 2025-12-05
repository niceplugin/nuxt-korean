---
title: 'clearNuxtState'
description: useState의 캐시된 상태를 삭제합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
이 메서드는 `useState`의 상태를 무효화하고 싶을 때 유용합니다.
::

## Type %{type}%

```ts [Signature]
export function clearNuxtState (keys?: string | string[] | ((key: string) => boolean)): void
```

## Parameters %{parameters}%

- `keys`: [`useState`](/docs/4.x/api/composables/use-state)에서 사용되는 하나의 키 또는 키 배열로, 해당 키들의 캐시된 상태를 삭제합니다. 키를 제공하지 않으면 **모든 상태**가 무효화됩니다.
