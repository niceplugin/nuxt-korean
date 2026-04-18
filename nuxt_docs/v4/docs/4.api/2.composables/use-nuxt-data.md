---
title: 'useNuxtData'
description: '데이터 페칭 컴포저블의 현재 캐시된 값에 접근합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData`는 명시적으로 제공된 키를 사용해 [`useAsyncData`](/docs/4.x/api/composables/use-async-data), [`useLazyAsyncData`](/docs/4.x/api/composables/use-lazy-async-data), [`useFetch`](/docs/4.x/api/composables/use-fetch), [`useLazyFetch`](/docs/4.x/api/composables/use-lazy-fetch)의 현재 캐시된 값에 접근할 수 있게 해줍니다.
::

## Usage %{#usage}%

`useNuxtData` 컴포저블은 `useAsyncData`, `useLazyAsyncData`, `useFetch`, `useLazyFetch`와 같은 데이터 페칭 컴포저블의 현재 캐시된 값에 접근하는 데 사용됩니다. 데이터 fetch 중에 사용한 키를 제공하면 캐시된 데이터를 가져와 필요에 따라 사용할 수 있습니다.

이는 이미 가져온 데이터를 재사용해 성능을 최적화하거나 Optimistic Updates 또는 계단식 데이터 업데이트 같은 기능을 구현할 때 특히 유용합니다.

`useNuxtData`를 사용하려면 데이터 페칭 컴포저블(`useFetch`, `useAsyncData` 등)이 명시적으로 제공된 키와 함께 호출되었는지 확인하세요.

:video-accordion{title="useNuxtData에 관한 LearnVue 영상 보기" videoId="e-_u6swXRWk"}

## Params %{#params}%

- `key`: 캐시된 데이터를 식별하는 고유 키입니다. 이 키는 원래 데이터 fetch 중에 사용한 것과 일치해야 합니다.

## Return Values %{#return-values}%

- `data`: 제공된 키와 연결된 캐시된 데이터에 대한 반응형 참조입니다. 캐시된 데이터가 없으면 값은 `null`이 됩니다. 캐시된 데이터가 바뀌면 이 `Ref`는 자동으로 업데이트되어 컴포넌트에서 자연스럽게 반응성을 유지할 수 있습니다.

## Example %{#example}%

아래 예시는 서버에서 최신 데이터를 가져오는 동안 캐시된 데이터를 플레이스홀더로 사용하는 방법을 보여줍니다.

```vue [app/pages/posts.vue]
<script setup lang="ts">
// 나중에 'posts' 키를 사용해 같은 데이터에 접근할 수 있습니다
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [app/pages/posts/[id\\].vue]
<script setup lang="ts">
// posts.vue(부모 라우트)에서 useFetch의 캐시된 값에 접근합니다
const { data: posts } = useNuxtData('posts')

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default () {
    // 캐시에서 개별 post를 찾아 기본값으로 설정합니다.
    return posts.value.find(post => post.id === route.params.id)
  },
})
</script>
```

## Optimistic Updates %{#optimistic-updates}%

아래 예시는 useNuxtData를 사용해 Optimistic Updates를 구현하는 방법을 보여줍니다.

Optimistic Updates는 서버 작업이 성공할 것이라고 가정하고 사용자 인터페이스를 즉시 업데이트하는 기법입니다. 작업이 결국 실패하면 UI는 이전 상태로 되돌아갑니다.

```vue [app/pages/todos.vue]
<script setup lang="ts">
// 나중에 'todos' 키를 사용해 같은 데이터에 접근할 수 있습니다
const { data } = await useAsyncData('todos', (_nuxtApp, { signal }) => $fetch('/api/todos', { signal }))
</script>
```

```vue [app/components/NewTodo.vue]
<script setup lang="ts">
const newTodo = ref('')
let previousTodos = []

// todos.vue에서 useAsyncData의 캐시된 값에 접근합니다
const { data: todos } = useNuxtData('todos')

async function addTodo () {
  await $fetch('/api/addTodo', {
    method: 'post',
    body: {
      todo: newTodo.value,
    },
    onRequest () {
      // fetch가 실패할 경우 복원할 수 있도록 이전 캐시 값을 저장합니다.
      previousTodos = todos.value

      // todos를 낙관적으로 업데이트합니다.
      todos.value = [...todos.value, newTodo.value]
    },
    onResponseError () {
      // 요청이 실패하면 데이터를 롤백합니다.
      todos.value = previousTodos
    },
    async onResponse () {
      // 요청이 성공하면 백그라운드에서 todos를 무효화합니다.
      await refreshNuxtData('todos')
    },
  })
}
</script>
```

## Type %{#type}%

```ts [Signature]
export function useNuxtData<DataT = any> (key: string): { data: Ref<DataT | undefined> }
```
