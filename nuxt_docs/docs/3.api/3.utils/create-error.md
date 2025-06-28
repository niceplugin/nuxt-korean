---
title: 'createError'
description: 추가 메타데이터와 함께 오류 객체를 생성합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

이 함수를 사용하여 추가 메타데이터와 함께 오류 객체를 생성할 수 있습니다. 이 함수는 앱의 Vue와 Nitro 부분 모두에서 사용할 수 있으며, throw를 위해 설계되었습니다.

## [매개변수](#parameters)

- `err`: `string | { cause, data, message, name, stack, statusCode, statusMessage, fatal }`

`createError` 함수에는 문자열 또는 객체를 전달할 수 있습니다. 문자열을 전달하면 오류의 `message`로 사용되며, `statusCode`는 기본값으로 `500`이 됩니다. 객체를 전달하면 `statusCode`, `message` 등 오류의 여러 속성을 설정할 수 있습니다.

## [Vue 앱에서](#in-vue-app)

`createError`로 생성된 오류를 throw하면:

- 서버 사이드에서는 전체 화면 오류 페이지가 표시되며, `clearError`로 이를 해제할 수 있습니다.
- 클라이언트 사이드에서는 치명적이지 않은 오류가 throw되어 직접 처리할 수 있습니다. 전체 화면 오류 페이지를 표시하려면 `fatal: true`로 설정하면 됩니다.

### [예시](#example)

```vue [pages/movies/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>
```

## [API 라우트에서](#in-api-routes)

서버 API 라우트에서 오류 처리를 트리거하려면 `createError`를 사용하세요.

### [예시](#example)

```ts [server/api/error.ts]
export default eventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
})
```

API 라우트에서는 짧은 `statusMessage`가 포함된 객체를 전달하여 `createError`를 사용하는 것이 권장됩니다. 이는 클라이언트 측에서 접근할 수 있기 때문입니다. 그렇지 않으면, API 라우트에서 `createError`에 전달된 `message`는 클라이언트로 전파되지 않습니다. 또는 `data` 속성을 사용하여 데이터를 클라이언트로 전달할 수도 있습니다. 어떤 경우든, 잠재적인 보안 문제를 피하기 위해 동적 사용자 입력을 메시지에 포함하지 않는 것이 좋습니다.

:read-more{to="/docs/getting-started/error-handling"}
