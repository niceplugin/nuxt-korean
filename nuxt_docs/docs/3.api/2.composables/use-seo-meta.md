---
title: 'useSeoMeta'
description: useSeoMeta 컴포저블은 완전한 TypeScript 지원과 함께 평면 객체로 사이트의 SEO 메타 태그를 정의할 수 있게 해줍니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

이것은 `name` 대신 `property`를 사용하는 것과 같은 일반적인 실수나 오타를 방지하는 데 도움이 되며, 100개 이상의 메타 태그가 완전히 타입 지원됩니다.

::important
이 방법은 XSS에 안전하고 완전한 TypeScript 지원을 제공하므로 사이트에 메타 태그를 추가하는 권장 방법입니다.
::

:read-more{to="/docs/getting-started/seo-meta"}

## [사용법](#usage)

```vue [app.vue]
<script setup lang="ts">
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

반응형 태그를 삽입할 때는 computed getter 문법(`() => value`)을 사용해야 합니다:

```vue [app.vue]
<script setup lang="ts">
const title = ref('My title')

useSeoMeta({
  title,
  description: () => `This is a description for the ${title.value} page`
})
</script>
```

## [파라미터](#parameters)

100개가 넘는 파라미터가 있습니다. [소스 코드에서 전체 파라미터 목록](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035)을 확인하세요.

:read-more{to="/docs/getting-started/seo-meta"}

## [성능](#performance)

대부분의 경우, SEO 메타 태그는 검색 엔진 로봇이 주로 초기 페이지 로드만 스캔하기 때문에 반응형일 필요가 없습니다.

더 나은 성능을 위해, 메타 태그가 반응형일 필요가 없을 때 `useSeoMeta` 호출을 서버 전용 조건으로 감쌀 수 있습니다:

```vue [app.vue]
<script setup lang="ts">
if (import.meta.server) {
  // 이 메타 태그들은 서버 사이드 렌더링 중에만 추가됩니다
  useSeoMeta({
    robots: 'index, follow',
    description: 'Static description that does not need reactivity',
    ogImage: 'https://example.com/image.png',
    // 기타 정적 메타 태그...
  })
}

const dynamicTitle = ref('My title')
// 필요한 경우에만 조건문 밖에서 반응형 메타 태그를 사용하세요
useSeoMeta({
  title: () => dynamicTitle.value,
  ogTitle: () => dynamicTitle.value,
})
</script>
```

이전에는 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) 컴포저블을 사용했으나, 이제는 이 방법이 권장되어 해당 방식은 더 이상 사용되지 않습니다.
