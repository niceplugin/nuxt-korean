---
title: useHead
description: useHead는 Nuxt 앱의 개별 페이지 head 속성을 사용자 지정합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## Usage %{#usage}%

`useHead` 컴포저블은 [Unhead](https://unhead.unjs.io)를 기반으로 head 태그를 프로그래밍 방식이면서 반응형으로 관리할 수 있게 해 줍니다. HTML 문서의 `<head>` 섹션 안에 있는 메타 태그, 링크, 스크립트 및 기타 요소를 사용자 지정할 수 있습니다.

```vue [app/app.vue]
<script setup lang="ts">
useHead({
  title: '내 앱',
  meta: [
    { name: 'description', content: '내 멋진 사이트.' },
  ],
  bodyAttrs: {
    class: 'test',
  },
  script: [{ innerHTML: 'console.log(\'안녕하세요 세계\')' }],
})
</script>
```

::warning
데이터가 사용자 또는 다른 신뢰할 수 없는 출처에서 온 것이라면 [`useHeadSafe`](/docs/4.x/api/composables/use-head-safe)를 확인하는 것을 권장합니다.
::

::note
`useHead`의 속성은 동적으로 사용할 수 있으며 `ref`, `computed`, `reactive` 속성을 받을 수 있습니다. `meta` 매개변수는 전체 객체를 반응형으로 만들기 위해 객체를 반환하는 함수도 받을 수 있습니다.
::

## Type %{#type}%

```ts [Signature]
export function useHead (meta: MaybeComputedRef<MetaObject>): ActiveHeadEntry<UseHeadInput>

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

interface ActiveHeadEntry<Input> {
  /**
   * Updates the entry with new input.
   *
   * Will first clear any side effects for previous input.
   */
  patch: (input: Input) => void
  /**
   * Dispose the entry, removing it from the active head.
   *
   * Will queue side effects for removal.
   */
  dispose: () => void
}
```

더 자세한 타입은 [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts)를 참고하세요.

## Parameters %{#parameters}%

`meta`: 페이지의 `<head>` 섹션을 사용자 지정하기 위한 head 메타데이터 속성을 받는 객체입니다. 모든 속성은 반응형 값(`ref`, `computed`, `reactive`)을 지원하거나 메타데이터 객체를 반환하는 함수일 수 있습니다.

| 속성 | 타입 | 설명 |
| --- | --- | --- |
| `title` | `string` | 페이지 제목을 설정합니다. |
| `titleTemplate` | `string \| ((title?: string) => string)` | 페이지 제목을 사용자 지정하는 동적 템플릿을 구성합니다. `%s` 플레이스홀더가 있는 문자열 또는 함수일 수 있습니다. |
| `base` | `Base` | 문서의 `<base>` 태그를 설정합니다. |
| `link` | `Link[]` | 링크 객체 배열입니다. 각 요소는 객체 속성이 HTML 속성에 대응되는 `<link>` 태그로 매핑됩니다. |
| `meta` | `Meta[]` | 메타 객체 배열입니다. 각 요소는 객체 속성이 HTML 속성에 대응되는 `<meta>` 태그로 매핑됩니다. |
| `style` | `Style[]` | 스타일 객체 배열입니다. 각 요소는 객체 속성이 HTML 속성에 대응되는 `<style>` 태그로 매핑됩니다. |
| `script` | `Script[]` | 스크립트 객체 배열입니다. 각 요소는 객체 속성이 HTML 속성에 대응되는 `<script>` 태그로 매핑됩니다. |
| `noscript` | `Noscript[]` | noscript 객체 배열입니다. 각 요소는 객체 속성이 HTML 속성에 대응되는 `<noscript>` 태그로 매핑됩니다. |
| `htmlAttrs` | `HtmlAttributes` | `<html>` 태그의 속성을 설정합니다. 각 객체 속성은 해당 속성으로 매핑됩니다. |
| `bodyAttrs` | `BodyAttributes` | `<body>` 태그의 속성을 설정합니다. 각 객체 속성은 해당 속성으로 매핑됩니다. |

## Return Values %{#return-values}%

이 컴포저블은 어떤 값도 반환하지 않습니다. 실제 DOM 업데이트를 관리하는 Unhead에 head 메타데이터를 등록합니다.

## Examples %{#examples}%

### 기본 메타 태그 %{#basic-meta-tags}%

```vue [app/pages/about.vue]
<script setup lang="ts">
useHead({
  title: '회사 소개',
  meta: [
    { name: 'description', content: '우리 회사에 대해 더 알아보세요' },
    { property: 'og:title', content: '회사 소개' },
    { property: 'og:description', content: '우리 회사에 대해 더 알아보세요' },
  ],
})
</script>
```

### 반응형 메타 태그 %{#reactive-meta-tags}%

```vue [app/pages/profile.vue]
<script setup lang="ts">
const profile = ref({ name: '홍길동' })

useHead({
  title: computed(() => profile.value.name),
  meta: [
    {
      name: 'description',
      content: computed(() => `${profile.value.name}의 프로필 페이지`),
    },
  ],
})
</script>
```

### 완전한 반응성을 위해 함수 사용하기 %{#using-a-function-for-full-reactivity}%

```vue [app/pages/dynamic.vue]
<script setup lang="ts">
const count = ref(0)

useHead(() => ({
  title: `개수: ${count.value}`,
  meta: [
    { name: 'description', content: `현재 개수는 ${count.value}입니다` },
  ],
}))
</script>
```

### 외부 스크립트와 스타일 추가 %{#adding-external-scripts-and-styles}%

```vue [app/pages/external.vue]
<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.example.com/styles.css',
    },
  ],
  script: [
    {
      src: 'https://cdn.example.com/script.js',
      async: true,
    },
  ],
})
</script>
```

### Body 및 HTML 속성 %{#body-and-html-attributes}%

```vue [app/pages/themed.vue]
<script setup lang="ts">
const isDark = ref(true)

useHead({
  htmlAttrs: {
    lang: 'en',
    class: computed(() => isDark.value ? 'dark' : 'light'),
  },
  bodyAttrs: {
    class: 'themed-page',
  },
})
</script>
```

:read-more{to="/docs/4.x/getting-started/seo-meta"}
