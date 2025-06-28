---
title: 'useHydration'
description: '서버로부터 데이터를 설정하고 받아오기 위해 하이드레이션 사이클을 완전히 제어할 수 있습니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

::note
이것은 고급 컴포저블로, 주로 플러그인 내에서 사용하도록 설계되었으며, 대부분 Nuxt 모듈에서 사용됩니다.
::

::note
`useHydration`은 **SSR 중 상태 동기화 및 복원을 보장**하도록 설계되었습니다. Nuxt에서 SSR 친화적인 전역 반응형 상태를 생성해야 한다면, [`useState`](/docs/api/composables/use-state)를 사용하는 것이 권장됩니다.
::

`useHydration`은 내장 컴포저블로, 새로운 HTTP 요청이 발생할 때마다 서버 측에서 데이터를 설정하고 클라이언트 측에서 해당 데이터를 받아올 수 있는 방법을 제공합니다. 이 방식으로 `useHydration`을 사용하면 하이드레이션 사이클을 완전히 제어할 수 있습니다.

서버에서 `get` 함수가 반환한 데이터는 `useHydration`의 첫 번째 매개변수로 제공된 고유 키 아래에 `nuxtApp.payload`에 저장됩니다. 하이드레이션 중에 이 데이터가 클라이언트에서 다시 조회되어, 중복 계산이나 API 호출을 방지합니다.

## [사용법](#usage)

::code-group

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

```ts [With useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  useHydration(
    'myStoreState', 
    () => myStore.getState(), 
    (data) => myStore.setState(data)
  )
})
```
::

## [타입](#type)

```ts [signature]
useHydration <T> (key: string, get: () => T, set: (value: T) => void) => void
```

## [매개변수](#parameters)

- `key`: Nuxt 애플리케이션에서 데이터를 식별하는 고유 키입니다.
- `get`: **서버에서만 실행**되는 함수(SSR 렌더링이 완료될 때 호출됨)로, 초기 값을 설정합니다.
- `set`: **클라이언트에서만 실행**되는 함수(초기 vue 인스턴스가 생성될 때 호출됨)로, 데이터를 받아옵니다.
