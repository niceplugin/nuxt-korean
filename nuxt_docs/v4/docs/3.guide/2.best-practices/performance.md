---
navigation.title: 'Nuxt Performance'
title: Nuxt performance
description: Best practices for improving performance of Nuxt apps.
---

Nuxt는 애플리케이션의 성능을 향상시키고 더 나은 [Core Web Vitals](https://web.dev/articles/vitals)에 기여하도록 설계된 내장 기능을 제공합니다. 또한 특정 영역의 성능 향상을 돕는 여러 Nuxt 코어 모듈도 있습니다. 이 가이드는 Nuxt 애플리케이션의 성능을 최적화하기 위한 모범 사례를 설명합니다.

## Built-in Features %{built-in-features}%

Nuxt는 웹사이트의 성능을 최적화하는 데 도움이 되는 여러 내장 기능을 제공합니다. 이러한 기능이 어떻게 작동하는지 이해하는 것은 매우 빠른 성능을 달성하는 데 중요합니다.

### Links %{links}%

[`<NuxtLink>`](/docs/4.x/api/components/nuxt-link)는 Vue Router의 `<RouterLink>` 컴포넌트와 HTML의 `<a>` 태그를 그대로 대체할 수 있는 컴포넌트입니다. 링크가 내부 링크인지 외부 링크인지 지능적으로 판단하고, 가능한 최적화(프리페치, 기본 속성 등)를 적용하여 적절하게 렌더링합니다.

```html
<template>
  <NuxtLink to="/about">About page</NuxtLink>
</template>

<!-- Vue Router 및 Smart Prefetching과 함께 다음과 같이 렌더링됩니다 -->
<a href="/about">About page</a>
```

Nuxt는 자동으로 스마트 프리페칭을 포함합니다. 이는 링크가 뷰포트에 보이거나(기본값) 스크롤 중에 보일 때 이를 감지하고 해당 페이지의 JavaScript를 미리 가져와, 사용자가 링크를 클릭할 때 이미 준비되어 있도록 한다는 의미입니다.

대신 상호작용 시 프리페칭하도록 선택할 수도 있습니다:

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

### Hybrid Rendering %{hybrid-rendering}%

더 복잡한 애플리케이션에서는 일부 페이지는 빌드 시점에 생성되고, 다른 페이지는 클라이언트 측에서 렌더링되어야 하는 경우를 지원하기 위해 애플리케이션이 어떻게 렌더링되는지에 대한 완전한 제어가 필요할 수 있습니다.

하이브리드 렌더링은 Route Rules를 사용하여 라우트별로 서로 다른 캐싱 규칙을 허용하고, 특정 URL에 대한 새 요청에 서버가 어떻게 응답해야 할지 결정합니다:

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

Nuxt 서버는 자동으로 해당 미들웨어를 등록하고 Nitro 캐싱 레이어를 사용하여 라우트를 캐시 핸들러로 감쌉니다.

:read-more{title="Hybrid rendering" to="/docs/4.x/guide/concepts/rendering#hybrid-rendering"}

### Lazy Loading Components %{lazy-loading-components}%

컴포넌트를 동적으로 import(컴포넌트를 지연 로딩한다고도 함)하려면 컴포넌트 이름 앞에 Lazy 접두사를 추가하기만 하면 됩니다. 이는 컴포넌트가 항상 필요한 것이 아닐 때 유용합니다.

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

Lazy 접두사를 사용하면 적절한 시점까지 컴포넌트 코드를 로딩하는 것을 지연할 수 있어, JavaScript 번들 크기를 최적화하는 데 도움이 될 수 있습니다.

:read-more{title="Lazy loading components" to="/docs/4.x/directory-structure/app/components#dynamic-imports"}

### Lazy Hydration %{lazy-hydration}%

사이트의 모든 컴포넌트를 초기 로드 시점에 하이드레이션(또는 인터랙티브하게 만드는 것)할 필요는 항상 있는 것은 아닙니다. 지연 하이드레이션을 사용하면 컴포넌트의 코드를 언제 로드할지 제어할 수 있으며, 이는 앱의 time-to-interactive 지표를 개선할 수 있습니다. Nuxt는 지연 하이드레이션(Nuxt v3.16에 추가됨)을 통해 컴포넌트가 언제 인터랙티브해질지 제어할 수 있도록 합니다.

```html
<template>
  <div>
    <LazyMyComponent hydrate-on-visible />
  </div>
</template>
```

앱을 최적화하기 위해 일부 컴포넌트의 하이드레이션을, 해당 컴포넌트가 보이게 될 때까지 또는 브라우저가 더 중요한 작업을 마칠 때까지 지연하고 싶을 수 있습니다.

:read-more{title="Lazy hydration" to="/docs/4.x/directory-structure/app/components#delayed-or-lazy-hydration"}

### Fetching data %{fetching-data}%

동일한 데이터를 서버에서 한 번, 클라이언트에서 한 번 두 번 가져오는 것을 피하기 위해 Nuxt는 [`useFetch`](/docs/4.x/api/composables/use-fetch)와 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)를 제공합니다. 이들은 API 호출이 서버에서 이루어진 경우, 데이터를 다시 가져오는 대신 페이로드에 포함하여 클라이언트로 전달되도록 보장합니다.

