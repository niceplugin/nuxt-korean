---
title: 'useCookie'
description: useCookie는 쿠키를 읽고 쓰기 위한 SSR 친화적인 컴저블입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

페이지, 컴포넌트, 플러그인 내에서 `useCookie`를 사용할 수 있으며, 이는 쿠키를 읽고 쓰기 위한 SSR 친화적인 컴저블입니다.

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie`는 [Nuxt 컨텍스트](/docs/guide/going-further/nuxt-app#the-nuxt-context)에서만 동작합니다.
::

::tip
`useCookie` ref는 쿠키 값을 자동으로 JSON으로 직렬화 및 역직렬화합니다.
::

## [예시](#example)

아래 예시는 `counter`라는 쿠키를 생성합니다. 쿠키가 존재하지 않으면, 처음에는 임의의 값으로 설정됩니다. `counter` 변수를 업데이트할 때마다 쿠키도 그에 맞게 업데이트됩니다.

```vue [app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value = counter.value || Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>Counter: {{ counter || '-' }}</h1>
    <button @click="counter = null">reset</button>
    <button @click="counter--">-</button>
    <button @click="counter++">+</button>
  </div>
</template>
```

:link-example{to="/docs/examples/advanced/use-cookie"}

::note
쿠키가 변경되었을 때 [`refreshCookie`](/docs/api/utils/refresh-cookie)를 사용하여 `useCookie` 값을 수동으로 새로고침하세요.
::

## [옵션](#options)

쿠키 컴저블은 쿠키의 동작을 수정할 수 있는 여러 옵션을 허용합니다.

대부분의 옵션은 [cookie](https://github.com/jshttp/cookie) 패키지로 직접 전달됩니다.

### [`maxAge` / `expires`](#maxage-expires)

이 옵션들을 사용하여 쿠키의 만료를 설정할 수 있습니다.

`maxAge`: [`Max-Age` `Set-Cookie` 속성](https://tools.ietf.org/html/rfc6265#section-5.2.2)에 대한 값으로 `number`(초 단위)를 지정합니다.
지정된 숫자는 내림하여 정수로 변환됩니다. 기본적으로 최대 수명은 설정되지 않습니다.

`expires`: [`Expires` `Set-Cookie` 속성](https://tools.ietf.org/html/rfc6265#section-5.2.1)에 대한 값으로 `Date` 객체를 지정합니다.
기본적으로 만료가 설정되지 않습니다. 대부분의 클라이언트는 이를 "비영구 쿠키"로 간주하며, 웹 브라우저 애플리케이션 종료와 같은 조건에서 삭제합니다.

::note
[cookie 저장 모델 명세](https://tools.ietf.org/html/rfc6265#section-5.3)에 따르면 `expires`와 `maxAge`가 모두 설정된 경우 `maxAge`가 우선하지만, 모든 클라이언트가 이를 따르지는 않을 수 있으므로, 둘 다 설정할 경우 동일한 날짜와 시간으로 지정해야 합니다!
::

::note
`expires`와 `maxAge` 중 어느 것도 설정하지 않으면, 쿠키는 세션 전용이 되며 사용자가 브라우저를 닫을 때 삭제됩니다.
::

### [`httpOnly`](#httponly)

[`HttpOnly` `Set-Cookie` 속성](https://tools.ietf.org/html/rfc6265#section-5.2.6)에 대한 `boolean` 값을 지정합니다. 참일 경우 `HttpOnly` 속성이 설정되고, 그렇지 않으면 설정되지 않습니다. 기본적으로 `HttpOnly` 속성은 설정되지 않습니다.

::warning
이 값을 `true`로 설정할 때 주의하세요. 준수하는 클라이언트는 클라이언트 측 JavaScript가 `document.cookie`에서 쿠키를 볼 수 없도록 합니다.
::

### [`secure`](#secure)

[`Secure` `Set-Cookie` 속성](https://tools.ietf.org/html/rfc6265#section-5.2.5)에 대한 `boolean` 값을 지정합니다. 참일 경우 `Secure` 속성이 설정되고, 그렇지 않으면 설정되지 않습니다. 기본적으로 `Secure` 속성은 설정되지 않습니다.

::warning
이 값을 `true`로 설정할 때 주의하세요. 준수하는 클라이언트는 브라우저가 HTTPS 연결이 없는 경우 쿠키를 서버로 다시 전송하지 않습니다. 이는 하이드레이션 오류로 이어질 수 있습니다.
::

### [`partitioned`](#partitioned)

[`Partitioned` `Set-Cookie`](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1) 속성에 대한 `boolean` 값을 지정합니다. 참일 경우 `Partitioned` 속성이 설정되고, 그렇지 않으면 설정되지 않습니다. 기본적으로 `Partitioned` 속성은 설정되지 않습니다.

::note
이 속성은 아직 완전히 표준화되지 않았으며, 향후 변경될 수 있습니다.
또한 많은 클라이언트가 이 속성을 이해할 때까지 무시할 수 있습니다.

자세한 내용은 [제안서](https://github.com/privacycg/CHIPS)에서 확인할 수 있습니다.
::

### [`domain`](#domain)

[`Domain` `Set-Cookie` 속성](https://tools.ietf.org/html/rfc6265#section-5.2.3)에 대한 값을 지정합니다. 기본적으로 도메인은 설정되지 않으며, 대부분의 클라이언트는 쿠키를 현재 도메인에만 적용합니다.

### [`path`](#path)

[`Path` `Set-Cookie` 속성](https://tools.ietf.org/html/rfc6265#section-5.2.4)에 대한 값을 지정합니다. 기본적으로 경로는 ["기본 경로"](https://tools.ietf.org/html/rfc6265#section-5.1.4)로 간주됩니다.

### [`sameSite`](#samesite)

[`SameSite` `Set-Cookie` 속성](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)에 대한 `boolean` 또는 `string` 값을 지정합니다.

- `true`는 `SameSite` 속성을 `Strict`로 설정하여 엄격한 same-site 적용을 합니다.
- `false`는 `SameSite` 속성을 설정하지 않습니다.
- `'lax'`는 `SameSite` 속성을 `Lax`로 설정하여 느슨한 same-site 적용을 합니다.
- `'none'`은 `SameSite` 속성을 `None`으로 설정하여 명시적으로 교차 사이트 쿠키로 만듭니다.
- `'strict'`는 `SameSite` 속성을 `Strict`로 설정하여 엄격한 same-site 적용을 합니다.

다양한 적용 수준에 대한 자세한 내용은 [명세서](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7)에서 확인할 수 있습니다.

### [`encode`](#encode)

쿠키 값을 인코딩하는 데 사용할 함수를 지정합니다. 쿠키 값은 제한된 문자 집합을 가지며(단순 문자열이어야 함), 이 함수는 값을 쿠키 값에 적합한 문자열로 인코딩하는 데 사용할 수 있습니다.

기본 인코더는 `JSON.stringify` + `encodeURIComponent`입니다.

### [`decode`](#decode)

쿠키 값을 디코딩하는 데 사용할 함수를 지정합니다. 쿠키 값은 제한된 문자 집합을 가지며(단순 문자열이어야 함), 이 함수는 이전에 인코딩된 쿠키 값을 JavaScript 문자열 또는 다른 객체로 디코딩하는 데 사용할 수 있습니다.

기본 디코더는 `decodeURIComponent` + [destr](https://github.com/unjs/destr)입니다.

::note
이 함수에서 오류가 발생하면, 원래의 디코딩되지 않은 쿠키 값이 쿠키의 값으로 반환됩니다.
::

### [`default`](#default)

쿠키의 기본 값을 반환하는 함수를 지정합니다. 이 함수는 `Ref`를 반환할 수도 있습니다.

### [`readonly`](#readonly)

쿠키 값을 _읽기 전용_으로 접근할 수 있게 하며, 값을 설정할 수는 없습니다.

### [`watch`](#watch)

[watch](https://vuejs.org/api/reactivity-core.html#watch) 쿠키 ref 데이터에 대한 `boolean` 또는 `string` 값을 지정합니다.

- `true` - 쿠키 ref 데이터 변경 및 그 하위 속성까지 감시합니다(기본값).
- `shallow` - 쿠키 ref 데이터의 최상위 속성만 감시합니다.
- `false` - 쿠키 ref 데이터 변경을 감시하지 않습니다.

::note
쿠키가 변경되었을 때 [`refreshCookie`](/docs/api/utils/refresh-cookie)를 사용하여 `useCookie` 값을 수동으로 새로고침하세요.
::

**예시 1:**

```vue
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false
  }
)

