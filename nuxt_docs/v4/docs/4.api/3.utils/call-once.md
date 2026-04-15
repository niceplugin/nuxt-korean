---
title: "callOnce"
description: "SSR 또는 CSR 동안 주어진 함수나 코드 블록을 한 번만 실행합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/once.ts
    size: xs
---

::important
이 유틸리티는 [Nuxt v3.9](/blog/v3-9)부터 사용할 수 있습니다.
::

## 목적 %{#purpose}%

`callOnce` 함수는 다음 상황에서 주어진 함수나 코드 블록을 한 번만 실행하도록 설계되었습니다:
- 서버 사이드 렌더링(단, hydration은 제외)
- 클라이언트 사이드 내비게이션

이벤트를 기록하거나 전역 상태를 설정하는 것처럼 한 번만 실행되어야 하는 코드에 유용합니다.

## 사용법 %{#usage}%

`callOnce`의 기본 모드는 코드를 한 번만 실행하는 것입니다. 예를 들어 코드가 서버에서 실행되면 클라이언트에서는 다시 실행되지 않습니다. 또한 클라이언트에서 이 페이지로 다시 돌아오는 등 `callOnce`를 여러 번 호출해도 다시 실행되지 않습니다.

```vue [app/app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('이 로그는 한 번만 출력됩니다')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

초기 서버/클라이언트 이중 로드를 피하면서도 매 내비게이션마다 실행되게 할 수도 있습니다. 이를 위해 `navigation` 모드를 사용할 수 있습니다:

```vue [app/app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('이 로그는 한 번 출력된 뒤 모든 클라이언트 사이드 내비게이션마다 출력됩니다')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
`navigation` 모드는 [Nuxt v3.15](/blog/v3-15)부터 사용할 수 있습니다.
::

::tip{to="/docs/4.x/getting-started/state-management#usage-with-pinia"}
`callOnce`는 store action을 호출할 때 [Pinia module](/modules/pinia)과 함께 쓰면 유용합니다.
::

:read-more{to="/docs/4.x/getting-started/state-management"}

::warning
`callOnce`는 아무 값도 반환하지 않는다는 점에 유의하세요. SSR 중 데이터 패칭을 하려면 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 또는 [`useFetch`](/docs/4.x/api/composables/use-fetch)를 사용해야 합니다.
::

::note
`callOnce`는 setup 함수, plugin, route middleware 안에서 직접 호출하도록 설계된 컴포저블입니다. 페이지가 hydrate될 때 클라이언트에서 함수를 다시 호출하지 않도록 Nuxt payload에 데이터를 추가해야 하기 때문입니다.
::

## 타입 %{#type}%

```ts [Signature]
export function callOnce (key?: string, fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>
export function callOnce (fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>

type CallOnceOptions = {
  /**
   * callOnce 함수의 실행 모드
   * @default 'render'
   */
  mode?: 'navigation' | 'render'
}
```

## 매개변수 %{#parameters}%

- `key`: 코드가 한 번만 실행되도록 보장하는 고유 키입니다. 키를 제공하지 않으면 `callOnce` 인스턴스의 파일과 줄 번호를 기준으로 고유한 키가 자동 생성됩니다.
- `fn`: 한 번 실행할 함수입니다. 비동기 함수일 수 있습니다.
- `options`: 내비게이션 시 다시 실행할지(`navigation`), 앱 수명 동안 한 번만 실행할지(`render`) 모드를 설정합니다. 기본값은 `render`입니다.
  - `render`: 초기 렌더링 중 한 번 실행됩니다(SSR 또는 CSR) - 기본 모드
  - `navigation`: 초기 렌더링 중 한 번, 이후 각 클라이언트 사이드 내비게이션마다 한 번 실행됩니다
