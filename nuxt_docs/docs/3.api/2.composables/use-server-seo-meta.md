---
title: 'useServerSeoMeta'
description: useServerSeoMeta 컴포저블은 사이트의 SEO 메타 태그를 완전한 타입스크립트 지원과 함께 평면 객체로 정의할 수 있게 해줍니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

[`useSeoMeta`](/docs/api/composables/use-seo-meta)와 마찬가지로, `useServerSeoMeta` 컴포저블을 사용하면 사이트의 SEO 메타 태그를 완전한 타입스크립트 지원과 함께 평면 객체로 정의할 수 있습니다.

:read-more{to="/docs/api/composables/use-seo-meta"}

대부분의 경우, 메타는 반응형일 필요가 없습니다. 로봇은 초기 로드만 스캔하기 때문입니다. 따라서 [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta)를 성능에 중점을 둔 유틸리티로 사용하는 것을 권장합니다. 이 유틸리티는 클라이언트에서는 아무 작업도 하지 않거나 `head` 객체를 반환하지 않습니다.

```vue [app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow'
})
</script>
```

파라미터는 [`useSeoMeta`](/docs/api/composables/use-seo-meta)와 완전히 동일합니다.

:read-more{to="/docs/getting-started/seo-meta"}
