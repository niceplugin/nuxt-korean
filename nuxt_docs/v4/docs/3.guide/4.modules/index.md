---
title: '모듈 작성자 가이드'
titleTemplate: '%s'
description: 'Nuxt 애플리케이션을 통합, 강화, 확장하는 Nuxt 모듈을 만드는 방법을 알아보세요.'
navigation: false
surround: false
---

Nuxt의 [configuration](/docs/4.x/api/nuxt-config) 및 [hooks](/docs/4.x/guide/going-further/hooks) 시스템을 사용하면 Nuxt의 모든 측면을 사용자 지정하고 필요한 모든 통합(Vue 플러그인, CMS, 서버 라우트, 컴포넌트, 로깅 등)을 추가할 수 있습니다.

**Nuxt modules**는 `nuxt dev`로 개발 모드에서 Nuxt를 시작하거나 `nuxt build`로 프로덕션용 프로젝트를 빌드할 때 순차적으로 실행되는 함수입니다.
모듈을 사용하면 프로젝트에 불필요한 보일러플레이트를 추가하거나 Nuxt 자체를 수정하지 않고도 사용자 정의 솔루션을 캡슐화하고, 제대로 테스트하고, npm 패키지로 공유할 수 있습니다.

::card-group{class="sm:grid-cols-1"}
  ::card{icon="i-lucide-rocket" title="첫 번째 모듈 만들기" to="/docs/4.x/guide/modules/getting-started"}
  공식 스타터 템플릿을 사용해 첫 번째 Nuxt 모듈을 만드는 방법을 알아보세요.
  ::
  ::card{icon="i-lucide-box" title="모듈 구조 이해하기" to="/docs/4.x/guide/modules/module-anatomy"}
  Nuxt 모듈이 어떤 구조로 이루어져 있으며 어떻게 정의하는지 알아보세요.
  ::
  ::card{icon="i-lucide-code" title="플러그인, 컴포넌트 등 추가하기" to="/docs/4.x/guide/modules/recipes-basics"}
  모듈에서 플러그인, 컴포넌트, 컴포저블, 서버 라우트를 주입하는 방법을 알아보세요.
  ::
  ::card{icon="i-lucide-layers" title="훅 사용 및 타입 확장" to="/docs/4.x/guide/modules/recipes-advanced"}
  모듈에서 라이프사이클 훅, 가상 파일, TypeScript 선언을 깊이 있게 익혀보세요.
  ::
  ::card{icon="i-lucide-test-tube" title="모듈 테스트하기" to="/docs/4.x/guide/modules/testing"}
  단위, 통합, E2E 테스트로 Nuxt 모듈을 테스트하는 방법을 알아보세요.
  ::
  ::card{icon="i-lucide-medal" title="모범 사례 따르기" to="/docs/4.x/guide/modules/best-practices"}
  이 가이드라인으로 성능 좋고 유지보수하기 쉬운 Nuxt 모듈을 만들어보세요.
  ::
  ::card{icon="i-lucide-globe" title="모듈 게시 및 공유하기" to="/docs/4.x/guide/modules/ecosystem"}
  Nuxt 모듈 생태계에 참여하고 모듈을 npm에 게시해 보세요.
  ::
::
