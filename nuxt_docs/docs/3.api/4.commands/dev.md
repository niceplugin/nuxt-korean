---
title: 'nuxt dev'
description: dev 명령어는 http://localhost:3000에서 핫 모듈 교체 기능이 있는 개발 서버를 시작합니다.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxt dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [--no-clear] [--no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

`dev` 명령어는 [http://localhost:3000](https://localhost:3000)에서 핫 모듈 교체 기능이 있는 개발 서버를 시작합니다.

## [인자](#arguments)

<!--dev-args-->
인자 | 설명
--- | ---
`ROOTDIR="."` | 작업 디렉터리를 지정합니다 (기본값: `.`)
<!--/dev-args-->

## [옵션](#options)

<!--dev-opts-->
옵션 | 기본값 | 설명
--- | --- | ---
`--cwd=<directory>` |  | 작업 디렉터리를 지정합니다. 이 값이 ROOTDIR보다 우선합니다 (기본값: `.`)
`--logLevel=<silent\|info\|verbose>` |  | 빌드 시 로그 레벨을 지정합니다
`--dotenv` |  | 루트 디렉터리 기준으로 불러올 `.env` 파일의 경로
`--envName` |  | 구성 오버라이드를 해결할 때 사용할 환경 (빌드 시 기본값은 `production`, dev 서버 실행 시 기본값은 `development`)
`--no-clear` |  | 재시작 시 콘솔 클리어 비활성화
`--no-fork` |  | forked 모드 비활성화
`-p, --port` |  | 리스닝할 포트 (기본값: `NUXT_PORT \|\| NITRO_PORT \|\| PORT \|\| nuxtOptions.devServer.port`)
`-h, --host` |  | 리스닝할 호스트 (기본값: `NUXT_HOST \|\| NITRO_HOST \|\| HOST \|\| nuxtOptions._layers?.[0]?.devServer?.host`)
`--clipboard` | `false` | URL을 클립보드에 복사
`-o, --open` | `false` | URL을 브라우저에서 열기
`--https` |  | HTTPS 활성화
`--publicURL` |  | 표시되는 공개 URL (QR 코드에 사용됨)
`--qr` |  | 사용 가능한 경우 공개 URL의 QR 코드 표시
`--public` |  | 모든 네트워크 인터페이스에서 리스닝
`--tunnel` |  | https://github.com/unjs/untun 을 사용하여 터널 열기
`--sslCert` |  | (사용 중단됨) 대신 `--https.cert`를 사용하세요.
`--sslKey` |  | (사용 중단됨) 대신 `--https.key`를 사용하세요.
<!--/dev-opts-->

포트와 호스트는 NUXT_PORT, PORT, NUXT_HOST 또는 HOST 환경 변수로도 설정할 수 있습니다.

위 옵션들 외에도, `@nuxt/cli`는 옵션을 `listhen`으로 전달할 수 있습니다. 예를 들어, dev 서버 QR 코드를 끄려면 `--no-qr`를 사용할 수 있습니다. `listhen` 옵션 목록은 [unjs/listhen](https://github.com/unjs/listhen) 문서에서 확인할 수 있습니다.

이 명령어는 `process.env.NODE_ENV`를 `development`로 설정합니다.

::note
개발 환경에서 자체 서명된 인증서를 사용하는 경우, 환경 변수에 `NODE_TLS_REJECT_UNAUTHORIZED=0`을 설정해야 합니다.
::
