---
title: "defineNuxtPlugin"
description: defineNuxtPlugin()은 Nuxt 플러그인을 생성하기 위한 도우미 함수입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`defineNuxtPlugin`은 향상된 기능과 타입 안정성을 갖춘 Nuxt 플러그인을 생성하기 위한 도우미 함수입니다. 이 유틸리티는 서로 다른 플러그인 형식을 Nuxt의 플러그인 시스템 내에서 원활하게 동작하는 일관된 구조로 정규화합니다.

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp으로 무언가를 수행
})
```

:read-more{to="/docs/4.x/directory-structure/app/plugins#creating-plugins"}

## Type %{type}%

```ts [Signature]
export function defineNuxtPlugin<T extends Record<string, unknown>> (plugin: Plugin<T> | ObjectPlugin<T>): Plugin<T> & ObjectPlugin<T>

type Plugin<T> = (nuxt: NuxtApp) => Promise<void> | Promise<{ provide?: T }> | void | { provide?: T }

interface ObjectPlugin<T> {
  name?: string
  enforce?: 'pre' | 'default' | 'post'
  dependsOn?: string[]
  order?: number
  parallel?: boolean
  setup?: Plugin<T>
  hooks?: Partial<RuntimeNuxtHooks>
  env?: {
    islands?: boolean
  }
}
```

## Parameters %{parameters}%

**plugin**: 플러그인은 두 가지 방식으로 정의할 수 있습니다:
1. **함수 플러그인(Function Plugin)**: [`NuxtApp`](/docs/4.x/guide/going-further/internals#the-nuxtapp-interface) 인스턴스를 인자로 받는 함수로, [`NuxtApp`](/docs/4.x/guide/going-further/internals#the-nuxtapp-interface) 인스턴스에 헬퍼를 제공하고 싶다면 [`provide`](/docs/4.x/directory-structure/app/plugins#providing-helpers) 속성을 가진 객체를 포함할 수 있는 프로미스를 반환할 수 있습니다.
2. **객체 플러그인(Object Plugin)**: `name`, `enforce`, `dependsOn`, `order`, `parallel`, `setup`, `hooks`, `env` 등 플러그인의 동작을 구성하기 위한 다양한 속성을 포함할 수 있는 객체입니다.

| Property           | Type                                                                 | Required | Description                                                                                                     |
| ------------------ | -------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `name` | `string` | `false` | 디버깅 및 의존성 관리를 위해 유용한 선택적 플러그인 이름입니다. |
| `enforce` | `'pre'` \| `'default'` \| `'post'` | `false` | 다른 플러그인과 비교하여 이 플러그인이 언제 실행될지를 제어합니다. |
| `dependsOn` | `string[]` | `false` | 이 플러그인이 의존하는 플러그인 이름의 배열입니다. 올바른 실행 순서를 보장합니다. |
| `order` | `number` | `false` | 플러그인 순서를 더 세밀하게 제어할 수 있으며, 고급 사용자만 사용하는 것이 좋습니다. **`enforce` 값보다 우선하며 플러그인 정렬에 사용됩니다.** |
| `parallel` | `boolean` | `false` | 다른 병렬 플러그인과 함께 이 플러그인을 병렬로 실행할지 여부입니다. |
| `setup` | `Plugin<T>`{lang="ts"}  | `false` | 함수 플러그인과 동일한, 주요 플러그인 함수입니다. |
| `hooks` | `Partial<RuntimeNuxtHooks>`{lang="ts"}  | `false` | Nuxt 앱 런타임 훅을 직접 등록합니다. |
| `env` | `{ islands?: boolean }`{lang="ts"}  | `false` | 서버 전용 또는 아일랜드 컴포넌트를 렌더링할 때 플러그인을 실행하지 않으려면 이 값을 `false`로 설정하세요. |

:video-accordion{title="Nuxt 플러그인을 위한 Object Syntax에 대해 Alexander Lichter가 설명하는 영상 보기" videoId="2aXZyXB1QGQ"}

## Examples %{examples}%

### Basic Usage %{basic-usage}%

아래 예시는 전역 기능을 추가하는 간단한 플러그인을 보여줍니다:

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // 전역 메서드 추가
  return {
    provide: {
      hello: (name: string) => `Hello ${name}!`,
    },
  }
})
```

### Object Syntax Plugin %{object-syntax-plugin}%

아래 예시는 고급 구성을 포함한 객체 문법을 보여줍니다:

```ts twoslash [plugins/advanced.ts]
export default defineNuxtPlugin({
  name: 'my-plugin',
  enforce: 'pre',
  async setup (nuxtApp) {
    // 플러그인 설정 로직
    const data = await $fetch('/api/config')

    return {
      provide: {
        config: data,
      },
    }
  },
  hooks: {
    'app:created' () {
      console.log('App created!')
    },
  },
})
```
