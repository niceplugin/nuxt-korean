---
title: "usePreviewMode"
description: "Nuxt에서 usePreviewMode로 프리뷰 모드를 확인하고 제어하세요"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

프리뷰 모드를 사용하면 사용자가 보지 못하게 한 채로 변경 사항이 실제 사이트에서 어떻게 표시될지 확인할 수 있습니다.

내장된 `usePreviewMode` 컴포저블을 사용해 Nuxt에서 프리뷰 상태에 접근하고 제어할 수 있습니다. 컴포저블이 프리뷰 모드를 감지하면 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)와 [`useFetch`](/docs/4.x/api/composables/use-fetch)가 프리뷰 콘텐츠를 다시 렌더링하는 데 필요한 업데이트를 자동으로 강제합니다.

```ts
const { enabled, state } = usePreviewMode()
```

## Options %{#options}%

### 사용자 지정 `enable` 검사 %{#custom-enable-check}%

프리뷰 모드를 활성화하는 사용자 지정 방식을 지정할 수 있습니다. 기본적으로 `usePreviewMode` 컴포저블은 url에 `true`와 같은 `preview` 파라미터가 있으면 프리뷰 모드를 활성화합니다 (예: `http://localhost:3000?preview=true`). 사용처 전반에서 옵션을 일관되게 유지하고 오류를 방지하기 위해 `usePreviewMode`를 사용자 정의 컴포저블로 감쌀 수 있습니다.

```ts
export function useMyPreviewMode () {
  const route = useRoute()
  return usePreviewMode({
    shouldEnable: () => {
      return !!route.query.customPreview
    },
  })
}
```

### 기본 state 수정 %{#modify-default-state}%

`usePreviewMode`는 url의 `token` 파라미터 값을 state에 저장하려고 시도합니다. 이 state를 수정하면 모든 [`usePreviewMode`](/docs/4.x/api/composables/use-preview-mode) 호출에서 사용할 수 있습니다.

```ts
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  },
})
```

::note
`getState` 함수는 반환된 값을 현재 state에 추가하므로 중요한 state를 실수로 덮어쓰지 않도록 주의하세요.
::

### `onEnable` 및 `onDisable` 콜백 사용자 지정 %{#customize-the-onenable-and-ondisable-callbacks}%

기본적으로 `usePreviewMode`가 활성화되면 `refreshNuxtData()`를 호출해 서버에서 모든 데이터를 다시 가져옵니다.

프리뷰 모드가 비활성화되면 컴포저블은 이후 라우터 탐색 후에 `refreshNuxtData()`를 실행하는 콜백을 연결합니다.

`onEnable` 및 `onDisable` 옵션에 직접 함수를 제공해 실행할 사용자 지정 콜백을 지정할 수 있습니다.

```ts
const { enabled, state } = usePreviewMode({
  onEnable: () => {
    console.log('프리뷰 모드가 활성화되었습니다')
  },
  onDisable: () => {
    console.log('프리뷰 모드가 비활성화되었습니다')
  },
})
```

## Example %{#example}%

아래 예시는 콘텐츠의 일부가 프리뷰 모드에서만 렌더링되는 페이지를 만듭니다.

```vue [app/pages/some-page.vue]
<script setup>
const { enabled, state } = usePreviewMode()

const { data } = await useFetch('/api/preview', {
  query: {
    apiKey: state.token,
  },
})
</script>

<template>
  <div>
    기본 콘텐츠 일부
    <p v-if="enabled">
      프리뷰 전용 콘텐츠: {{ state.token }}
      <br>
      <button @click="enabled = false">
        프리뷰 모드 비활성화
      </button>
    </p>
  </div>
</template>
```

이제 사이트를 생성하고 제공할 수 있습니다:

```bash [Terminal]
npx nuxt generate
npx nuxt preview
```

그런 다음 한 번 보고 싶은 페이지 끝에 `preview` 쿼리 파라미터를 추가해 프리뷰 페이지를 볼 수 있습니다. 예: `http://localhost:3000/?preview=true`.

::note
`usePreviewMode`는 `nuxt dev`가 아니라 `nuxt generate` 후 `nuxt preview`로 로컬에서 테스트해야 합니다. ([preview command](/docs/4.x/api/commands/preview)는 프리뷰 모드와 관련이 없습니다.)
::
