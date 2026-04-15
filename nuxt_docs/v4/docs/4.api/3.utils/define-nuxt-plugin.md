---
title: "defineNuxtPlugin"
description: defineNuxtPlugin()은 Nuxt 플러그인을 만들기 위한 헬퍼 함수입니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`defineNuxtPlugin`은 향상된 기능성과 타입 안정성을 갖춘 Nuxt 플러그인을 만들기 위한 헬퍼 함수입니다. 이 유틸리티는 서로 다른 플러그인 형식을 Nuxt의 플러그인 시스템에서 매끄럽게 동작하는 일관된 구조로 정규화합니다.

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp으로 무언가를 수행합니다
})
```

:read-more{to="/docs/4.x/directory-structure/app/plugins#creating-plugins"}

## 타입 %{#type}%

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

## 매개변수 %{#parameters}%

**plugin**: 플러그인은 두 가지 방식으로 정의할 수 있습니다:
1. **함수 플러그인**: [`NuxtApp`](/docs/4.x/guide/going-further/internals#the-nuxtapp-interface) 인스턴스를 받는 함수입니다. [`NuxtApp`](/docs/4.x/guide/going-further/internals#the-nuxtapp-interface) 인스턴스에 헬퍼를 제공하고 싶다면 [`provide`](/docs/4.x/directory-structure/app/plugins#providing-helpers) 속성을 가진 객체를 담은 promise를 반환할 수도 있습니다.
2. **객체 플러그인**: `name`, `enforce`, `dependsOn`, `order`, `parallel`, `setup`, `hooks`, `env` 같은 다양한 속성을 포함해 플러그인 동작을 설정할 수 있는 객체입니다.

| 속성        | 타입                                   | 필수 여부 | 설명                                                                                                                                                                |
|-------------|----------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`      | `string`                               | `false`  | 플러그인의 선택적 이름입니다. 디버깅과 의존성 관리에 유용합니다.                                                                                                    |
| `enforce`   | `'pre'` \| `'default'` \| `'post'`     | `false`  | 다른 플러그인에 비해 언제 실행될지 제어합니다.                                                                                                                      |
| `dependsOn` | `string[]`                             | `false`  | 이 플러그인이 의존하는 플러그인 이름 배열입니다. 올바른 실행 순서를 보장합니다.                                                                                     |
| `order`     | `number`                               | `false`  | 플러그인 순서를 더 세밀하게 제어할 수 있으며 고급 사용자만 사용해야 합니다. **`enforce` 값을 덮어쓰며 플러그인 정렬에 사용됩니다.**                                 |
| `parallel`  | `boolean`                              | `false`  | 다른 병렬 플러그인과 함께 병렬 실행할지 여부입니다.                                                                                                                 |
| `setup`     | `Plugin<T>`{lang="ts"}                 | `false`  | 함수 플러그인과 동일한 메인 플러그인 함수입니다.                                                                                                                    |
| `hooks`     | `Partial<RuntimeNuxtHooks>`{lang="ts"} | `false`  | 직접 등록할 Nuxt 앱 런타임 훅입니다.                                                                                                                                |
| `env`       | `{ islands?: boolean }`{lang="ts"}     | `false`  | 서버 전용 컴포넌트나 island 컴포넌트 렌더링 시 플러그인이 실행되지 않게 하려면 이 값을 `false`로 설정합니다.                                                      |

:video-accordion{title="Nuxt 플러그인의 객체 문법에 대한 Alexander Lichter의 영상을 시청하세요" videoId="2aXZyXB1QGQ"}

## 예제 %{#examples}%

### 기본 사용법 %{#basic-usage}%

아래 예제는 전역 기능을 추가하는 간단한 플러그인을 보여줍니다:

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // Add a global method
  return {
    provide: {
      hello: (name: string) => `안녕하세요 ${name}!`,
    },
  }
})
```

### 객체 문법 플러그인 %{#object-syntax-plugin}%

아래 예제는 고급 설정이 포함된 객체 문법을 보여줍니다:

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
      console.log('앱이 생성되었습니다!')
    },
  },
})
```
