---
title: "nuxt add"
description: "Nuxt 애플리케이션에 엔티티를 스캐폴딩합니다."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/add.ts
    size: xs
---

<!--add-cmd-->
```bash [Terminal]
npx nuxt add <TEMPLATE> <NAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--force]
```
<!--/add-cmd-->

### Arguments %{arguments}%

<!--add-args-->
Argument | Description
--- | ---
`TEMPLATE` | 어떤 템플릿을 생성할지 지정합니다 (옵션: <api\|app\|app-config\|component\|composable\|error\|layer\|layout\|middleware\|module\|page\|plugin\|server-middleware\|server-plugin\|server-route\|server-util>)
`NAME` | 생성될 파일의 이름을 지정합니다
<!--/add-args-->

### Options %{options}%

<!--add-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` | `.` | 작업 디렉터리를 지정합니다
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--force` | `false` | 파일이 이미 존재하더라도 강제로 덮어씁니다
<!--/add-opts-->

**Modifiers:**

일부 템플릿은 이름에 접미사(예: `.client` 또는 `.get`)를 추가하기 위한 추가 modifier 플래그를 지원합니다.

```bash [Terminal]
# `/plugins/sockets.client.ts`를 생성합니다
npx nuxt add plugin sockets --client
```

## `nuxt add component` %{nuxt-add-component}%

* Modifier 플래그: `--mode client|server` 또는 `--client` 또는 `--server`

```bash [Terminal]
# `app/components/TheHeader.vue`를 생성합니다
npx nuxt add component TheHeader
```

## `nuxt add composable` %{nuxt-add-composable}%

```bash [Terminal]
# `app/composables/foo.ts`를 생성합니다
npx nuxt add composable foo
```

## `nuxt add layout` %{nuxt-add-layout}%

```bash [Terminal]
# `app/layouts/custom.vue`를 생성합니다
npx nuxt add layout custom
```

## `nuxt add plugin` %{nuxt-add-plugin}%

* Modifier 플래그: `--mode client|server` 또는 `--client`또는 `--server`

```bash [Terminal]
# `app/plugins/analytics.ts`를 생성합니다
npx nuxt add plugin analytics
```

## `nuxt add page` %{nuxt-add-page}%

```bash [Terminal]
# `app/pages/about.vue`를 생성합니다
npx nuxt add page about
```

```bash [Terminal]
# `app/pages/category/[id].vue`를 생성합니다
npx nuxt add page "category/[id]"
```

## `nuxt add middleware` %{nuxt-add-middleware}%

* Modifier 플래그: `--global`

```bash [Terminal]
# `app/middleware/auth.ts`를 생성합니다
npx nuxt add middleware auth
```

## `nuxt add api` %{nuxt-add-api}%

* Modifier 플래그: `--method` (`connect`, `delete`, `get`, `head`, `options`, `patch`, `post`, `put`, `trace` 중 하나를 받을 수 있음) 또는 대신 `--get`, `--post` 등과 같이 직접 사용할 수 있습니다.

```bash [Terminal]
# `server/api/hello.ts`를 생성합니다
npx nuxt add api hello
```

## `nuxt add layer` %{nuxt-add-layer}%

```bash [Terminal]
# `layers/subscribe/nuxt.config.ts`를 생성합니다
npx nuxt add layer subscribe
```
