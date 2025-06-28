---
title: "usePreviewMode"
description: "Nuxt에서 usePreviewMode를 사용하여 프리뷰 모드를 확인하고 제어하세요"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

프리뷰 모드를 사용하면 변경 사항을 실제 사이트에서 사용자에게 공개하지 않고도 어떻게 표시되는지 확인할 수 있습니다.

Nuxt에서 내장된 `usePreviewMode` 컴저블을 사용하여 프리뷰 상태에 접근하고 제어할 수 있습니다. 컴저블이 프리뷰 모드를 감지하면 [`useAsyncData`](/docs/api/composables/use-async-data) 및 [`useFetch`](/docs/api/composables/use-fetch)가 프리뷰 콘텐츠를 다시 렌더링하도록 필요한 업데이트를 자동으로 강제합니다.

```js
const { enabled, state } = usePreviewMode()
```

## [옵션](#options)

### [커스텀 `enable` 체크](#custom-enable-check)

프리뷰 모드를 활성화하는 커스텀 방식을 지정할 수 있습니다. 기본적으로 `usePreviewMode` 컴저블은 url에 `preview` 파라미터가 `true`로 설정되어 있으면 프리뷰 모드를 활성화합니다(예: `http://localhost:3000?preview=true`). 옵션을 일관되게 유지하고 오류를 방지하기 위해 `usePreviewMode`를 커스텀 컴저블로 감쌀 수 있습니다.

```js
export function useMyPreviewMode () {
  return usePreviewMode({
    shouldEnable: () => {
      return !!route.query.customPreview
    }
  });
}
```

### [기본 상태 수정](#modify-default-state)

`usePreviewMode`는 url에서 `token` 파라미터의 값을 상태에 저장하려고 시도합니다. 이 상태를 수정할 수 있으며, 모든 [`usePreviewMode`](/docs/api/composables/use-preview-mode) 호출에서 사용할 수 있습니다.

```js
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  }
})
```

::note
`getState` 함수는 반환된 값을 현재 상태에 추가하므로, 중요한 상태를 실수로 덮어쓰지 않도록 주의하세요.
::

### [`onEnable` 및 `onDisable` 콜백 커스터마이즈](#customize-the-onenable-and-ondisable-callbacks)

기본적으로 `usePreviewMode`가 활성화되면, 모든 데이터를 서버에서 다시 가져오기 위해 `refreshNuxtData()`를 호출합니다.

프리뷰 모드가 비활성화되면, 컴저블은 이후 라우터 이동 후에 실행될 `refreshNuxtData()` 콜백을 연결합니다.

`onEnable` 및 `onDisable` 옵션에 직접 함수를 제공하여 트리거될 커스텀 콜백을 지정할 수 있습니다.

```js
const { enabled, state } = usePreviewMode({
  onEnable: () => {
    console.log('프리뷰 모드가 활성화되었습니다')
  },
  onDisable: () => {
    console.log('프리뷰 모드가 비활성화되었습니다')
  }
})
```

## [예시](#example)

아래 예시는 일부 콘텐츠가 프리뷰 모드에서만 렌더링되는 페이지를 생성합니다.

```vue [pages/some-page.vue]
<script setup>
const { enabled, state } = usePreviewMode()

const { data } = await useFetch('/api/preview', {
  query: {
    apiKey: state.token
  }
})
</script>

<template>
  <div>
    일부 기본 콘텐츠
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

이제 사이트를 생성하고 서빙할 수 있습니다:

```bash [Terminal]
npx nuxt generate
npx nuxt preview
```

그런 다음, 보고 싶은 페이지 끝에 쿼리 파라미터 `preview`를 한 번 추가하여 프리뷰 페이지를 볼 수 있습니다:

```js
?preview=true
```

::note
`usePreviewMode`는 `nuxt dev`가 아닌 `nuxt generate` 후 `nuxt preview`로 로컬에서 테스트해야 합니다. ([preview 명령어](/docs/api/commands/preview)는 프리뷰 모드와 관련이 없습니다.)
::
