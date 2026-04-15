---
title: "create nuxt"
description: init 명령어는 새 Nuxt 프로젝트를 초기화합니다.
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

`create-nuxt` 명령어는 [unjs/giget](https://github.com/unjs/giget)를 사용해 새 Nuxt 프로젝트를 초기화합니다.

## 인자 %{#arguments}%

<!--init-args-->
| Argument | Description       |
|----------|-------------------|
| `DIR=""` | 프로젝트 디렉터리 |
<!--/init-args-->

## 옵션 %{#options}%

<!--init-opts-->
| Option                               | Default | Description                                                   |
|--------------------------------------|---------|---------------------------------------------------------------|
| `--cwd=<directory>`                  | `.`     | 작업 디렉터리를 지정합니다                                    |
| `--logLevel=<silent\|info\|verbose>` |         | 빌드 시 로그 레벨을 지정합니다                                |
| `-t, --template`                     |         | 템플릿 이름                                                   |
| `-f, --force`                        |         | 기존 디렉터리를 덮어씁니다                                    |
| `--offline`                          |         | 오프라인 모드를 강제합니다                                    |
| `--preferOffline`                    |         | 오프라인 모드를 우선합니다                                    |
| `--no-install`                       |         | 종속성 설치를 건너뜁니다                                      |
| `--gitInit`                          |         | git 저장소를 초기화합니다                                     |
| `--shell`                            |         | 설치 후 프로젝트 디렉터리에서 셸을 시작합니다                 |
| `--packageManager`                   |         | 패키지 매니저 선택 (npm, pnpm, yarn, bun)                    |
| `-M, --modules`                      |         | 설치할 Nuxt 모듈 (공백 없이 쉼표로 구분)                      |
| `--no-modules`                       |         | 모듈 설치 프롬프트를 건너뜁니다                               |
| `--nightly`                          |         | Nuxt nightly 릴리스 채널(3x 또는 latest)을 사용합니다         |
<!--/init-opts-->

## 환경 변수 %{#environment-variables}%

- `NUXI_INIT_REGISTRY`: 사용자 정의 템플릿 레지스트리로 설정합니다. ([자세히 보기](https://github.com/unjs/giget#custom-registry)).
  - 기본 레지스트리는 [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates)에서 로드됩니다
