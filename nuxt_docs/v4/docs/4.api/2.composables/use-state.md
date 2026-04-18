---
title: "useState"
description: useState 컴포저블은 반응형이며 SSR 친화적인 공유 상태를 생성합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## Usage %{#usage}%

```ts
// 반응형 상태를 만들고 기본값을 설정합니다
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/4.x/getting-started/state-management"}

::important
`useState` 내부의 데이터는 JSON으로 직렬화되므로 클래스, 함수, 심볼처럼 직렬화할 수 없는 것이 포함되지 않도록 하는 것이 중요합니다.
::

::warning
`useState`는 컴파일러가 변환하는 예약 함수 이름이므로 직접 만든 함수를 `useState`라고 이름 붙이면 안 됩니다.
::

:video-accordion{title="Alexander Lichter의 useState를 왜, 언제 써야 하는지에 대한 영상을 시청하세요" videoId="mv0WcBABcIk"}

## `shallowRef` 사용하기 %{#using-shallowref}%

상태가 깊은 수준까지 반응형일 필요가 없다면 `useState`를 [`shallowRef`](https://vuejs.org/api/reactivity-advanced#shallowref)와 함께 사용할 수 있습니다. 상태에 큰 객체나 배열이 포함된 경우 성능을 개선할 수 있습니다.

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: '반응형 아님' }))
// isShallow(state) === true
```

## 타입 %{#type}%

```ts [Signature]
export function useState<T> (init?: () => T | Ref<T>): Ref<T>
export function useState<T> (key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: 요청 간 데이터 패칭이 올바르게 중복 제거되도록 보장하는 고유 키입니다. 키를 제공하지 않으면 [`useState`](/docs/4.x/api/composables/use-state) 인스턴스의 파일 및 줄 번호를 기준으로 고유한 키가 자동 생성됩니다.
- `init`: 상태가 아직 초기화되지 않았을 때 초기값을 제공하는 함수입니다. 이 함수는 `Ref`를 반환할 수도 있습니다.
- `T`: (typescript 전용) 상태의 타입을 지정합니다

## 문제 해결 %{#troubleshooting}%

### `Cannot stringify arbitrary non-POJOs` %{#cannot-stringify-arbitrary-non-pojos}%

이 오류는 클래스 인스턴스처럼 직렬화할 수 없는 payload를 `useState`에 저장하려고 할 때 발생합니다.

Nuxt가 지원하지 않는 클래스 인스턴스를 `useState`에 저장하고 싶다면 [`definePayloadPlugin`](/docs/4.x/api/composables/use-nuxt-app#custom-reducerreviver)을 사용해 해당 클래스에 대한 커스텀 serializer와 deserializer를 추가할 수 있습니다.

:read-more{to="/docs/4.x/api/composables/use-nuxt-app#payload"}
