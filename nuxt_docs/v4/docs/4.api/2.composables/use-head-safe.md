---
title: useHeadSafe
description: 사용자 입력과 함께 head 데이터를 제공하는 권장 방식입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## 사용법 %{#usage}%

`useHeadSafe` 컴포저블은 입력을 안전한 값만 허용하도록 제한하는 [`useHead`](/docs/4.x/api/composables/use-head) 컴포저블의 래퍼입니다. 잠재적으로 위험한 속성을 정화하여 XSS 공격을 방지하므로 사용자 입력을 다룰 때 head 데이터를 관리하는 권장 방식입니다.

::warning
`useHeadSafe`를 사용하면 scripts의 `innerHTML`이나 meta 태그의 `http-equiv` 같은 잠재적으로 위험한 속성이 XSS 공격을 방지하기 위해 자동으로 제거됩니다. 사용자 생성 콘텐츠를 다룰 때는 이 컴포저블을 사용하세요.
::

## 타입 %{#type}%

```ts [Signature]
export function useHeadSafe (input: MaybeComputedRef<HeadSafe>): void
```

### 허용된 속성 %{#allowed-attributes}%

다음 속성은 각 head 요소 타입별로 허용 목록에 포함됩니다:

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

## 매개변수 %{#parameters}%

`input`: head 데이터를 포함하는 `MaybeComputedRef<HeadSafe>` 객체입니다. [`useHead`](/docs/4.x/api/composables/use-head)와 동일한 값을 모두 전달할 수 있지만 안전한 속성만 렌더링됩니다.

## 반환값 %{#return-values}%

이 컴포저블은 값을 반환하지 않습니다.

## 예제 %{#example}%

```vue [app/pages/user-profile.vue]
<script setup lang="ts">
// 악성 코드가 포함될 수 있는 사용자 생성 콘텐츠
const userBio = ref('<script>alert("xss")<' + '/script>')

useHeadSafe({
  title: `사용자 프로필`,
  meta: [
    {
      name: 'description',
      content: userBio.value, // 안전하게 정화됨
    },
  ],
})
</script>
```

::read-more{to="https://unhead.unjs.io/docs/typescript/head/api/composables/use-head-safe" target="_blank"}
`Unhead` 문서에서 더 알아보세요.
::
