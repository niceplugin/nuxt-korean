---
title: 'useCookie'
description: useCookie는 쿠키를 읽고 쓰기 위한 SSR 친화적인 컴포저블입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

## Usage %{#usage}%

페이지, 컴포넌트, 플러그인 안에서 `useCookie`를 사용하면 SSR 친화적인 방식으로 쿠키를 읽고 쓸 수 있습니다.

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie`는 [Nuxt context](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context)에서만 동작합니다.
::

::tip
반환된 ref는 쿠키 값을 자동으로 JSON으로 직렬화하고 역직렬화합니다.
::

## Type %{#type}%

```ts [Signature]
import type { Ref } from 'vue'
import type { CookieParseOptions, CookieSerializeOptions } from 'cookie-es'

export interface CookieOptions<T = any> extends Omit<CookieSerializeOptions & CookieParseOptions, 'decode' | 'encode'> {
  decode?(value: string): T
  encode?(value: T): string
  default?: () => T | Ref<T>
  watch?: boolean | 'shallow'
  readonly?: boolean
  refresh?: boolean
}

export interface CookieRef<T> extends Ref<T> {}

export function useCookie<T = string | null | undefined> (
  name: string,
  options?: CookieOptions<T>,
): CookieRef<T>
```

## Parameters %{#parameters}%

`name`: 쿠키의 이름입니다.

`options`: 쿠키 동작을 제어하는 옵션입니다. 객체는 다음 속성을 가질 수 있습니다:

대부분의 옵션은 [cookie](https://github.com/jshttp/cookie) 패키지에 직접 전달됩니다.

| 속성          | 타입                   | 기본값                                                         | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|---------------|------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `decode`      | `(value: string) => T` | `decodeURIComponent` + [destr](https://github.com/unjs/destr). | 쿠키 값을 디코딩하는 사용자 정의 함수입니다. 쿠키 값은 제한된 문자 집합만 가질 수 있고(단순 문자열이어야 함), 이 함수는 이전에 인코딩된 쿠키 값을 JavaScript 문자열이나 다른 객체로 디코딩하는 데 사용할 수 있습니다. <br/> **참고:** 이 함수에서 오류가 발생하면 원래의 디코딩되지 않은 쿠키 값이 그대로 쿠키 값으로 반환됩니다.                                                                                                                                                                                                                                                                                |
| `encode`      | `(value: T) => string` | `JSON.stringify` + `encodeURIComponent`                        | 쿠키 값을 인코딩하는 사용자 정의 함수입니다. 쿠키 값은 제한된 문자 집합만 가질 수 있고(단순 문자열이어야 함), 이 함수는 값을 쿠키 값에 적합한 문자열로 인코딩하는 데 사용할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `default`     | `() => T \| Ref<T>`    | `undefined`                                                    | 쿠키가 존재하지 않을 때 기본값을 반환하는 함수입니다. 이 함수는 `Ref`를 반환할 수도 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `watch`       | `boolean \| 'shallow'` | `true`                                                         | 변경 사항을 감시하고 쿠키를 업데이트할지 여부입니다. `true`는 깊은 감시, `'shallow'`는 얕은 감시(즉 최상위 속성만 감시), `false`는 비활성화입니다. <br/> **참고:** 쿠키가 변경되었을 때 [`refreshCookie`](/docs/4.x/api/utils/refresh-cookie)로 `useCookie` 값을 수동으로 새로 고치세요.                                                                                                                                                                                                                                                                                                                                                 |
| `refresh`     | `boolean`              | `false`                                                        | `true`이면 값 자체가 바뀌지 않았더라도 명시적으로 쓸 때마다(예: `cookie.value = cookie.value`) 쿠키 만료 시간이 갱신됩니다. 참고: 만료 시간은 자동으로 갱신되지 않으며, 이를 트리거하려면 `.value`에 할당해야 합니다.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `readonly`    | `boolean`              | `false`                                                        | `true`이면 쿠키 쓰기를 비활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `maxAge`      | `number`               | `undefined`                                                    | 쿠키의 최대 수명(초)입니다. 즉 [`Max-Age` `Set-Cookie` 속성](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.2)의 값입니다. 주어진 숫자는 내림해 정수로 변환됩니다. 기본적으로는 최대 수명이 설정되지 않습니다.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `expires`     | `Date`                 | `undefined`                                                    | 쿠키의 만료 날짜입니다. 기본적으로 만료는 설정되지 않습니다. 대부분의 클라이언트는 이를 "비영속 쿠키"로 간주하고 웹 브라우저 애플리케이션 종료 같은 조건에서 삭제합니다. <br/> **참고:** [쿠키 저장 모델 명세](https://datatracker.ietf.org/doc/html/rfc6265#section-5.3)에 따르면 `expires`와 `maxAge`가 모두 설정되면 `maxAge`가 우선하지만, 모든 클라이언트가 이를 따르는 것은 아니므로 둘 다 설정한다면 같은 날짜와 시간을 가리키도록 해야 합니다! <br/>`expires`와 `maxAge`가 둘 다 설정되지 않으면 쿠키는 세션 전용이 되며 사용자가 브라우저를 닫을 때 제거됩니다. |
| `httpOnly`    | `boolean`              | `false`                                                        | HttpOnly 속성을 설정합니다. <br/> **참고:** 이를 `true`로 설정할 때는 주의하세요. 표준을 준수하는 클라이언트는 클라이언트 사이드 JavaScript가 `document.cookie`에서 이 쿠키를 볼 수 없게 합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `secure`      | `boolean`              | `false`                                                        | [`Secure` `Set-Cookie` 속성](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.5)을 설정합니다. <br/>**참고:** 이를 `true`로 설정할 때는 주의하세요. 브라우저에 HTTPS 연결이 없으면 표준을 준수하는 클라이언트가 이후 이 쿠키를 서버로 다시 보내지 않게 됩니다. 이는 하이드레이션 오류로 이어질 수 있습니다.                                                                                                                                                                                                                                                                                                               |
| `partitioned` | `boolean`              | `false`                                                        | [`Partitioned` `Set-Cookie` 속성](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1)을 설정합니다. <br/>**참고:** 이는 아직 완전히 표준화되지 않은 속성이며, 향후 변경될 수 있습니다. <br/>이것은 또한 많은 클라이언트가 이를 이해하기 전까지 이 속성을 무시할 수 있음을 의미합니다.<br/>더 자세한 내용은 [proposal](https://github.com/privacycg/CHIPS)에서 확인할 수 있습니다.                                                                                                                                                                                           |
| `domain`      | `string`               | `undefined`                                                    | [`Domain` `Set-Cookie` 속성](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.3)을 설정합니다. 기본적으로 도메인은 설정되지 않으며, 대부분의 클라이언트는 현재 도메인에만 쿠키를 적용한다고 간주합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `path`        | `string`               | `'/'`                                                          | [`Path` `Set-Cookie` 속성](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.4)을 설정합니다. 기본적으로 경로는 ["기본 경로"](https://datatracker.ietf.org/doc/html/rfc6265#section-5.1.4)로 간주됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `sameSite`    | `boolean \| string`    | `undefined`                                                    | [`SameSite` `Set-Cookie` 속성](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)을 설정합니다. <br/>- `true`는 엄격한 same-site 적용을 위해 `SameSite` 속성을 `Strict`로 설정합니다.<br/>- `false`는 `SameSite` 속성을 설정하지 않습니다.<br/>- `'lax'`는 느슨한 same-site 적용을 위해 `SameSite` 속성을 `Lax`로 설정합니다.<br/>- `'none'`은 명시적인 cross-site 쿠키를 위해 `SameSite` 속성을 `None`으로 설정합니다.<br/>- `'strict'`는 엄격한 same-site 적용을 위해 `SameSite` 속성을 `Strict`로 설정합니다.                              |

## Return Values %{#return-values}%

쿠키 값을 나타내는 Vue `Ref<T>`를 반환합니다. ref를 업데이트하면 쿠키도 업데이트됩니다 (`readonly`가 설정된 경우 제외). 이 ref는 SSR 친화적이며 클라이언트와 서버 양쪽에서 동작합니다.

## Examples %{#examples}%

### Basic Usage %{#basic-usage}%

아래 예시는 `counter`라는 쿠키를 생성합니다. 쿠키가 없으면 처음에 임의의 값으로 설정됩니다. `counter` 변수를 업데이트할 때마다 쿠키도 그에 맞게 업데이트됩니다.

```vue [app/app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value ||= Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>카운터: {{ counter || '-' }}</h1>
    <button @click="counter = null">
      초기화
    </button>
    <button @click="counter--">
      -
    </button>
    <button @click="counter++">
      +
    </button>
  </div>
</template>
```

### Readonly Cookies %{#readonly-cookies}%

```vue
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false,
  },
)

