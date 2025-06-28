---
title: 'clearNuxtData'
description: useAsyncData와 useFetch의 캐시된 데이터, 에러 상태 및 대기 중인 프로미스를 삭제합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
이 메서드는 다른 페이지의 데이터 패칭을 무효화하고 싶을 때 유용합니다.
::

## [Type](#type)

```ts
clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void
```

## [Parameters](#parameters)

* `keys`: 캐시된 데이터를 삭제하기 위해 [`useAsyncData`](/docs/api/composables/use-async-data)에서 사용되는 하나 또는 여러 개의 키입니다. 키가 제공되지 않으면 **모든 데이터**가 무효화됩니다.
