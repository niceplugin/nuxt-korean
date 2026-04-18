---
title: 'createError'
description: 추가 메타데이터를 포함한 오류 객체를 생성합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

이 함수를 사용해 추가 메타데이터를 포함한 오류 객체를 만들 수 있습니다. 이 함수는 앱의 Vue 영역과 Nitro 영역 모두에서 사용할 수 있으며, throw하는 용도로 설계되었습니다.

## 매개변수 %{#parameters}%

- `err`: `string | { cause, data, message, name, stack, status, statusText, fatal }`

`createError` 함수에는 문자열이나 객체를 전달할 수 있습니다. 문자열을 전달하면 오류 `message`로 사용되고 `status`는 기본값 `500`이 됩니다. 객체를 전달하면 `status`, `message` 및 기타 오류 속성처럼 여러 속성을 설정할 수 있습니다.

## Vue 앱에서 %{#in-vue-app}%

`createError`로 생성한 오류를 throw하면:

- 서버 사이드에서는 전체 화면 오류 페이지가 트리거되며 `clearError`로 이를 해제할 수 있습니다.
- 클라이언트 사이드에서는 직접 처리할 수 있는 non-fatal 오류가 throw됩니다. 전체 화면 오류 페이지를 띄워야 한다면 `fatal: true`를 설정하면 됩니다.

### 예제 %{#example}%

```vue [app/pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ status: 404, statusText: '페이지를 찾을 수 없음' })
}
</script>
```

## API 라우트에서 %{#in-api-routes}%

서버 API 라우트에서 오류 처리를 트리거하려면 `createError`를 사용하세요.

### 예제 %{#example}%

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    status: 404,
    statusText: '페이지를 찾을 수 없음',
  })
})
```

API 라우트에서는 짧은 `statusText`를 포함한 객체를 전달해 `createError`를 사용하는 것이 권장됩니다. 이 값은 클라이언트 사이드에서 접근할 수 있기 때문입니다. 그렇지 않으면 API 라우트에서 `createError`에 전달한 `message`는 클라이언트로 전파되지 않습니다. 또는 `data` 속성을 사용해 클라이언트로 데이터를 되돌려줄 수도 있습니다. 어떤 경우든 잠재적인 보안 문제를 피하기 위해 동적인 사용자 입력을 메시지에 넣지 않도록 항상 주의해야 합니다.

:read-more{to="/docs/4.x/getting-started/error-handling"}
