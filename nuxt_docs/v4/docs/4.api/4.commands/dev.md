---
title: 'nuxt dev'
description: dev 명령은 http://localhost:3000 에서 핫 모듈 교체가 활성화된 개발 서버를 시작합니다
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxt dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--clear] [--no-f, --no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

`dev` 명령은 [http://localhost:3000](https://localhost:3000) 에서 핫 모듈 교체가 활성화된 개발 서버를 시작합니다

## Arguments %{arguments}%

<!--dev-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/dev-args-->

## Options %{options}%

<!--dev-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값은 ROOTDIR 보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--dotenv` |  | 루트 디렉터리를 기준으로 로드할 `.env` 파일의 경로
`--envName` |  | 설정 오버라이드를 해결할 때 사용할 환경입니다 (빌드 시 기본값은 `production`, dev 서버 실행 시 기본값은 `development`)
`-e, --extends=<layer-name>` |  | Nuxt 레이어를 확장합니다
`--clear` | `false` | 재시작 시 콘솔을 지웁니다
`--no-f, --no-fork` |  | 포크 모드를 비활성화합니다
`-p, --port` |  | 수신할 포트 (기본값: `NUXT_PORT \|\| NITRO_PORT \|\| PORT \|\| nuxtOptions.devServer.port`)
`-h, --host` |  | 수신할 호스트 (기본값: `NUXT_HOST \|\| NITRO_HOST \|\| HOST \|\| nuxtOptions.devServer?.host`)
`--clipboard` | `false` | URL을 클립보드에 복사합니다
`-o, --open` | `false` | 브라우저에서 URL을 엽니다
`--https` |  | HTTPS를 활성화합니다
`--publicURL` |  | 표시할 공개 URL (QR 코드에 사용됨)
`--qr` |  | 사용 가능한 경우 공개 URL의 QR 코드를 표시합니다
`--public` |  | 모든 네트워크 인터페이스에서 수신합니다
`--tunnel` |  | https://github.com/unjs/untun 을 사용해 터널을 엽니다
`--sslCert` |  | (사용 중단됨) 대신 `--https.cert` 를 사용하세요.
`--sslKey` |  | (사용 중단됨) 대신 `--https.key` 를 사용하세요.
<!--/dev-opts-->

포트와 호스트는 NUXT_PORT, PORT, NUXT_HOST 또는 HOST 환경 변수로도 설정할 수 있습니다.

위 옵션들에 더해, `@nuxt/cli` 는 옵션을 `listhen` 으로 전달할 수 있습니다. 예를 들어 dev 서버 QR 코드를 끄기 위한 `--no-qr` 등이 있습니다. `listhen` 옵션 목록은 [unjs/listhen](https://github.com/unjs/listhen) 문서에서 확인할 수 있습니다.

이 명령은 `process.env.NODE_ENV` 를 `development` 로 설정합니다.

::note
개발 환경에서 자체 서명 인증서를 사용하는 경우, 환경 변수에 `NODE_TLS_REJECT_UNAUTHORIZED=0` 을 설정해야 합니다.
::
