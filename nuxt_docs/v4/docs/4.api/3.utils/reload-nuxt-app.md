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
`reloadNuxtApp`은 앱을 강제로 새로고침하며, 페이지와 그 의존성을 서버에 다시 요청합니다.
::

기본적으로 현재 앱의 `state`도 함께 저장합니다(즉, `useState`로 접근할 수 있는 모든 상태).

::read-more{to="/docs/4.x/guide/going-further/experimental-features#restorestate" icon="i-lucide-star"}
`nuxt.config` 파일에서 `experimental.restoreState` 옵션을 활성화하면 이 상태의 실험적 복원을 사용할 수 있습니다.
::

## 타입 %{#type}%

```ts [Signature]
export function reloadNuxtApp (options?: ReloadNuxtAppOptions)

interface ReloadNuxtAppOptions {
  ttl?: number
  force?: boolean
  path?: string
  persistState?: boolean
}
```

### `options` (optional) %{#options-optional}%

**Type**: `ReloadNuxtAppOptions`

다음 속성을 받는 객체입니다:

- `path` (optional)

  **Type**: `string`

  **Default**: `window.location.pathname`

  다시 불러올 경로입니다(기본값은 현재 경로). 이것이 현재 window location과 다르면
  내비게이션이 트리거되고 브라우저 히스토리에 항목이 추가됩니다.

- `ttl` (optional)

  **Type**: `number`

  **Default**: `10000`

  이후의 새로고침 요청을 무시할 밀리초 수입니다. 이 시간 안에 다시 호출되면
  `reloadNuxtApp`은 새로고침 루프를 피하기 위해 앱을 다시 로드하지 않습니다.

- `force` (optional)

  **Type**: `boolean`

  **Default**: `false`

  이 옵션을 사용하면 새로고침 루프 보호를 완전히 우회하여, 이전에 지정한 TTL 안에 이미 새로고침이 발생했더라도
  강제로 다시 새로고침할 수 있습니다.

- `persistState` (optional)

  **Type**: `boolean`

  **Default**: `false`

  현재 Nuxt 상태를 sessionStorage(`nuxt:reload:state`)에 저장할지 여부입니다. 기본적으로는
  `experimental.restoreState`도 설정되어 있거나 상태 복원을 직접 처리하지 않는 한 새로고침에 영향을 주지 않습니다.
