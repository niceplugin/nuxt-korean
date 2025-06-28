---
title: 'updateAppConfig'
description: '런타임에 앱 설정을 업데이트합니다.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/config.ts
    size: xs
---

::note
[`app.config`](/docs/guide/directory-structure/app-config)를 딥 할당을 사용하여 업데이트합니다. 기존(중첩된) 속성은 유지됩니다.
::

## [사용법](#usage)

```js
const appConfig = useAppConfig() // { foo: 'bar' }

const newAppConfig = { foo: 'baz' }

updateAppConfig(newAppConfig)

console.log(appConfig) // { foo: 'baz' }
```

:read-more{to="/docs/guide/directory-structure/app-config"}
