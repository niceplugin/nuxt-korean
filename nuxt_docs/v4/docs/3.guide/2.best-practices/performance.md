---
navigation.title: 'Nuxt 성능'
title: Nuxt 성능
description: Nuxt 앱의 성능을 향상시키기 위한 모범 사례입니다.
---

Nuxt에는 애플리케이션 성능을 향상시키고 더 나은 [Core Web Vitals](https://web.dev/articles/vitals)에 기여하도록 설계된 내장 기능이 포함되어 있습니다. 또한 특정 영역의 성능 개선을 돕는 여러 Nuxt 코어 모듈도 있습니다. 이 가이드는 Nuxt 애플리케이션의 성능을 최적화하기 위한 모범 사례를 정리합니다.

## 내장 기능 %{#built-in-features}%

Nuxt는 웹사이트의 성능 최적화에 도움이 되는 여러 내장 기능을 제공합니다. 이 기능들이 어떻게 동작하는지 이해하는 것은 매우 빠른 성능을 달성하는 데 중요합니다.

### 링크 %{#links}%

[`<NuxtLink>`](/docs/4.x/api/components/nuxt-link)는 Vue Router의 `<RouterLink>` 컴포넌트와 HTML의 `<a>` 태그를 모두 대체할 수 있는 드롭인 컴포넌트입니다. 링크가 내부 링크인지 외부 링크인지 지능적으로 판단하고, 가능한 최적화(프리페치, 기본 속성 등)를 적용해 알맞게 렌더링합니다.

```html
<template>
  <NuxtLink to="/about">About page</NuxtLink>
</template>

<!-- Vue Router와 스마트 프리페치가 적용되어 다음과 같이 렌더링됩니다 -->
<a href="/about">About page</a>
```

Nuxt는 스마트 프리페치를 자동으로 포함합니다. 즉, 링크가 보일 때(기본값) 이를 감지해 뷰포트 안에 있거나 스크롤 중일 때 해당 페이지의 JavaScript를 미리 가져오므로, 사용자가 링크를 클릭하는 순간 페이지가 준비되어 있습니다.

상호작용 시점에 프리페치하도록 선택할 수도 있습니다:

```ts
export default defineNuxtConfig({
  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: 'interaction',
      },
    },
  },
})
```

:read-more{title="NuxtLink" to="/docs/4.x/api/components/nuxt-link"}

### 하이브리드 렌더링 %{#hybrid-rendering}%

더 복잡한 애플리케이션에서는 일부 페이지는 빌드 시 생성하고, 다른 페이지는 클라이언트 사이드 렌더링해야 하는 경우를 지원하기 위해 애플리케이션이 렌더링되는 방식을 완전히 제어해야 할 수 있습니다.

하이브리드 렌더링은 Route Rules를 사용해 라우트별로 서로 다른 캐싱 규칙을 적용하고, 특정 URL에 대한 새 요청에 서버가 어떻게 응답할지 결정합니다:

```ts
export default defineNuxtConfig({
  routeRules: {
    '/': {
      prerender: true,
    },
    '/products/**': {
      swr: 3600,
    },
    '/blog': {
      isr: 3600,
    },
    '/admin/**': {
      ssr: false,
    },
  },
})
```

Nuxt 서버는 대응되는 미들웨어를 자동으로 등록하고, Nitro 캐싱 레이어를 사용해 라우트를 캐시 핸들러로 감쌉니다.

:read-more{title="하이브리드 렌더링" to="/docs/4.x/guide/concepts/rendering#hybrid-rendering"}

### 지연 로딩 컴포넌트 %{#lazy-loading-components}%

컴포넌트를 동적으로 import하려면(지연 로딩이라고도 합니다) 컴포넌트 이름 앞에 Lazy 접두사만 붙이면 됩니다. 이 방법은 컴포넌트가 항상 필요하지 않을 때 유용합니다.

```html
<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>
```

Lazy 접두사를 사용하면 적절한 시점까지 컴포넌트 코드를 불러오는 것을 지연시킬 수 있어 JavaScript 번들 크기 최적화에 도움이 됩니다.

:read-more{title="지연 로딩 컴포넌트" to="/docs/4.x/directory-structure/app/components#dynamic-imports"}

### 지연 하이드레이션 %{#lazy-hydration}%

초기 로드 시 사이트의 모든 컴포넌트를 항상 하이드레이션(즉, 상호작용 가능하게)할 필요는 없습니다. 지연 하이드레이션을 사용하면 컴포넌트 코드가 언제 로드될지 제어할 수 있어 앱의 Time to Interactive 지표를 개선할 수 있습니다. Nuxt는 지연 하이드레이션을 통해 컴포넌트가 언제 상호작용 가능해질지 제어할 수 있게 해줍니다(Nuxt v3.16에서 추가됨).

```html
<template>
  <div>
    <LazyMyComponent hydrate-on-visible />
  </div>
</template>
```

앱을 최적화하려면 일부 컴포넌트의 하이드레이션을 화면에 보일 때까지, 또는 브라우저가 더 중요한 작업을 마칠 때까지 지연시키고 싶을 수 있습니다.

:read-more{title="지연 하이드레이션" to="/docs/4.x/directory-structure/app/components#delayed-or-lazy-hydration"}

### 데이터 가져오기 %{#fetching-data}%

같은 데이터를 두 번(한 번은 서버에서, 한 번은 클라이언트에서) 가져오는 것을 피하기 위해 Nuxt는 [`useFetch`](/docs/4.x/api/composables/use-fetch)와 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)를 제공합니다. 이들은 서버에서 API 호출이 이뤄졌다면 데이터를 다시 가져오는 대신 payload를 통해 클라이언트에 전달되도록 보장합니다.

