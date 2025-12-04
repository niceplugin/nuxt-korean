---
title: 'reloadNuxtApp'
description: reloadNuxtApp은 페이지를 강제로 새로 고칩니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::note
`reloadNuxtApp`은 앱을 강제로 새로 고쳐, 페이지와 그 의존성을 서버에서 다시 요청합니다.
::

기본적으로, 앱의 현재 `state`(즉, `useState`로 접근할 수 있는 모든 상태)도 함께 저장합니다.

::read-more{to="/docs/4.x/guide/going-further/experimental-features#restorestate" icon="i-lucide-star"}
`nuxt.config` 파일에서 `experimental.restoreState` 옵션을 활성화하여 이 상태의 실험적 복원을 사용할 수 있습니다.
::

## Type %{type}%

```ts [Signature]
export function reloadNuxtApp (options?: ReloadNuxtAppOptions)

interface ReloadNuxtAppOptions {
  ttl?: number
  force?: boolean
  path?: string
  persistState?: boolean
}
```

### `options` (optional) %{options-optional}%

**Type**: `ReloadNuxtAppOptions`

다음 속성을 받는 객체입니다:

- `path` (optional)

  **Type**: `string`

  **Default**: `window.location.pathname`

  새로 고칠 경로(기본값은 현재 경로)입니다. 이 값이 현재 윈도우 위치와 다르면
  탐색이 트리거되고 브라우저 히스토리에 항목이 추가됩니다.

- `ttl` (optional)

  **Type**: `number`

  **Default**: `10000`

  향후 새로 고침 요청을 무시할 밀리초 단위의 시간입니다. 이 시간 내에 다시 호출되면,
  `reloadNuxtApp`은 새로 고침 루프를 방지하기 위해 앱을 새로 고치지 않습니다.

- `force` (optional)

  **Type**: `boolean`

  **Default**: `false`

  이 옵션은 새로 고침 루프 보호를 완전히 우회하여, 이전에 지정된 TTL 내에 새로 고침이 발생했더라도
  강제로 새로 고침을 수행하도록 합니다.

- `persistState` (optional)

  **Type**: `boolean`

  **Default**: `false`

  현재 Nuxt 상태를 sessionStorage(`nuxt:reload:state`로) 에 덤프할지 여부입니다. 기본적으로는
  `experimental.restoreState`가 설정되어 있지 않거나, 직접 상태 복원을 처리하지 않는 한 새로 고침 시 아무런 효과가 없습니다.
