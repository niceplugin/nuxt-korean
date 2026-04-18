---
title: 'clearNuxtState'
description: useState의 캐시된 state를 삭제합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
이 메서드는 `useState`의 state를 무효화하고 싶을 때 유용합니다. 두 번째 매개변수로 `{ reset: true }`를 전달하면 state를 초기값으로 재설정할 수도 있습니다.
::

## 타입 %{#type}%

```ts [Signature]
export function clearNuxtState (keys?: string | string[] | ((key: string) => boolean), opts?: ClearNuxtStateOptions): void
```

## 매개변수 %{#parameters}%

- `keys`: 캐시된 state를 삭제하기 위해 [`useState`](/docs/4.x/api/composables/use-state)에서 사용하는 키 하나 또는 키 배열입니다. 키를 제공하지 않으면 **모든 state**가 무효화됩니다.
- `opts`: clear 동작을 구성하는 옵션 객체입니다.
  - `reset`: `true`로 설정하면 [`useState`](/docs/4.x/api/composables/use-state)의 `init` 함수가 제공한 초기값으로 state를 재설정하며, `undefined`로 설정하지 않습니다. 지정하지 않으면 Nuxt config의 `experimental.defaults.useState.resetOnClear` 값이 기본값이 됩니다(`compatibilityVersion: 5`에서는 `true`).
