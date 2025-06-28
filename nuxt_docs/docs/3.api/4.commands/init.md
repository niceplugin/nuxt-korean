---
title: "create nuxt"
description: init 명령어는 새로운 Nuxt 프로젝트를 초기화합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/init.ts
    size: xs
---

<!--init-cmd-->
```bash [Terminal]
npm create nuxt@latest [DIR] [--cwd=<directory>] [-t, --template] [-f, --force] [--offline] [--preferOffline] [--no-install] [--gitInit] [--shell] [--packageManager]
```
<!--/init-cmd-->

`create-nuxt` 명령어는 [unjs/giget](https://github.com/unjs/giget)를 사용하여 새로운 Nuxt 프로젝트를 초기화합니다.

## [인자](#arguments)

<!--init-args-->
인자 | 설명
--- | ---
`DIR=""` | 프로젝트 디렉터리
<!--/init-args-->

## [옵션](#options)

<!--init-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` | `.` | 작업 디렉터리 지정
`-t, --template` |  | 템플릿 이름
`-f, --force` |  | 기존 디렉터리 덮어쓰기
`--offline` |  | 오프라인 모드 강제 적용
`--preferOffline` |  | 오프라인 모드 우선 적용
`--no-install` |  | 의존성 설치 건너뛰기
`--gitInit` |  | git 저장소 초기화
`--shell` |  | 프로젝트 디렉터리에서 설치 후 셸 실행
`--packageManager` |  | 패키지 매니저 선택 (npm, pnpm, yarn, bun)
<!--/init-opts-->

## [환경 변수](#environment-variables)

- `NUXI_INIT_REGISTRY`: 커스텀 템플릿 레지스트리로 설정합니다. ([자세히 알아보기](https://github.com/unjs/giget#custom-registry)).
  - 기본 레지스트리는 [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates)에서 로드됩니다.
