---
title: 'useHydration'
description: '서버에서 데이터를 설정하고 전달받기 위해 hydration 사이클을 완전히 제어할 수 있게 합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

`useHydration`은 새로운 HTTP 요청이 들어올 때마다 서버 측에서 데이터를 설정하고 클라이언트 측에서 그 데이터를 전달받을 수 있게 해주는 내장 컴포저블입니다. 이를 통해 `useHydration`은 hydration 사이클을 완전히 제어할 수 있게 합니다.

::note
이것은 고급 컴포저블이며 주로 플러그인 내부 사용을 위해 설계되었고, 대부분 Nuxt 모듈에서 사용됩니다.
::

::note
`useHydration`은 **SSR 중 상태 동기화와 복원을 보장**하도록 설계되었습니다. Nuxt에서 SSR 친화적인 전역 반응형 상태를 만들어야 한다면 [`useState`](/docs/4.x/api/composables/use-state)를 사용하는 것이 권장됩니다.
::

## 사용법 %{#usage}%

서버에서 `get` 함수가 반환한 데이터는 `useHydration`의 첫 번째 매개변수로 전달한 고유 키 아래 `nuxtApp.payload`에 저장됩니다. hydration 중에는 이 데이터를 클라이언트에서 다시 가져와 중복 계산이나 API 호출을 방지합니다.

::code-group

```ts [With useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  useHydration(
    'myStoreState',
    () => myStore.getState(),
    data => myStore.setState(data),
  )
})
```

```ts [Without useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      nuxtApp.payload.myStoreState = myStore.getState()
    })
  }

  if (import.meta.client) {
    nuxt.hooks.hook('app:created', () => {
      myStore.setState(nuxtApp.payload.myStoreState)
    })
  }
})
```
::

## 타입 %{#type}%

```ts [Signature]
export function useHydration<T> (key: string, get: () => T, set: (value: T) => void): void
```

## 매개변수 %{#parameters}%

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `key` | `string` | Nuxt 애플리케이션 안의 데이터를 식별하는 고유 키입니다. |
| `get` | `() => T` | 초기값을 설정하기 위해 **서버에서만** 실행되는 함수입니다(SSR 렌더링이 끝날 때 호출됨). |
| `set` | `(value: T) => void` | 데이터를 전달받기 위해 **클라이언트에서만** 실행되는 함수입니다(초기 Vue 인스턴스가 생성될 때 호출됨). |

## 반환값 %{#return-values}%

이 컴포저블은 값을 반환하지 않습니다.
