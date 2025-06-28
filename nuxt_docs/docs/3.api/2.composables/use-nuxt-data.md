---
title: 'useNuxtData'
description: '데이터 패칭 컴포저블의 현재 캐시된 값을 가져옵니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData`를 사용하면 [`useAsyncData`](/docs/api/composables/use-async-data), [`useLazyAsyncData`](/docs/api/composables/use-lazy-async-data), [`useFetch`](/docs/api/composables/use-fetch), [`useLazyFetch`](/docs/api/composables/use-lazy-fetch)에서 명시적으로 제공된 키를 통해 현재 캐시된 값에 접근할 수 있습니다.
::

## [사용법](#usage)

`useNuxtData` 컴포저블은 `useAsyncData`, `useLazyAsyncData`, `useFetch`, `useLazyFetch`와 같은 데이터 패칭 컴포저블의 현재 캐시된 값에 접근하는 데 사용됩니다. 데이터 패칭 시 사용한 키를 제공하면, 캐시된 데이터를 가져와 필요에 따라 사용할 수 있습니다.

이는 이미 패칭된 데이터를 재사용하거나 Optimistic Updates, 계단식 데이터 업데이트와 같은 기능을 구현하여 성능을 최적화하는 데 특히 유용합니다.

`useNuxtData`를 사용하려면, 데이터 패칭 컴포저블(`useFetch`, `useAsyncData` 등)이 명시적으로 키와 함께 호출되었는지 확인해야 합니다.

:video-accordion{title="LearnVue에서 useNuxtData에 대해 설명하는 영상을 시청하세요" videoId="e-_u6swXRWk"}

## [파라미터](#params)

- `key`: 캐시된 데이터를 식별하는 고유한 키입니다. 이 키는 원래 데이터 패칭 시 사용한 것과 일치해야 합니다.

## [반환 값](#return-values)

- `data`: 제공된 키와 연관된 캐시된 데이터에 대한 반응형 참조입니다. 캐시된 데이터가 없으면 값은 `null`이 됩니다. 이 `Ref`는 캐시된 데이터가 변경되면 자동으로 업데이트되어, 컴포넌트에서 원활한 반응성을 제공합니다.

## [예시](#example)

아래 예시는 서버에서 최신 데이터를 패칭하는 동안 캐시된 데이터를 플레이스홀더로 사용할 수 있는 방법을 보여줍니다.

```vue [pages/posts.vue]
<script setup lang="ts">
// 'posts' 키를 사용하여 나중에 동일한 데이터에 접근할 수 있습니다.
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [pages/posts/[id\\].vue]
<script setup lang="ts">
// posts.vue(상위 라우트)에서 useFetch의 캐시된 값에 접근합니다.
const { data: posts } = useNuxtData('posts')

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default() {
    // 캐시에서 개별 포스트를 찾아 기본값으로 설정합니다.
    return posts.value.find(post => post.id === route.params.id)
  }
})
</script>
```

## [Optimistic Updates](#optimistic-updates)

아래 예시는 useNuxtData를 사용하여 Optimistic Updates를 구현하는 방법을 보여줍니다.

Optimistic Updates는 서버 작업이 성공할 것이라고 가정하고 사용자 인터페이스를 즉시 업데이트하는 기법입니다. 작업이 실패하면 UI를 이전 상태로 롤백합니다.

```vue [pages/todos.vue]
<script setup lang="ts">
// 'todos' 키를 사용하여 나중에 동일한 데이터에 접근할 수 있습니다.
const { data } = await useAsyncData('todos', () => $fetch('/api/todos'))
</script>
```

```vue [components/NewTodo.vue]
<script setup lang="ts">
const newTodo = ref('')
let previousTodos = []

// todos.vue에서 useAsyncData의 캐시된 값에 접근합니다.
const { data: todos } = useNuxtData('todos')

async function addTodo () {
  return $fetch('/api/addTodo', {
    method: 'post',
    body: {
      todo: newTodo.value
    },
    onRequest () {
      // 패칭 실패 시 복원할 수 있도록 이전 캐시 값을 저장합니다.
      previousTodos = todos.value

      // Optimistic하게 todos를 업데이트합니다.
      todos.value = [...todos.value, newTodo.value]
    },
    onResponseError () {
      // 요청이 실패하면 데이터를 롤백합니다.
      todos.value = previousTodos
    },
    async onResponse () {
      // 요청이 성공하면 백그라운드에서 todos를 무효화합니다.
      await refreshNuxtData('todos')
    }
  })
}
</script>
```

## [타입](#type)

```ts
useNuxtData<DataT = any> (key: string): { data: Ref<DataT | undefined> }
```
