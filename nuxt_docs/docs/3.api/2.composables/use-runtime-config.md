---
title: 'useRuntimeConfig'
description: 'useRuntimeConfig 컴포저블로 런타임 구성 변수에 접근하세요.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

## [사용법](#usage)

```vue [app.vue]
<script setup lang="ts">
const config = useRuntimeConfig()
</script>
```

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
})
```

:read-more{to="/docs/guide/going-further/runtime-config"}

## [런타임 구성 정의](#define-runtime-config)

아래 예시는 공개 API 기본 URL과 서버에서만 접근 가능한 비밀 API 토큰을 설정하는 방법을 보여줍니다.

`runtimeConfig` 변수는 항상 `nuxt.config` 내부에 정의해야 합니다.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // 비공개 키는 서버에서만 사용할 수 있습니다
    apiSecret: '123',

    // 클라이언트에 노출되는 공개 키
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
```

::note
서버에서만 접근해야 하는 변수는 `runtimeConfig` 내부에 직접 추가합니다. 클라이언트와 서버 모두에서 접근해야 하는 변수는 `runtimeConfig.public`에 정의합니다.
::

:read-more{to="/docs/guide/going-further/runtime-config"}

## [런타임 구성 접근](#access-runtime-config)

런타임 구성에 접근하려면 `useRuntimeConfig()` 컴포저블을 사용할 수 있습니다:

```ts [server/api/test.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // 공개 변수에 접근
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // 비공개 변수에 접근 (서버에서만 사용 가능)
      Authorization: `Bearer ${config.apiSecret}`
    }
  })
  return result
}
```

이 예시에서 `apiBase`는 `public` 네임스페이스 내에 정의되어 있으므로 서버와 클라이언트 모두에서 접근할 수 있지만, `apiSecret`은 **서버에서만 접근할 수 있습니다**.

## [환경 변수](#environment-variables)

`NUXT_`로 접두사가 붙은 일치하는 환경 변수 이름을 사용하여 런타임 구성 값을 업데이트할 수 있습니다.

:read-more{to="/docs/guide/going-further/runtime-config"}

### [`.env` 파일 사용하기](#using-the-env-file)

**개발** 및 **빌드/생성** 중에 접근할 수 있도록 `.env` 파일 내에 환경 변수를 설정할 수 있습니다.

```ini [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::note
`.env` 파일 내에 설정된 모든 환경 변수는 **개발** 및 **빌드/생성** 중에 Nuxt 앱에서 `process.env`를 사용하여 접근할 수 있습니다.
::

::warning
**프로덕션 런타임**에서는 플랫폼 환경 변수를 사용해야 하며, `.env`는 사용되지 않습니다.
::

:read-more{to="/docs/guide/directory-structure/env"}

## [`app` 네임스페이스](#app-namespace)

Nuxt는 런타임 구성에서 `baseURL`과 `cdnURL`을 포함하는 키와 함께 `app` 네임스페이스를 사용합니다. 환경 변수를 설정하여 런타임에 이 값들을 커스터마이즈할 수 있습니다.

::note
이 네임스페이스는 예약되어 있습니다. `app` 내부에 추가 키를 도입해서는 안 됩니다.
::

### [`app.baseURL`](#appbaseurl)

기본적으로 `baseURL`은 `'/'`로 설정되어 있습니다.

하지만, 환경 변수로 `NUXT_APP_BASE_URL`을 설정하여 런타임에 `baseURL`을 업데이트할 수 있습니다.

그런 다음, `config.app.baseURL`을 사용하여 이 새로운 기본 URL에 접근할 수 있습니다:

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  // baseURL에 범용적으로 접근
  const baseURL = config.app.baseURL
})
```

### [`app.cdnURL`](#appcdnurl)

이 예시는 커스텀 CDN url을 설정하고 `useRuntimeConfig()`를 사용하여 접근하는 방법을 보여줍니다.

`.output/public` 내부의 정적 자산을 제공하기 위해 `NUXT_APP_CDN_URL` 환경 변수를 사용하여 커스텀 CDN을 사용할 수 있습니다.

그리고 `config.app.cdnURL`을 사용하여 새로운 CDN url에 접근할 수 있습니다.

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // cdnURL에 범용적으로 접근
  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/guide/going-further/runtime-config"}
