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
[`app.config`](/docs/4.x/directory-structure/app/app-config)를 깊은 할당(deep assignment)을 사용해 업데이트합니다. 기존 (중첩된) 속성은 유지됩니다.
::

## Usage %{usage}%

```js
import { updateAppConfig, useAppConfig } from '#imports'

const appConfig = useAppConfig() // { foo: 'bar' }

const newAppConfig = { foo: 'baz' }
updateAppConfig(newAppConfig)

console.log(appConfig) // { foo: 'baz' }
```

:read-more{to="/docs/4.x/directory-structure/app/app-config"}