if (user.value) {
  // 실제 `userInfo` 쿠키는 업데이트되지 않습니다
  user.value.score++
}
</script>

<template>
  <div>사용자 점수: {{ user?.score }}</div>
</template>
```

### Writable Cookies %{#writable-cookies}%

```vue
<script setup lang="ts">
const list = useCookie(
  'list',
  {
    default: () => [],
    watch: 'shallow',
  },
)

function add () {
  list.value?.push(Math.round(Math.random() * 1000))
  // 이 변경으로는 list 쿠키가 업데이트되지 않습니다
}

function save () {
  // 실제 `list` 쿠키가 업데이트됩니다
  list.value &&= [...list.value]
}
</script>

<template>
  <div>
    <h1>목록</h1>
    <pre>{{ list }}</pre>
    <button @click="add">
      추가
    </button>
    <button @click="save">
      저장
    </button>
  </div>
</template>
```

### Refreshing Cookies %{#refreshing-cookies}%

```vue
<script setup lang="ts">
const session = useCookie(
  'session', {
    maxAge: 60 * 60, // 1시간
    refresh: true,
    default: () => 'active',
  })

// 값이 바뀌지 않더라도,
// setter가 호출될 때마다 쿠키 만료 시간이
// 갱신됩니다
session.value = 'active'
</script>

<template>
  <div>세션: {{ session }}</div>
</template>
```

### Cookies in API Routes %{#cookies-in-api-routes}%

서버 API 라우트에서 쿠키를 설정하려면 [`h3`](https://github.com/h3js/h3) 패키지의 `getCookie`와 `setCookie`를 사용할 수 있습니다.

```ts [server/api/counter.ts]
export default defineEventHandler((event) => {
  // counter 쿠키 읽기
  let counter = getCookie(event, 'counter') || 0

  // counter 쿠키를 1 증가
  setCookie(event, 'counter', ++counter)

  // JSON 응답 전송
  return { counter }
})
```

:link-example{to="/docs/4.x/examples/advanced/use-cookie"}
