---
title: 'reloadNuxtApp'
description: reloadNuxtApp은 페이지를 강제로 새로고침합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::note
`reloadNuxtApp`은 앱을 강제로 새로고침하여, 페이지와 그 의존성을 서버에서 다시 요청합니다.
::

기본적으로, 현재 앱의 `state`(즉, `useState`로 접근할 수 있는 모든 상태)를 저장합니다.

::read-more{to="/docs/guide/going-further/experimental-features#restorestate" icon="i-lucide-star"}
`nuxt.config` 파일에서 `experimental.restoreState` 옵션을 활성화하면 이 상태의 실험적 복원을 사용할 수 있습니다.
::

## [타입](#type)

```ts
reloadNuxtApp(options?: ReloadNuxtAppOptions)

interface ReloadNuxtAppOptions {
  ttl?: number
  force?: boolean
  path?: string
  persistState?: boolean
}
```

### [`options` (선택)](#options-optional)

**타입**: `ReloadNuxtAppOptions`

다음 속성을 받는 객체입니다:

- `path` (선택)

  **타입**: `string`

  **기본값**: `window.location.pathname`

  새로고침할 경로(기본값은 현재 경로). 이 값이 현재 window 위치와 다르면
  네비게이션이 발생하고 브라우저 히스토리에 항목이 추가됩니다.

- `ttl` (선택)

  **타입**: `number`

  **기본값**: `10000`

  향후 새로고침 요청을 무시할 밀리초 단위의 시간입니다. 이 시간 내에 다시 호출되면,
  `reloadNuxtApp`은 새로고침 루프를 방지하기 위해 앱을 새로고침하지 않습니다.

- `force` (선택)

  **타입**: `boolean`

  **기본값**: `false`

  이 옵션을 사용하면 새로고침 루프 보호를 완전히 우회하여,
  이전에 지정한 TTL 내에 새로고침이 발생했더라도 강제로 새로고침할 수 있습니다.

- `persistState` (선택)

  **타입**: `boolean`

  **기본값**: `false`

  현재 Nuxt 상태를 sessionStorage(키: `nuxt:reload:state`)에 저장할지 여부입니다.
  기본적으로는 `experimental.restoreState`가 설정되어 있거나, 직접 상태 복원을 처리하지 않는 한 새로고침에 아무런 영향을 주지 않습니다.
