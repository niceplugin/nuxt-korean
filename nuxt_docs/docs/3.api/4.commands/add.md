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

### [인자](#arguments)

<!--add-args-->
인자 | 설명
--- | ---
`TEMPLATE` | 생성할 템플릿을 지정합니다 (옵션: <api\|plugin\|component\|composable\|middleware\|layout\|page\|layer>)
`NAME` | 생성될 파일의 이름을 지정합니다
<!--/add-args-->

### [옵션](#options)

<!--add-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` | `.` | 작업 디렉토리를 지정합니다
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--force` | `false` | 파일이 이미 존재할 경우 강제로 덮어씁니다
<!--/add-opts-->

**수정자:**

일부 템플릿은 이름에 접미사(예: `.client` 또는 `.get`)를 추가할 수 있는 추가 수정자 플래그를 지원합니다.

```bash [Terminal]
# `/plugins/sockets.client.ts`를 생성합니다
npx nuxt add plugin sockets --client
```

## [`nuxt add component`](#nuxt-add-component)

* 수정자 플래그: `--mode client|server` 또는 `--client` 또는 `--server`

```bash [Terminal]
# `components/TheHeader.vue`를 생성합니다
npx nuxt add component TheHeader
```

## [`nuxt add composable`](#nuxt-add-composable)

```bash [Terminal]
# `composables/foo.ts`를 생성합니다
npx nuxt add composable foo
```

## [`nuxt add layout`](#nuxt-add-layout)

```bash [Terminal]
# `layouts/custom.vue`를 생성합니다
npx nuxt add layout custom
```

## [`nuxt add plugin`](#nuxt-add-plugin)

* 수정자 플래그: `--mode client|server` 또는 `--client` 또는 `--server`

```bash [Terminal]
# `plugins/analytics.ts`를 생성합니다
npx nuxt add plugin analytics
```

## [`nuxt add page`](#nuxt-add-page)

```bash [Terminal]
# `pages/about.vue`를 생성합니다
npx nuxt add page about
```

```bash [Terminal]
# `pages/category/[id].vue`를 생성합니다
npx nuxt add page "category/[id]"
```

## [`nuxt add middleware`](#nuxt-add-middleware)

* 수정자 플래그: `--global`

```bash [Terminal]
# `middleware/auth.ts`를 생성합니다
npx nuxt add middleware auth
```

## [`nuxt add api`](#nuxt-add-api)

* 수정자 플래그: `--method` ( `connect`, `delete`, `get`, `head`, `options`, `patch`, `post`, `put` 또는 `trace`를 받을 수 있습니다) 또는 직접적으로 `--get`, `--post` 등도 사용할 수 있습니다.

```bash [Terminal]
# `server/api/hello.ts`를 생성합니다
npx nuxt add api hello
```

## [`nuxt add layer`](#nuxt-add-layer)

```bash [Terminal]
# `layers/subscribe/nuxt.config.ts`를 생성합니다
npx nuxt add layer subscribe
```
