---
title: 'useHydration'
description: '서버에서 데이터를 설정하고 클라이언트에서 해당 데이터를 받을 수 있도록, 하이드레이션 사이클을 완전히 제어할 수 있게 해줍니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

`useHydration`은 새로운 HTTP 요청이 발생할 때마다 서버 측에서 데이터를 설정하고, 클라이언트 측에서 그 데이터를 받을 수 있는 방법을 제공하는 내장 컴포저블입니다. 이런 방식으로 `useHydration`을 사용하면 하이드레이션 사이클을 완전히 제어할 수 있습니다.

::note
이것은 고급 컴포저블로, 주로 플러그인 내부에서 사용하도록 설계되었으며, 대부분 Nuxt 모듈에서 사용됩니다.
::

::note
`useHydration`은 **SSR 동안 상태 동기화 및 복원을 보장**하도록 설계되었습니다. Nuxt에서 SSR 친화적인 전역 반응형 상태를 생성해야 한다면, [`useState`](/docs/4.x/api/composables/use-state)가 권장되는 선택입니다.
::

## Usage %{usage}%

서버에서 `get` 함수가 반환한 데이터는 `useHydration`의 첫 번째 인자로 제공된 고유 키 아래 `nuxtApp.payload`에 저장됩니다. 하이드레이션 중에 이 데이터는 클라이언트에서 다시 가져와져, 중복 계산이나 API 호출을 방지합니다.

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

## Type %{type}%

```ts [Signature]
export function useHydration<T> (key: string, get: () => T, set: (value: T) => void): void
```

## Parameters %{parameters}%

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Nuxt 애플리케이션에서 데이터를 식별하는 고유 키입니다. |
| `get` | `() => T` | 초기 값을 설정하기 위해 **서버에서만 실행되는** 함수입니다(SSR 렌더링이 완료될 때 호출됨). |
| `set` | `(value: T) => void` | 데이터를 받기 위해 **클라이언트에서만 실행되는** 함수입니다(초기 Vue 인스턴스가 생성될 때 호출됨). |

## Return Values %{return-values}%

이 컴포저블은 아무 값도 반환하지 않습니다.
