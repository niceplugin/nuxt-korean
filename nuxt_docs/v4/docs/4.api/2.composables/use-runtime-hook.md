---
title: useRuntimeHook
description: Nuxt 애플리케이션에서 런타임 훅을 등록하고, 스코프가 파괴될 때 적절히 정리되도록 보장합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/runtime-hook.ts
    size: xs
---

::important
이 컴포저블은 Nuxt v3.14+에서 사용할 수 있습니다.
::

```ts [signature]
function useRuntimeHook<THookName extends keyof RuntimeNuxtHooks> (
  name: THookName,
  fn: RuntimeNuxtHooks[THookName] extends HookCallback ? RuntimeNuxtHooks[THookName] : never,
): void
```

## Usage %{usage}%

### Parameters %{parameters}%

- `name`: 등록할 런타임 훅의 이름입니다. 전체 [런타임 Nuxt 훅 목록은 여기](/docs/4.x/api/advanced/hooks#app-hooks-runtime)에서 확인할 수 있습니다.
- `fn`: 훅이 트리거될 때 실행할 콜백 함수입니다. 함수 시그니처는 훅 이름에 따라 달라집니다.

### Returns %{returns}%

이 컴포저블은 값을 반환하지 않지만, 컴포넌트의 스코프가 파괴될 때 훅을 자동으로 등록 해제합니다.

## Example %{example}%

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// 링크가 프리패치될 때마다 실행되는 훅을 등록하지만,
// 컴포넌트가 언마운트될 때 자동으로 정리되어(그리고 다시 호출되지 않도록) 합니다.
useRuntimeHook('link:prefetch', (link) => {
  console.log('Prefetching', link)
})
</script>
```
