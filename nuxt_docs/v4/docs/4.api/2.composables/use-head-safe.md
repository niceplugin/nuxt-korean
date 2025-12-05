---
title: useHeadSafe
description: 사용자 입력으로 head 데이터를 제공하는 권장 방법입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## Usage %{usage}%

`useHeadSafe` 컴포저블은 [`useHead`](/docs/4.x/api/composables/use-head) 컴포저블을 감싼 래퍼로, 입력값을 제한하여 안전한 값만 허용합니다. 이는 사용자 입력을 다룰 때 head 데이터를 관리하는 권장 방식으로, 잠재적으로 위험한 속성을 정제(sanitize)하여 XSS 공격을 방지합니다.

::warning
`useHeadSafe`를 사용할 때, 스크립트의 `innerHTML`이나 메타 태그의 `http-equiv`와 같이 잠재적으로 위험한 속성은 XSS 공격을 방지하기 위해 자동으로 제거됩니다. 사용자 생성 콘텐츠를 다룰 때는 항상 이 컴포저블을 사용하세요.
::

## Type %{type}%

```ts [Signature]
export function useHeadSafe (input: MaybeComputedRef<HeadSafe>): void
```

### Allowed Attributes %{allowed-attributes}%

다음 속성들은 각 head 요소 타입에 대해 화이트리스트로 허용됩니다:

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

더 자세한 타입은 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts)를 참고하세요.

## Parameters %{parameters}%

`input`: head 데이터를 포함하는 `MaybeComputedRef<HeadSafe>` 객체입니다. [`useHead`](/docs/4.x/api/composables/use-head)와 동일한 값을 모두 전달할 수 있지만, 안전한 속성만 렌더링됩니다.

## Return Values %{return-values}%

이 컴포저블은 아무 값도 반환하지 않습니다.

## Example %{example}%

```vue [app/pages/user-profile.vue]
<script setup lang="ts">
// 악성 코드를 포함할 수 있는 사용자 생성 콘텐츠
const userBio = ref('<script>alert("xss")<' + '/script>')

useHeadSafe({
  title: `User Profile`,
  meta: [
    {
      name: 'description',
      content: userBio.value, // 안전하게 정제됨
    },
  ],
})
</script>
```

::read-more{to="https://unhead.unjs.io/docs/typescript/head/api/composables/use-head-safe" target="_blank"}
`Unhead` 문서에서 더 읽어보기.
::