:read-more{title="데이터 가져오기" to="/docs/4.x/getting-started/data-fetching"}

## Nuxt 코어 모듈 %{#core-nuxt-modules}%

Nuxt의 내장 기능 외에도 Nuxt 팀이 유지 관리하는 코어 모듈이 있어 성능을 한층 더 향상시키는 데 도움을 줍니다. 이 모듈들은 이미지, 커스텀 폰트, 서드파티 스크립트 같은 에셋 처리를 돕습니다.

### 이미지 %{#images}%

최적화되지 않은 이미지는 웹사이트 성능, 특히 [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp) 점수에 큰 악영향을 줄 수 있습니다.

Nuxt에서는 Nuxt 앱을 위한 플러그 앤 플레이 이미지 최적화 모듈인 [Nuxt Image](https://image.nuxt.com/)를 사용할 수 있습니다. 내장 최적화기나 선호하는 이미지 CDN을 사용해 이미지를 리사이즈하고 변환할 수 있게 해줍니다.

:video-accordion{title="LearnVue의 Nuxt Image 영상 보기" videoId="_UBff2eqGY0"}

[`<NuxtImg>`](/docs/4.x/api/components/nuxt-img)는 기본 `<img>` 태그를 대체할 수 있는 드롭인 컴포넌트이며 다음과 같은 향상 기능을 제공합니다:

* 내장 provider를 사용해 로컬 및 원격 이미지를 최적화합니다
* `src`를 WebP나 Avif 같은 최신 포맷의 provider 최적화 URL로 변환합니다
* `width`와 `height`를 기준으로 이미지를 자동 리사이즈합니다
* sizes 옵션을 제공하면 반응형 `sizes`를 생성합니다
* 기본 `lazy loading`과 그 밖의 `<img>` 속성을 지원합니다

웹사이트의 이미지는 보통 중요도에 따라 나눌 수 있습니다. 초기 로드 시 가장 먼저 전달되어야 하는 이미지(예: `Largest Contentful Paint`)와, 나중에 또는 필요할 때 로드해도 되는 이미지가 그것입니다. 이를 위해 다음과 같은 최적화를 사용할 수 있습니다:

```html
<template>
  <!-- 🚨 가능한 한 빨리 로드되어야 함 -->
  <NuxtImg
    src="/hero-banner.jpg"
    format="webp"
    :preload="{ fetchPriority: 'high' }"
    loading="eager"
    width="200"
    height="100"
  />

  <!-- 🐌 나중에 로드해도 됨 -->
  <NuxtImg
    src="/facebook-logo.jpg"
    format="webp"
    loading="lazy"
    fetchpriority="low"
    width="200"
    height="100"
  />
</template>
```

:read-more{title="Nuxt Image" to="https://image.nuxt.com/usage/nuxt-img"}

### 폰트 %{#fonts}%

[Nuxt Fonts](https://fonts.nuxt.com/)는 폰트(커스텀 폰트 포함)를 자동으로 최적화하고 외부 네트워크 요청을 제거해 개인정보 보호와 성능을 향상시킵니다.

모든 폰트 파일에 대한 자동 self-hosting 기능이 내장되어 있어, 기반 패키지인 [fontaine](https://github.com/unjs/fontaine) 덕분에 레이아웃 이동을 줄이면서 웹 폰트를 최적으로 로드할 수 있습니다.

:video-accordion{title="Daniel Roe의 Nuxt Fonts 소개 영상 보기" videoId="D3F683UViBY"}

Nuxt Fonts는 모든 CSS를 처리하며, font-family 선언을 만나면 다음 작업을 자동으로 수행합니다.

1. **폰트 해석** – public/에서 폰트 파일을 찾고, 이어서 Google, Bunny, Fontshare 같은 웹 provider를 확인합니다.
2. **@font-face 규칙 생성** – 올바른 소스에서 폰트를 로드하도록 CSS 규칙을 주입합니다.
3. **폰트 프록시 및 캐싱** – URL을 `/_fonts`로 다시 쓰고, 폰트를 로컬에 다운로드해 캐시합니다.
4. **대체 메트릭 생성** – 로컬 시스템 폰트를 웹 폰트에 맞게 조정해 레이아웃 이동([CLS](https://web.dev/articles/cls))을 줄입니다.
5. **빌드에 폰트 포함** – 폰트를 프로젝트와 함께 번들링하고, 파일 이름에 해시를 붙이며 오래 유지되는 캐시 헤더를 설정합니다.

플러그 가능하고 확장 가능하도록 설계된 여러 provider를 지원하므로, 어떤 설정이든 기존 provider를 사용하거나 직접 작성할 수 있습니다.

### 스크립트 %{#scripts}%

분석 도구, 비디오 임베드, 지도, 소셜 미디어 통합 같은 서드파티 리소스는 웹사이트 기능을 향상시키지만 사용자 경험을 크게 저하시킬 수 있으며 [Interaction to Next Paint (INP)](https://web.dev/articles/inp)와 Largest Contentful Paint (LCP) 점수에도 부정적인 영향을 줄 수 있습니다.

[Nuxt Scripts](https://scripts.nuxt.com/)는 더 나은 성능, 개인정보 보호, 보안, DX로 서드파티 스크립트를 로드할 수 있게 해줍니다.

:video-accordion{title="Alex Lichter의 Nuxt Scripts 영상 보기" videoId="sjMqUUvH9AE"}

Nuxt Scripts는 서드파티 스크립트 위에 추상화 계층을 제공하여 SSR 지원과 타입 안정성을 제공하면서도 스크립트 로드 방식을 세밀하게 제어할 수 있게 해줍니다.

```ts
const { onLoaded, proxy } = useScriptGoogleAnalytics(
  {
    id: 'G-1234567',
    scriptOptions: {
      trigger: 'manual',
    },
  },
)
// ga가 로드되면 전송할 이벤트를 큐에 쌓습니다
proxy.gtag('config', 'UA-123456789-1')
// 또는 ga가 로드될 때까지 기다립니다
onLoaded((gtag) => {
  // 스크립트가 로드됨
})
```

:read-more{title="Nuxt Scripts" to="https://scripts.nuxt.com/scripts"}

## 프로파일링 도구 %{#profiling-tools}%

성능을 개선하려면 우선 이를 측정하는 방법을 알아야 합니다. 먼저 로컬 환경의 개발 단계에서 성능을 측정하고, 이후 프로덕션에 배포된 애플리케이션을 감사하는 단계로 나아가야 합니다.

### Nuxi Analyze %{#nuxi-analyze}%

`nuxi`의 [이](/docs/4.x/api/commands/analyze) 명령어를 사용하면 프로덕션 번들 또는 Nuxt 애플리케이션을 분석할 수 있습니다. `webpack-bundle-analyzer`와 유사한 `vite-bundle-visualizer`를 활용해 애플리케이션 번들을 시각적으로 표현하므로, 어떤 컴포넌트가 가장 큰 용량을 차지하는지 쉽게 파악할 수 있습니다.

시각화에서 큰 블록이 보인다면, 특히 서드파티 라이브러리의 경우 더 작은 부분으로 나누거나, 지연 로딩을 적용하거나, 더 효율적인 대안으로 교체하는 등 최적화 기회가 있다는 신호인 경우가 많습니다.

여러 요소를 포함한 큰 블록은 전체 모듈 대신 필요한 컴포넌트만 import해 줄일 수 있는 경우가 많고, 단독으로 큰 블록은 메인 번들에 포함하기보다 지연 로딩하는 편이 더 적합할 수 있습니다.

### Nuxt DevTools %{#nuxt-devtools}%

[Nuxt DevTools](https://devtools.nuxt.com/)는 Nuxt 앱에 대한 인사이트와 투명성을 제공하여 성능 병목을 파악하고 앱 구성을 원활하게 관리할 수 있게 해줍니다.

![Nuxt DevTools example](https://user-images.githubusercontent.com/11247099/217670806-fb39aeff-3881-44e5-b9c8-6c757f5925fc.png)

Nuxt 앱의 성능을 측정하는 데 사용할 수 있는 여러 기능이 함께 제공됩니다:
1. **Timeline** – 렌더링, 업데이트, 컴포넌트 초기화에 소요된 시간을 추적해 성능 병목을 식별합니다.  
2. **Assets** – 변환되지 않은 파일 크기(예: 이미지)를 표시합니다.  
3. **Render Tree** – Vue 컴포넌트, 스크립트, 스타일 간 연결 관계를 보여주어 동적 로딩을 최적화할 수 있게 합니다.  
4. **Inspect** – Vue 앱에서 사용하는 모든 파일을 크기와 평가 시간과 함께 나열합니다.

### Chrome DevTools %{#chrome-devtools}%

Chrome DevTools에는 성능 측정에 유용한 두 개의 탭이 있습니다. 바로 `Performance`와 `Lighthouse`입니다.

[`Performance`](https://developer.chrome.com/docs/devtools/performance/overview) 패널을 열면 로컬 환경의 **Largest Contentful Paint (LCP)** 와 **Cumulative Layout Shift (CLS)** 점수(좋음, 개선 필요, 나쁨)를 즉시 보여줍니다.  

페이지와 상호작용하면 **Interaction to Next Paint (INP)** 도 함께 수집하여, 기기와 네트워크를 기준으로 Core Web Vitals를 전체적으로 파악할 수 있게 해줍니다.

![Chrome DevTools Performance Panel](https://developer.chrome.com/static/docs/devtools/performance/image/cpu-throttling_856.png)

[Lighthouse](https://developer.chrome.com/docs/devtools/lighthouse)는 성능, 접근성, SEO, 프로그레시브 웹 앱, 모범 사례를 감사합니다. 페이지에서 테스트를 실행하고 보고서를 생성합니다. 실패한 감사 항목을 사이트 개선의 가이드로 활용하세요.

![Lighthouse](https://developer.chrome.com/static/docs/lighthouse/images/lighthouse-overview_720.png)

각 감사 항목에는 왜 중요한지와 어떻게 해결할 수 있는지를 설명하는 참고 문서가 함께 제공됩니다.

### PageSpeed Insights %{#pagespeed-insights}%

[PageSpeed Insights (PSI)](https://developers.google.com/speed/docs/insights/v5/about)는 모바일과 데스크톱 환경 모두에서 페이지의 사용자 경험을 보고하고, 해당 페이지를 어떻게 개선할 수 있을지 제안합니다.

페이지에 대한 실험실 데이터와 현장 데이터를 모두 제공합니다. 실험실 데이터는 통제된 환경에서 수집되므로 문제를 디버깅하는 데 유용하고, 현장 데이터는 실제 사용자 경험을 포착하는 데 유용합니다.

### Web Page Test %{#web-page-test}%

[WebPageTest](https://www.webpagetest.org/)는 다양한 조건에서 페이지가 어떻게 동작하는지에 대한 깊이 있는 진단 정보를 제공하는 웹 성능 도구입니다.

각 테스트는 전 세계 여러 위치에서, 실제 브라우저로, 다양한 네트워크 조건을 맞춤 설정해 실행할 수 있습니다.

## 흔한 문제 %{#common-problems}%

더 복잡한 Nuxt 애플리케이션을 구축하다 보면 아래와 같은 문제를 마주칠 가능성이 높습니다. 이런 문제를 이해하고 해결하면 웹사이트 성능을 개선하는 데 도움이 됩니다.

### 플러그인 과다 사용 %{#overusing-plugins}%

**문제**: 플러그인이 너무 많으면 성능 문제가 생길 수 있습니다. 특히 비용이 큰 계산이 필요하거나 초기화에 너무 오래 걸리는 경우가 그렇습니다. 플러그인은 하이드레이션 단계에서 실행되므로 비효율적인 설정은 렌더링을 막고 사용자 경험을 저하시킬 수 있습니다.

**해결책**: 플러그인을 점검하고, 그중 일부를 컴포저블이나 유틸리티 함수로 구현할 수 없는지 확인하세요.

### 사용하지 않는 코드 / 의존성 %{#unused-code-dependencies}%

**문제**: 프로젝트가 커지면서 사용하지 않는 코드나 의존성이 남을 수 있습니다. 이런 추가 기능은 쓰이지 않거나 필요하지 않더라도 프로젝트의 번들 크기를 키웁니다.

**해결책**: `package.json`에서 사용하지 않는 의존성을 점검하고, 코드에서 사용하지 않는 utils/composables/functions가 없는지 분석하세요.

### Vue 성능 팁을 활용하지 않음 %{#not-using-vue-performance-tips}%

**문제**: [Vue 문서](https://vuejs.org/guide/best-practices/performance)에는 Nuxt 프로젝트에서도 사용할 수 있는 여러 성능 개선 방법이 정리되어 있지만, Vue 문서의 일부라는 이유로 개발자들이 이를 놓치고 Nuxt 전용 개선에만 집중하는 경우가 많습니다. 하지만 Nuxt 애플리케이션 역시 Vue 프로젝트입니다.

**해결책**: `shallowRef`, `v-memo`, `v-once` 같은 개념을 활용해 성능을 개선하세요.

### 패턴을 따르지 않음 %{#not-following-patterns}%

**문제**: 프로젝트에 참여하는 사람이 많아질수록 안정적인 코드베이스를 유지하기가 더 어려워집니다. 개발자들은 다른 프로젝트에서 본 새로운 개념을 도입하는 경향이 있는데, 이것이 충돌과 성능 문제를 일으킬 수 있습니다.

**해결책**: [Vue Composables를 위한 모범 사례와 디자인 패턴](https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk) 같은 규칙과 패턴을 프로젝트에 정착시키세요.

### 모든 것을 동시에 로드하려고 함 %{#trying-to-load-everything-at-the-same-time}%

**문제**: 페이지가 로드될 때 요소 로딩 순서가 적절히 지정되어 있지 않으면 모든 것을 동시에 가져오게 되고, 이는 느린 속도와 나쁜 사용자 경험으로 이어질 수 있습니다.

**해결책**: 핵심 웹페이지 콘텐츠를 먼저 구성한 뒤, 브라우저와 인터넷 연결 상태가 허용하는 범위에서 더 정교한 표현 계층과 기능을 차례로 얹는 Progressive Enhancement 같은 개념을 활용하세요.

## 유용한 자료 %{#useful-resources}%

성능 향상을 위한 다양한 기법을 더 알아보려면 다음 자료를 참고하세요:

1. [Apply instant loading with the PRPL pattern](https://web.dev/articles/apply-instant-loading-with-prpl)
2. [Perceived performance](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Perceived_performance)
3. [Understanding Critical Rendering Path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path)
