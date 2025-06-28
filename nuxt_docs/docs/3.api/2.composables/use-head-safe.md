---
title: useHeadSafe
description: 사용자 입력으로 head 데이터를 제공하는 권장 방법입니다.
links:
  - label: 소스
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

`useHeadSafe` 컴포저블은 [`useHead`](/docs/api/composables/use-head) 컴포저블의 래퍼로, 입력값을 안전한 값만 허용하도록 제한합니다.

## [사용법](#usage)

[`useHead`](/docs/api/composables/use-head)와 동일한 값을 모두 전달할 수 있습니다.

```ts
useHeadSafe({
  script: [
    { id: 'xss-script', innerHTML: 'alert("xss")' }
  ],
  meta: [
    { 'http-equiv': 'refresh', content: '0;javascript:alert(1)' }
  ]
})
// 안전하게 다음과 같이 생성됩니다.
// <script id="xss-script"></script>
// <meta content="0;javascript:alert(1)">
```

::read-more{to="https://unhead.unjs.io/docs/typescript/head/api/composables/use-head-safe" target="_blank"}
`Unhead` 문서에서 더 알아보기.
::

## [타입](#type)

```ts
useHeadSafe(input: MaybeComputedRef<HeadSafe>): void
```

허용되는 값의 목록은 다음과 같습니다:

```ts
const WhitelistAttributes = {
  htmlAttrs: ['class', 'style', 'lang', 'dir'],
  bodyAttrs: ['class', 'style'],
  meta: ['name', 'property', 'charset', 'content', 'media'],
  noscript: ['textContent'],
  style: ['media', 'textContent', 'nonce', 'title', 'blocking'],
  script: ['type', 'textContent', 'nonce', 'blocking'],
  link: ['color', 'crossorigin', 'fetchpriority', 'href', 'hreflang', 'imagesrcset', 'imagesizes', 'integrity', 'media', 'referrerpolicy', 'rel', 'sizes', 'type'],
}
```

더 자세한 타입은 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts)에서 확인할 수 있습니다.
