---
title: useHead
description: useHead는 Nuxt 앱의 개별 페이지의 head 속성을 사용자 정의합니다.
links:
  - label: 소스
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

[`useHead`](/docs/api/composables/use-head) 컴포저블 함수는 [Unhead](https://unhead.unjs.io)에 의해 구동되며, head 태그를 프로그래밍적이고 반응적으로 관리할 수 있게 해줍니다. 데이터가 사용자 또는 신뢰할 수 없는 소스에서 오는 경우, [`useHeadSafe`](/docs/api/composables/use-head-safe)를 참고하는 것을 권장합니다.

:read-more{to="/docs/getting-started/seo-meta"}

## [타입](#type)

```ts
useHead(meta: MaybeComputedRef<MetaObject>): void
```

아래는 [`useHead`](/docs/api/composables/use-head) 의 비반응형 타입입니다.

```ts
interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) => string)
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[]
  htmlAttrs?: HtmlAttributes
  bodyAttrs?: BodyAttributes
}
```

더 자세한 타입은 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts)에서 확인할 수 있습니다.

::note
`useHead`의 속성들은 동적으로, `ref`, `computed`, `reactive` 속성을 받을 수 있습니다. `meta` 파라미터는 객체를 반환하는 함수를 받아 전체 객체를 반응형으로 만들 수도 있습니다.
::

## [파라미터](#params)

### [`meta`](#meta)

**타입**: `MetaObject`

다음과 같은 head 메타데이터를 받는 객체입니다:

- `meta`: 배열의 각 요소는 새로 생성된 `<meta>` 태그에 매핑되며, 객체 속성은 해당 속성(attribute)에 매핑됩니다.
  - **타입**: `Array<Record<string, any>>`
- `link`: 배열의 각 요소는 새로 생성된 `<link>` 태그에 매핑되며, 객체 속성은 해당 속성(attribute)에 매핑됩니다.
  - **타입**: `Array<Record<string, any>>`
- `style`: 배열의 각 요소는 새로 생성된 `<style>` 태그에 매핑되며, 객체 속성은 해당 속성(attribute)에 매핑됩니다.
  - **타입**: `Array<Record<string, any>>`
- `script`: 배열의 각 요소는 새로 생성된 `<script>` 태그에 매핑되며, 객체 속성은 해당 속성(attribute)에 매핑됩니다.
  - **타입**: `Array<Record<string, any>>`
- `noscript`: 배열의 각 요소는 새로 생성된 `<noscript>` 태그에 매핑되며, 객체 속성은 해당 속성(attribute)에 매핑됩니다.
  - **타입**: `Array<Record<string, any>>`
- `titleTemplate`: 개별 페이지의 제목을 동적으로 커스터마이즈할 수 있는 템플릿을 설정합니다.
  - **타입**: `string` | `((title: string) => string)`
- `title`: 개별 페이지의 정적 제목을 설정합니다.
  - **타입**: `string`
- `bodyAttrs`: `<body>` 태그의 속성을 설정합니다. 각 객체 속성은 해당 속성(attribute)에 매핑됩니다.
  - **타입**: `Record<string, any>`
- `htmlAttrs`: `<html>` 태그의 속성을 설정합니다. 각 객체 속성은 해당 속성(attribute)에 매핑됩니다.
  - **타입**: `Record<string, any>`