if (user.value && user.value !== null) {
  user.value.score++; // userInfo 쿠키는 이 변경으로 업데이트되지 않음
}
</script>

<template>
  <div>User score: {{ user?.score }}</div>
</template>
```

**예시 2:**

```vue
<script setup lang="ts">
const list = useCookie(
  'list',
  {
    default: () => [],
    watch: 'shallow'
  }
)

function add() {
  list.value?.push(Math.round(Math.random() * 1000))
  // list 쿠키는 이 변경으로 업데이트되지 않음
}

function save() {
  if (list.value && list.value !== null) {
    list.value = [...list.value]
    // list 쿠키는 이 변경으로 업데이트됨
  }
}
</script>

<template>
  <div>
    <h1>List</h1>
    <pre>{{ list }}</pre>
    <button @click="add">Add</button>
    <button @click="save">Save</button>
  </div>
</template>
```

## [API 라우트에서의 쿠키](#cookies-in-api-routes)

서버 API 라우트에서 쿠키를 설정하려면 [`h3`](https://github.com/unjs/h3) 패키지의 `getCookie`와 `setCookie`를 사용할 수 있습니다.

```ts [server/api/counter.ts]
export default defineEventHandler(event => {
  // counter 쿠키 읽기
  let counter = getCookie(event, 'counter') || 0

  // counter 쿠키를 1 증가시키기
  setCookie(event, 'counter', ++counter)

  // JSON 응답 전송
  return { counter }
})
```

:link-example{to="/docs/examples/advanced/use-cookie"}
