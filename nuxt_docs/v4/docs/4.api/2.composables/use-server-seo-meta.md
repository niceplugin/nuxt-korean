---
title: 'useServerSeoMeta'
description: useServerSeoMeta 컴포저블을 사용하면 전체 TypeScript 지원과 함께 사이트의 SEO 메타 태그를 평면 객체 형태로 정의할 수 있습니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

[`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta)와 마찬가지로, `useServerSeoMeta` 컴포저블을 사용하면 전체 TypeScript 지원과 함께 사이트의 SEO 메타 태그를 평면 객체 형태로 정의할 수 있습니다.

:read-more{to="/docs/4.x/api/composables/use-seo-meta"}

대부분의 경우, 로봇은 초기 로드만 스캔하므로 메타가 반응형일 필요는 없습니다. 따라서 클라이언트에서 아무 작업도 수행하지 않거나(`head` 객체를 반환하지 않음) 성능에 초점을 맞춘 유틸리티로서 [`useServerSeoMeta`](/docs/4.x/api/composables/use-server-seo-meta)를 사용할 것을 권장합니다.

```vue [app/app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow',
})
</script>
```

매개변수는 [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta)와 완전히 동일합니다.

:read-more{to="/docs/4.x/getting-started/seo-meta"}
