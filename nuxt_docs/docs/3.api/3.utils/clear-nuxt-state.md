---
title: 'clearNuxtState'
description: useState의 캐시된 상태를 삭제합니다.
links:
  - label: 소스
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
이 메서드는 `useState`의 상태를 무효화하고 싶을 때 유용합니다.
::

## [타입](#type)

```ts
clearNuxtState (keys?: string | string[] | ((key: string) => boolean)): void
```

## [매개변수](#parameters)

- `keys`: [`useState`](/docs/api/composables/use-state)에서 사용된 하나 또는 여러 개의 키로, 해당 키의 캐시된 상태를 삭제합니다. 키를 제공하지 않으면 **모든 상태**가 무효화됩니다.