:read-more{title="Data fetching" to="/docs/4.x/getting-started/data-fetching"}

## Core Nuxt Modules %{core-nuxt-modules}%

Nuxt의 내장 기능 외에도, Nuxt 팀이 유지 관리하는 코어 모듈들이 있어 성능을 더욱 향상시키는 데 도움을 줍니다. 이 모듈들은 이미지, 커스텀 폰트, 서드파티 스크립트와 같은 에셋을 처리하는 데 도움을 줍니다.

### Images %{images}%

최적화되지 않은 이미지는 웹사이트 성능, 특히 [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp) 점수에 상당한 부정적인 영향을 줄 수 있습니다.

Nuxt에서는 Nuxt 앱을 위한 플러그 앤 플레이 이미지 최적화 모듈인 [Nuxt Image](https://image.nuxt.com/) 모듈을 사용할 수 있습니다. 이를 통해 내장 최적화 도구 또는 선호하는 이미지 CDN을 사용하여 이미지를 리사이즈하고 변환할 수 있습니다.

:video-accordion{title="Watch the video by LearnVue about Nuxt Image" videoId="_UBff2eqGY0"}

[`<NuxtImg>`](/docs/4.x/api/components/nuxt-img)는 기본 `<img>` 태그를 그대로 대체할 수 있는 컴포넌트로, 다음과 같은 향상 기능을 제공합니다:

* 로컬 및 원격 이미지를 최적화하기 위해 내장 프로바이더 사용
* `src`를 WebP 또는 Avif와 같은 최신 포맷의 프로바이더 최적화 URL로 변환
* `width`와 `height`에 따라 이미지를 자동으로 리사이즈
* sizes 옵션을 제공할 때 반응형 `sizes` 생성
* 기본 `lazy loading` 및 기타 `<img>` 속성 지원

웹사이트의 이미지는 일반적으로 중요도에 따라 구분할 수 있습니다. 초기 로드 시 가장 먼저 전달되어야 하는 이미지(예: `Largest Contentful Paint`)와 나중에 또는 필요할 때만 로드해도 되는 이미지입니다. 이를 위해 다음과 같은 최적화를 사용할 수 있습니다:

```html
<template>
  <!-- 🚨 가능한 한 빨리 로드되어야 함 -->
  <NuxtImg
    src="/hero-banner.jpg"
    format="webp"
    preload
    loading="eager"
    fetch-priority="high"
    width="200"
    height="100"
  />

  <!-- 🐌 나중에 로드해도 되는 경우 -->
  <NuxtImg
    src="/facebook-logo.jpg"
    format="webp"
    loading="lazy"
    fetch-priority="low"
    width="200"
    height="100"
  />
</template>
```

:read-more{title="Nuxt Image" to="https://image.nuxt.com/usage/nuxt-img"}

### Fonts %{fonts}%

[Nuxt Fonts](https://fonts.nuxt.com/)는 폰트(커스텀 폰트 포함)를 자동으로 최적화하고, 외부 네트워크 요청을 제거하여 프라이버시와 성능을 향상시킵니다.

이는 모든 폰트 파일에 대해 자동 자체 호스팅을 내장하고 있어, 기본 패키지 [fontaine](https://github.com/unjs/fontaine) 덕분에 레이아웃 시프트를 줄이면서 웹 폰트를 최적으로 로드할 수 있습니다.

:video-accordion{title="Watch the talk by Daniel Roe about the idea behind Nuxt Fonts" videoId="D3F683UViBY"}

Nuxt Fonts는 모든 CSS를 처리하며, font-family 선언을 발견하면 자동으로 다음 작업을 수행합니다.

1. **폰트 해석(Resolves fonts)** – public/에서 폰트 파일을 찾은 다음, Google, Bunny, Fontshare와 같은 웹 프로바이더를 확인합니다.
2. **@font-face 규칙 생성** – 올바른 소스에서 폰트를 로드하기 위한 CSS 규칙을 주입합니다.
3. **폰트 프록시 및 캐시** – URL을 `/_fonts`로 다시 작성하고, 폰트를 다운로드하여 로컬에 캐시합니다.
4. **대체 메트릭 생성** – 웹 폰트와 일치하도록 로컬 시스템 폰트를 조정하여 레이아웃 시프트([CLS](https://web.dev/articles/cls))를 줄입니다.
5. **빌드에 폰트 포함** – 프로젝트와 함께 폰트를 번들링하고, 파일 이름에 해시를 적용하며, 장기 캐시 헤더를 설정합니다.

여러 프로바이더를 지원하며, 플러그형이고 확장 가능하도록 설계되어 있어, 어떤 설정이든 기존 프로바이더를 사용하거나 직접 작성하여 사용할 수 있습니다.

### Scripts %{scripts}%

애널리틱스 도구, 비디오 임베드, 지도, 소셜 미디어 통합과 같은 서드파티 리소스는 웹사이트 기능을 향상시키지만, 사용자 경험을 크게 저하시킬 수 있으며 [Interaction to Next Paint (INP)](https://web.dev/articles/inp) 및 Largest Contentful Paint (LCP) 점수에 부정적인 영향을 줄 수 있습니다.

[Nuxt Scripts](https://scripts.nuxt.com/)는 서드파티 스크립트를 더 나은 성능, 프라이버시, 보안 및 DX와 함께 로드할 수 있도록 해줍니다.

:video-accordion{title="Watch the video by Alex Lichter about Nuxt Scripts" videoId="sjMqUUvH9AE"}

Nuxt Scripts는 서드파티 스크립트 위에 추상화 레이어를 제공하여, SSR 지원과 타입 안전성을 제공하면서도 스크립트가 어떻게 로드되는지에 대한 저수준 제어를 완전히 유지할 수 있게 합니다.

```ts
const { onLoaded, proxy } = useScriptGoogleAnalytics(
  {
    id: 'G-1234567',
    scriptOptions: {
      trigger: 'manual',
    },
  },
)
// ga가 로드될 때 전송될 이벤트를 큐에 쌓기
proxy.gtag('config', 'UA-123456789-1')
// 또는 ga가 로드될 때까지 기다리기
onLoaded((gtag) => {
  // 스크립트 로드 완료
})
```

:read-more{title="Nuxt Scripts" to="https://scripts.nuxt.com/scripts"}

## Profiling Tools %{profiling-tools}%

성능을 개선하려면 먼저 이를 측정하는 방법을 알아야 합니다. 로컬 환경에서 개발 중 성능 측정부터 시작하여, 프로덕션에 배포된 애플리케이션을 감사하는 단계로 나아가야 합니다.

### Nuxi Analyze %{nuxi-analyze}%

`nuxi`의 [이](/docs/4.x/api/commands/analyze) 명령은 Nuxt 애플리케이션의 프로덕션 번들을 분석할 수 있게 해줍니다. 이는 `vite-bundle-visualizer`( `webpack-bundle-analyzer`와 유사)를 활용하여 애플리케이션 번들의 시각적 표현을 생성하고, 어떤 컴포넌트가 가장 많은 공간을 차지하는지 더 쉽게 파악할 수 있게 합니다.

시각화에서 큰 블록을 보게 되면, 이를 더 작은 부분으로 분할하거나, 지연 로딩을 구현하거나, 특히 서드파티 라이브러리의 경우 더 효율적인 대안으로 교체하는 등 최적화 기회가 있다는 신호인 경우가 많습니다.

여러 요소를 포함하는 큰 블록은 전체 모듈이 아닌 필요한 컴포넌트만 import함으로써 줄일 수 있는 경우가 많으며, 큰 독립 블록은 메인 번들에 포함시키기보다는 지연 로딩에 더 적합할 수 있습니다.

### Nuxt DevTools %{nuxt-devtools}%

[Nuxt DevTools](https://devtools.nuxt.com/)는 Nuxt 앱에 대한 인사이트와 투명성을 제공하여 성능 격차를 식별하고 앱 구성을 원활하게 관리할 수 있도록 해줍니다.

![Nuxt DevTools example](https://user-images.githubusercontent.com/11247099/217670806-fb39aeff-3881-44e5-b9c8-6c757f5925fc.png)

Nuxt 앱의 성능을 측정하는 데 사용할 수 있는 여러 기능이 포함되어 있습니다:
1. **Timeline** – 렌더링, 업데이트, 컴포넌트 초기화에 소요된 시간을 추적하여 성능 병목 지점을 식별합니다.  
2. **Assets** – 변환 전 파일 크기(예: 이미지)를 표시합니다.  
3. **Render Tree** – 동적 로딩을 최적화하기 위해 Vue 컴포넌트, 스크립트, 스타일 간의 연결을 보여줍니다.  
4. **Inspect** – Vue 앱에서 사용되는 모든 파일을 크기와 평가 시간과 함께 나열합니다.

### Chrome DevTools %{chrome-devtools}%

Chrome DevTools에는 성능 측정을 위한 유용한 탭 두 개, `Performance`와 `Lighthouse`가 있습니다.

[Performance](https://developer.chrome.com/docs/devtools/performance/overview) 패널을 열면, 로컬 환경에서의 **Largest Contentful Paint (LCP)** 및 **Cumulative Layout Shift (CLS)** 점수를(좋음, 개선 필요, 나쁨) 즉시 보여줍니다.  

페이지와 상호작용하면 **Interaction to Next Paint (INP)**도 캡처하여, 사용 중인 기기와 네트워크를 기반으로 Core Web Vitals 전체를 확인할 수 있습니다.

![Chrome DevTools Performance Panel](https://developer.chrome.com/static/docs/devtools/performance/image/cpu-throttling_856.png)

[Lighthouse](https://developer.chrome.com/docs/devtools/lighthouse)는 성능, 접근성, SEO, PWA, 모범 사례를 감사합니다. 페이지에 대해 테스트를 실행하고 리포트를 생성합니다. 실패한 감사 항목을 사이트 개선을 위한 가이드로 사용하세요.

![Lighthouse](https://developer.chrome.com/static/docs/lighthouse/images/lighthouse-overview_720.png)

각 감사 항목에는 해당 감사가 왜 중요한지와 이를 어떻게 해결할 수 있는지 설명하는 참고 문서가 있습니다.

### PageSpeed Insights %{pagespeed-insights}%

[PageSpeed Insights (PSI)](https://developers.google.com/speed/docs/insights/v5/about)는 모바일 및 데스크톱 기기에서의 페이지 사용자 경험을 보고하고, 해당 페이지를 어떻게 개선할 수 있는지에 대한 제안을 제공합니다.

이는 페이지에 대한 실험실 데이터와 필드 데이터를 모두 제공합니다. 실험실 데이터는 통제된 환경에서 수집되므로 문제 디버깅에 유용하며, 필드 데이터는 실제, 현실 세계의 사용자 경험을 포착하는 데 유용합니다.

### Web Page Test %{web-page-test}%

[WebPageTest](https://www.webpagetest.org/)는 다양한 조건에서 페이지가 어떻게 동작하는지에 대한 심층 진단 정보를 제공하는 웹 성능 도구입니다.

각 테스트는 전 세계 여러 위치에서, 실제 브라우저를 사용해, 다양한 사용자 정의 네트워크 조건에서 실행할 수 있습니다.

## Common problems %{common-problems}%

더 복잡한 Nuxt 애플리케이션을 구축할 때, 아래에 나열된 문제들 중 일부를 마주치게 될 가능성이 높습니다. 이러한 문제를 이해하고 해결하는 것은 웹사이트 성능을 향상시키는 데 도움이 됩니다.

### Overusing plugins %{overusing-plugins}%

**문제**: 많은 수의 플러그인은 특히 비용이 많이 드는 연산이 필요하거나 초기화에 너무 오래 걸리는 경우 성능 문제를 일으킬 수 있습니다. 플러그인은 하이드레이션 단계에서 실행되므로, 비효율적인 설정은 렌더링을 차단하고 사용자 경험을 저하시킬 수 있습니다.

**해결책**: 플러그인을 점검하여, 그중 일부를 대신 컴포저블이나 유틸리티 함수로 구현할 수 있는지 확인하세요.

### Unused code / dependencies %{unused-code-dependencies}%

**문제**: 프로젝트가 개발됨에 따라, 사용되지 않는 코드나 의존성이 생길 수 있습니다. 이 추가 기능은 사용되지 않거나 필요하지 않을 수 있지만, 프로젝트의 번들 크기를 증가시킵니다.

**해결책**: `package.json`에서 사용되지 않는 의존성을 점검하고, 코드에서 사용되지 않는 유틸/컴포저블/함수를 분석하세요.

### Not using Vue Performance tips %{not-using-vue-performance-tips}%

**문제**: [Vue 문서](https://vuejs.org/guide/best-practices/performance)는 Nuxt 프로젝트에서도 사용할 수 있는 여러 성능 개선 사항을 나열하고 있지만, Vue 문서의 일부이기 때문에 개발자들은 이를 잊고 Nuxt 전용 개선 사항에만 집중하는 경향이 있습니다. 그러나 Nuxt 애플리케이션은 여전히 Vue 프로젝트입니다.

**해결책**: 성능을 개선하기 위해 `shallowRef`, `v-memo`, `v-once` 등의 개념을 사용하세요.

### Not following patterns %{not-following-patterns}%

**문제**: 프로젝트에 참여하는 인원이 많아질수록 안정적인 코드베이스를 유지하기가 더 어려워집니다. 개발자들은 다른 프로젝트에서 본 새로운 개념을 도입하는 경향이 있으며, 이는 충돌과 성능 문제를 야기할 수 있습니다.

**해결책**: [Good practices and Design Patterns for Vue Composables](https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk)와 같은 규칙과 패턴을 프로젝트에 수립하세요.

### Trying to load everything at the same time %{trying-to-load-everything-at-the-same-time}%

**문제**: 페이지가 로드될 때 요소 로딩 순서에 대해 올바르게 지시되지 않으면, 모든 것을 동시에 가져오게 되어 느려질 수 있고 좋지 않은 사용자 경험을 초래할 수 있습니다.

**해결책**: Progressive Enhancement와 같은 개념을 사용하세요. 여기서 핵심 웹페이지 콘텐츠가 먼저 설정되고, 그 위에 브라우저/인터넷 연결 상태가 허용하는 한에서 더 세밀하고 기술적으로 복잡한 표현 및 기능 레이어가 추가됩니다.

## Useful Resources %{useful-resources}%

성능을 개선하기 위한 다양한 기술에 대해 더 알아보려면 다음 리소스를 참고하세요:

1. [Apply instant loading with the PRPL pattern](https://web.dev/articles/apply-instant-loading-with-prpl)
2. [Perceived performance](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Perceived_performance)
3. [Understanding Critical Rendering Path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path)
