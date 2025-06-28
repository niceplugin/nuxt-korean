---
title: "callOnce"
description: "SSR 또는 CSR 중에 주어진 함수나 코드 블록을 한 번만 실행합니다."
navigation:
  badge: New
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/once.ts
    size: xs
---

::important
이 유틸리티는 [Nuxt v3.9](/blog/v3-9)부터 사용할 수 있습니다.
::

## [목적](#purpose)

`callOnce` 함수는 다음 상황에서 주어진 함수나 코드 블록을 한 번만 실행하도록 설계되었습니다:
- 서버 사이드 렌더링 중이지만 하이드레이션 중에는 아님
- 클라이언트 사이드 네비게이션

이것은 이벤트 로깅이나 전역 상태 설정과 같이 한 번만 실행되어야 하는 코드에 유용합니다.

## [사용법](#usage)

`callOnce`의 기본 모드는 코드를 한 번만 실행하는 것입니다. 예를 들어, 코드가 서버에서 실행되면 클라이언트에서는 다시 실행되지 않습니다. 또한 클라이언트에서 `callOnce`를 여러 번 호출해도(예: 이 페이지로 다시 이동할 때) 다시 실행되지 않습니다.

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('이 메시지는 한 번만 로그됩니다')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

초기 서버/클라이언트의 이중 로드를 피하면서도 모든 네비게이션마다 실행되도록 할 수도 있습니다. 이를 위해 `navigation` 모드를 사용할 수 있습니다:

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('이 메시지는 한 번만 로그되고 이후 클라이언트 사이드 네비게이션마다 로그됩니다')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
`navigation` 모드는 [Nuxt v3.15](/blog/v3-15)부터 사용할 수 있습니다.
::

::tip{to="/docs/getting-started/state-management#usage-with-pinia"}
`callOnce`는 [Pinia 모듈](/modules/pinia)과 결합하여 스토어 액션을 호출할 때 유용합니다.
::

:read-more{to="/docs/getting-started/state-management"}

::warning
`callOnce`는 아무것도 반환하지 않는다는 점에 유의하세요. SSR 중에 데이터 패칭을 하고 싶다면 [`useAsyncData`](/docs/api/composables/use-async-data)나 [`useFetch`](/docs/api/composables/use-fetch)를 사용해야 합니다.
::

::note
`callOnce`는 setup 함수, 플러그인, 또는 라우트 미들웨어에서 직접 호출하도록 설계된 컴포저블입니다. 이는 페이지 하이드레이션 시 클라이언트에서 함수를 다시 호출하지 않도록 Nuxt 페이로드에 데이터를 추가해야 하기 때문입니다.
::

## [타입](#type)

```ts
callOnce (key?: string, fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>
callOnce(fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>

type CallOnceOptions = {
  /**
   * callOnce 함수의 실행 모드
   * @default 'render'
   */
  mode?: 'navigation' | 'render'
}
```

## [파라미터](#parameters)

- `key`: 코드가 한 번만 실행되도록 보장하는 고유 키입니다. 키를 제공하지 않으면, `callOnce` 인스턴스의 파일과 줄 번호에 고유한 키가 자동으로 생성됩니다.
- `fn`: 한 번 실행할 함수입니다. 비동기 함수일 수 있습니다.
- `options`: 모드를 설정합니다. 네비게이션 시 재실행(`navigation`)하거나 앱의 수명 동안 한 번만 실행(`render`)할 수 있습니다. 기본값은 `render`입니다.
  - `render`: 초기 렌더링(SSR 또는 CSR) 중 한 번만 실행 - 기본 모드
  - `navigation`: 초기 렌더링 중 한 번, 그리고 이후 클라이언트 사이드 네비게이션마다 한 번씩 실행
