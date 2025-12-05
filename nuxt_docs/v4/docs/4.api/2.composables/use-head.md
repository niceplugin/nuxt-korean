---
title: useHead
description: useHead는 Nuxt 앱의 개별 페이지에 대한 head 속성을 사용자 정의합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## Usage %{usage}%

`useHead` 컴포저블은 [Unhead](https://unhead.unjs.io)에 의해 구동되며, head 태그를 프로그래밍적이고 반응형으로 관리할 수 있게 해줍니다. 이를 통해 HTML 문서의 `<head>` 섹션에 있는 메타 태그, 링크, 스크립트 및 기타 요소를 사용자 정의할 수 있습니다.

```vue [app/app.vue]
<script setup lang="ts">
useHead({
  title: 'My App',
  meta: [
    { name: 'description', content: 'My amazing site.' },
  ],
  bodyAttrs: {
    class: 'test',
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }],
})
</script>
```

::warning
데이터가 사용자 또는 신뢰할 수 없는 다른 소스로부터 오는 경우, [`useHeadSafe`](/docs/4.x/api/composables/use-head-safe)를 사용하는 것을 권장합니다.
::

::note
`useHead`의 속성은 `ref`, `computed`, `reactive` 속성을 허용하는 동적 속성이 될 수 있습니다. `meta` 매개변수는 전체 객체를 반응형으로 만들기 위해 객체를 반환하는 함수도 허용합니다.
::

## Type %{type}%

```ts [Signature]
export function useHead (meta: MaybeComputedRef<MetaObject>): void

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

더 자세한 타입은 [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts)를 참고하세요.

## Parameters %{parameters}%

`meta`: 페이지의 `<head>` 섹션을 사용자 정의하기 위한 head 메타데이터 속성을 받는 객체입니다. 모든 속성은 반응형 값(`ref`, `computed`, `reactive`)을 지원하거나 메타데이터 객체를 반환하는 함수가 될 수 있습니다.

| Property | Type | Description |
| --- | --- | --- |
| `title` | `string` | 페이지 제목을 설정합니다. |
| `titleTemplate` | `string \| ((title?: string) => string)` | 페이지 제목을 사용자 정의하기 위한 동적 템플릿을 구성합니다. `%s` 플레이스홀더가 있는 문자열이거나 함수가 될 수 있습니다. |
| `base` | `Base` | 문서의 `<base>` 태그를 설정합니다. |
| `link` | `Link[]` | 링크 객체의 배열입니다. 각 요소는 `<link>` 태그에 매핑되며, 객체 속성은 HTML 속성에 대응합니다. |
| `meta` | `Meta[]` | 메타 객체의 배열입니다. 각 요소는 `<meta>` 태그에 매핑되며, 객체 속성은 HTML 속성에 대응합니다. |
| `style` | `Style[]` | 스타일 객체의 배열입니다. 각 요소는 `<style>` 태그에 매핑되며, 객체 속성은 HTML 속성에 대응합니다. |
| `script` | `Script[]` | 스크립트 객체의 배열입니다. 각 요소는 `<script>` 태그에 매핑되며, 객체 속성은 HTML 속성에 대응합니다. |
| `noscript` | `Noscript[]` | noscript 객체의 배열입니다. 각 요소는 `<noscript>` 태그에 매핑되며, 객체 속성은 HTML 속성에 대응합니다. |
| `htmlAttrs` | `HtmlAttributes` | `<html>` 태그의 속성을 설정합니다. 각 객체 속성은 해당 속성에 매핑됩니다. |
| `bodyAttrs` | `BodyAttributes` | `<body>` 태그의 속성을 설정합니다. 각 객체 속성은 해당 속성에 매핑됩니다. |

## Return Values %{return-values}%

이 컴포저블은 아무 값도 반환하지 않습니다. 대신 Unhead에 head 메타데이터를 등록하며, Unhead가 실제 DOM 업데이트를 관리합니다.

## Examples %{examples}%

### Basic Meta Tags %{basic-meta-tags}%

```vue [app/pages/about.vue]
<script setup lang="ts">
useHead({
  title: 'About Us',
  meta: [
    { name: 'description', content: 'Learn more about our company' },
    { property: 'og:title', content: 'About Us' },
    { property: 'og:description', content: 'Learn more about our company' },
  ],
})
</script>
```

### Reactive Meta Tags %{reactive-meta-tags}%

```vue [app/pages/profile.vue]
<script setup lang="ts">
const profile = ref({ name: 'John Doe' })

useHead({
  title: computed(() => profile.value.name),
  meta: [
    {
      name: 'description',
      content: computed(() => `Profile page for ${profile.value.name}`),
    },
  ],
})
</script>
```

### Using a Function for Full Reactivity %{using-a-function-for-full-reactivity}%

```vue [app/pages/dynamic.vue]
<script setup lang="ts">
const count = ref(0)

useHead(() => ({
  title: `Count: ${count.value}`,
  meta: [
    { name: 'description', content: `Current count is ${count.value}` },
  ],
}))
</script>
```

### Adding External Scripts and Styles %{adding-external-scripts-and-styles}%

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

### Body and HTML Attributes %{body-and-html-attributes}%

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
