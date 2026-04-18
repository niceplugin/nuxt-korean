---
title: useRuntimeHook
description: Nuxt 애플리케이션에 runtime hook을 등록하고 스코프가 파괴될 때 올바르게 해제되도록 보장합니다.
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

## 사용법 %{#usage}%

### 매개변수 %{#parameters}%

- `name`: 등록할 runtime hook의 이름입니다. 전체 [runtime Nuxt hooks 목록은 여기](/docs/4.x/api/advanced/hooks#app-hooks-runtime)에서 볼 수 있습니다.
- `fn`: hook이 트리거될 때 실행할 콜백 함수입니다. 함수 시그니처는 hook 이름에 따라 달라집니다.

### 반환값 %{#returns}%

이 컴포저블은 값을 반환하지 않지만, 컴포넌트의 스코프가 파괴되면 hook을 자동으로 해제합니다.

## 예시 %{#example}%

```vue twoslash [pages/index.vue]
<script setup lang="ts">
// 링크가 prefetch될 때마다 실행되는 hook을 등록합니다. 이 hook은
// 컴포넌트가 unmount되면 자동으로 정리되어 더 이상 호출되지 않습니다
useRuntimeHook('link:prefetch', (link) => {
  console.log('Prefetching', link)
})
</script>
```
