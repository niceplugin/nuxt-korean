---
title: 'useSeoMeta'
description: useSeoMeta 컴포저블을 사용하면 사이트의 SEO 메타 태그를 완전한 TypeScript 지원과 함께 평탄한 객체 형태로 정의할 수 있습니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

이는 `property` 대신 `name`을 사용하는 것과 같은 일반적인 실수나 오타를 피하는 데 도움이 되며, 100개가 넘는 메타 태그에 대해 완전한 타입 지원을 제공합니다.

::important
이 방식은 XSS에 안전하고 완전한 TypeScript 지원을 제공하므로, 사이트에 메타 태그를 추가하는 권장 방법입니다.
::

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## Usage %{usage}%

```vue [app/app.vue]
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

```vue [app/app.vue]
<script setup lang="ts">
const title = ref('My title')

useSeoMeta({
  title,
  description: () => `This is a description for the ${title.value} page`,
})
</script>
```

## Parameters %{parameters}%

100개가 넘는 파라미터가 있습니다. [소스 코드에서 전체 파라미터 목록](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035)을 확인하세요.

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## Performance %{performance}%

대부분의 경우, 검색 엔진 로봇은 주로 초기 페이지 로드를 스캔하므로 SEO 메타 태그가 반응형일 필요는 없습니다.

성능을 향상시키기 위해, 메타 태그가 반응형일 필요가 없을 때는 `useSeoMeta` 호출을 서버 전용 조건으로 감쌀 수 있습니다:

```vue [app/app.vue]
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

이전에는 [`useServerSeoMeta`](/docs/4.x/api/composables/use-server-seo-meta) 컴포저블을 사용했지만, 이제는 이 접근 방식이 권장되면서 사용이 중단되었습니다.
