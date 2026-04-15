---
title: 'useRuntimeConfig'
description: 'useRuntimeConfig 컴포저블로 런타임 설정 변수에 접근합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

## Usage %{#usage}%

```vue [app/app.vue]
<script setup lang="ts">
const config = useRuntimeConfig()
</script>
```

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
})
```

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

## 런타임 설정 정의 %{#define-runtime-config}%

아래 예시는 공개 API 기본 URL과 서버에서만 접근 가능한 비밀 API 토큰을 설정하는 방법을 보여줍니다.

`runtimeConfig` 변수는 항상 `nuxt.config` 안에서 정의해야 합니다.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // 비공개 키는 서버에서만 사용할 수 있습니다
    apiSecret: '123',

    // 클라이언트에 노출되는 공개 키
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },
})
```

::note
서버에서 접근 가능해야 하는 변수는 `runtimeConfig` 안에 직접 추가합니다. 클라이언트와 서버 모두에서 접근 가능해야 하는 변수는 `runtimeConfig.public`에 정의합니다.
::

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

## 런타임 설정 접근 %{#access-runtime-config}%

런타임 설정에 접근하려면 `useRuntimeConfig()` 컴포저블을 사용할 수 있습니다:

```ts [server/api/test.ts]
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

    // 공개 변수에 접근
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // 비공개 변수에 접근 (서버에서만 사용 가능)
      Authorization: `Bearer ${config.apiSecret}`,
    },
  })
  return result
})
```

이 예시에서 `apiBase`는 `public` 네임스페이스 안에 정의되어 있으므로 서버와 클라이언트 양쪽에서 모두 접근할 수 있고, `apiSecret`은 **서버 사이드에서만 접근할 수 있습니다**.

## Environment Variables %{#environment-variables}%

`NUXT_` 접두사가 붙은 일치하는 환경 변수 이름을 사용해 런타임 설정 값을 업데이트할 수 있습니다.

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

### `.env` 파일 사용하기 %{#using-the-env-file}%

`.env` 파일 안에 환경 변수를 설정하면 **development** 및 **build/generate** 중에 접근할 수 있습니다.

```ini [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::note
`.env` 파일 안에 설정된 모든 환경 변수는 **development** 및 **build/generate** 중에 Nuxt 앱에서 `process.env`를 사용해 접근합니다.
::

::warning
**프로덕션 런타임**에서는 플랫폼 환경 변수를 사용해야 하며 `.env`는 사용되지 않습니다.
::

:read-more{to="/docs/4.x/directory-structure/env"}

## `app` 네임스페이스 %{#app-namespace}%

Nuxt는 런타임 설정에서 `baseURL`, `cdnURL` 등을 포함하는 `app` 네임스페이스를 사용합니다. 환경 변수를 설정해 런타임 시 해당 값을 사용자 지정할 수 있습니다.

::note
이는 예약된 네임스페이스입니다. `app` 안에 추가 키를 도입하면 안 됩니다.
::

### `app.baseURL` %{#app-baseurl}%

By default, the `baseURL` is set to `'/'`.

하지만 `baseURL`은 `NUXT_APP_BASE_URL`을 환경 변수로 설정해 런타임 시 업데이트할 수 있습니다.

그런 다음 `config.app.baseURL`을 사용해 이 새 기본 URL에 접근할 수 있습니다:

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  // baseURL에 어디서나 접근
  const baseURL = config.app.baseURL
})
```

### `app.cdnURL` %{#app-cdnurl}%

이 예시는 사용자 지정 CDN url을 설정하고 `useRuntimeConfig()`로 접근하는 방법을 보여줍니다.

`NUXT_APP_CDN_URL` 환경 변수를 사용하면 `.output/public` 안의 정적 자산을 제공하는 사용자 지정 CDN을 사용할 수 있습니다.

그런 다음 `config.app.cdnURL`을 사용해 새 CDN url에 접근합니다.

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()

  // cdnURL에 어디서나 접근
  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}
