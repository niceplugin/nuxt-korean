---
title: 'useSeoMeta'
description: useSeoMeta 컴포저블을 사용하면 사이트의 SEO 메타 태그를 완전한 TypeScript 지원과 함께 평평한 객체 형태로 정의할 수 있습니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

이를 통해 `property` 대신 `name`을 사용하는 실수나 오타 같은 흔한 문제를 피할 수 있으며, 100개가 넘는 메타 태그에 완전한 타입이 제공됩니다.

::important
이 방식은 XSS에 안전하고 완전한 TypeScript 지원을 제공하므로 사이트에 메타 태그를 추가하는 권장 방법입니다.
::

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## 사용법 %{#usage}%

```vue [app/app.vue]
<script setup lang="ts">
useSeoMeta({
  title: '내 멋진 사이트',
  ogTitle: '내 멋진 사이트',
  description: '이곳은 내 멋진 사이트입니다. 자세히 소개해 드릴게요.',
  ogDescription: '이곳은 내 멋진 사이트입니다. 자세히 소개해 드릴게요.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

반응형 태그를 삽입할 때는 computed getter 문법(`() => value`)을 사용해야 합니다:

```vue [app/app.vue]
<script setup lang="ts">
const title = ref('내 제목')

useSeoMeta({
  title,
  description: () => `${title.value} 페이지에 대한 설명입니다`,
})
</script>
```

## 매개변수 %{#parameters}%

매개변수는 100개가 넘습니다. [소스 코드의 전체 매개변수 목록](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035)을 확인하세요.

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## 성능 %{#performance}%

대부분의 경우 검색 엔진 로봇은 주로 초기 페이지 로드를 스캔하므로 SEO 메타 태그를 반응형으로 만들 필요가 없습니다.

성능을 더 높이려면 메타 태그가 반응형일 필요가 없을 때 `useSeoMeta` 호출을 서버 전용 조건으로 감쌀 수 있습니다:

```vue [app/app.vue]
<script setup lang="ts">
if (import.meta.server) {
  // 이 메타 태그는 서버 사이드 렌더링 중에만 추가됩니다
  useSeoMeta({
    robots: 'index, follow',
    description: '반응형이 필요 없는 정적 설명',
    ogImage: 'https://example.com/image.png',
    // 기타 정적 메타 태그...
  })
}

const dynamicTitle = ref('내 제목')
// 필요할 때만 조건문 밖에서 반응형 메타 태그를 사용하세요
useSeoMeta({
  title: () => dynamicTitle.value,
  ogTitle: () => dynamicTitle.value,
})
</script>
```

이전에는 [`useServerSeoMeta`](/docs/4.x/api/composables/use-server-seo-meta) 컴포저블을 사용했지만, 이제는 이 접근 방식으로 대체되어 deprecated 되었습니다.
