---
title: "useState"
description: useState 컴포저블은 반응형이며 SSR 친화적인 공유 상태를 생성합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## [사용법](#usage)

```ts
// 반응형 상태를 생성하고 기본값을 설정합니다
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/getting-started/state-management"}

::important
`useState` 내부의 데이터는 JSON으로 직렬화되기 때문에, 클래스, 함수, 심볼 등 직렬화할 수 없는 것이 포함되지 않도록 주의해야 합니다.
::

::warning
`useState`는 컴파일러에 의해 변환되는 예약된 함수명이므로, 직접 만든 함수에 `useState`라는 이름을 사용해서는 안 됩니다.
::

:video-accordion{title="Alexander Lichter가 useState를 왜, 언제 사용해야 하는지에 대해 설명하는 영상을 시청하세요" videoId="mv0WcBABcIk"}

## [`shallowRef` 사용하기](#using-shallowref)

상태가 깊게 반응형일 필요가 없다면, `useState`를 [`shallowRef`](https://vuejs.org/api/reactivity-advanced.html#shallowref)와 함께 사용할 수 있습니다. 상태에 큰 객체나 배열이 포함되어 있을 때 성능을 향상시킬 수 있습니다.

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true
```

## [타입](#type)

```ts
useState<T>(init?: () => T | Ref<T>): Ref<T>
useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: 데이터 페칭이 요청 간에 제대로 중복 제거되도록 보장하는 고유 키입니다. 키를 제공하지 않으면, [`useState`](/docs/api/composables/use-state) 인스턴스의 파일 및 줄 번호에 고유한 키가 자동으로 생성됩니다.
- `init`: 상태가 초기화되지 않았을 때 초기값을 제공하는 함수입니다. 이 함수는 `Ref`를 반환할 수도 있습니다.
- `T`: (typescript 전용) 상태의 타입을 지정합니다.
