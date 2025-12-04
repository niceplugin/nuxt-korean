---
title: "create nuxt"
description: init 명령은 새로운 Nuxt 프로젝트를 초기화합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/init.ts
    size: xs
---

<!--init-cmd-->
```bash [Terminal]
npm create nuxt@latest [DIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [-t, --template] [-f, --force] [--offline] [--preferOffline] [--no-install] [--gitInit] [--shell] [--packageManager] [-M, --modules] [--no-modules] [--nightly]
```
<!--/init-cmd-->

`create-nuxt` 명령은 [unjs/giget](https://github.com/unjs/giget)을 사용하여 새로운 Nuxt 프로젝트를 초기화합니다.

## Arguments %{arguments}%

<!--init-args-->
Argument | Description
--- | ---
`DIR=""` | 프로젝트 디렉터리
<!--/init-args-->

## Options %{options}%

<!--init-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` | `.` | 작업 디렉터리 지정
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨 지정
`-t, --template` |  | 템플릿 이름
`-f, --force` |  | 기존 디렉터리 덮어쓰기
`--offline` |  | 오프라인 모드 강제 사용
`--preferOffline` |  | 오프라인 모드 우선 사용
`--no-install` |  | 의존성 설치 건너뛰기
`--gitInit` |  | git 저장소 초기화
`--shell` |  | 프로젝트 디렉터리에서 설치 후 셸 시작
`--packageManager` |  | 패키지 매니저 선택 (npm, pnpm, yarn, bun)
`-M, --modules` |  | 설치할 Nuxt 모듈 (공백 없이 쉼표로 구분)
`--no-modules` |  | 모듈 설치 프롬프트 건너뛰기
`--nightly` |  | Nuxt 나이틀리 릴리스 채널 사용 (3x 또는 latest)
<!--/init-opts-->

## Environment variables %{environment-variables}%

- `NUXI_INIT_REGISTRY`: 커스텀 템플릿 레지스트리를 설정합니다. ([자세히 보기](https://github.com/unjs/giget#custom-registry)).
  - 기본 레지스트리는 [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates)에서 로드됩니다.
