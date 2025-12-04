---
title: 'createError'
description: 추가 메타데이터와 함께 에러 객체를 생성합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

이 함수를 사용하면 추가 메타데이터와 함께 에러 객체를 생성할 수 있습니다. 이 함수는 앱의 Vue 부분과 Nitro 부분 모두에서 사용할 수 있으며, `throw` 하도록 설계되었습니다.

## Parameters %{parameters}%

- `err`: `string | { cause, data, message, name, stack, statusCode, statusMessage, fatal }`

`createError` 함수에는 문자열 또는 객체를 전달할 수 있습니다. 문자열을 전달하면 에러의 `message`로 사용되며, `statusCode`는 기본값으로 `500`이 됩니다. 객체를 전달하면 `statusCode`, `message` 및 기타 에러 속성과 같은 에러의 여러 속성을 설정할 수 있습니다.

## In Vue App %{in-vue-app}%

`createError`로 생성한 에러를 `throw` 하면:

- 서버 사이드에서는 전체 화면 에러 페이지가 표시되며, `clearError`로 이를 지울 수 있습니다.
- 클라이언트 사이드에서는 처리할 수 있는 비치명적(non-fatal) 에러가 발생합니다. 전체 화면 에러 페이지를 표시해야 한다면 `fatal: true`로 설정하여 트리거할 수 있습니다.

### Example %{example}%

```vue [app/pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>
```

## In API Routes %{in-api-routes}%

서버 API 라우트에서 에러 처리를 트리거하기 위해 `createError`를 사용합니다.

### Example %{example}%

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
})
```

API 라우트에서는 짧은 `statusMessage`를 포함한 객체를 `createError`에 전달하는 방식이 권장됩니다. 이렇게 하면 클라이언트 측에서 접근할 수 있기 때문입니다. 그렇지 않으면 API 라우트에서 `createError`에 전달한 `message`는 클라이언트로 전파되지 않습니다. 대신 `data` 속성을 사용하여 클라이언트로 데이터를 전달할 수도 있습니다. 어떤 경우든, 잠재적인 보안 문제를 피하기 위해 동적인 사용자 입력을 메시지에 넣지 않도록 항상 주의해야 합니다.

:read-more{to="/docs/4.x/getting-started/error-handling"}
