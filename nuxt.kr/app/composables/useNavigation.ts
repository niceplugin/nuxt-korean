import type { CommandPaletteGroup } from '@nuxt/ui'
import { createSharedComposable } from '@vueuse/core'

function _useHeaderLinks() {
  const route = useRoute()
  const { version } = useDocsVersion()

  const headerLinks = computed(() => {
    const docsPath = version.value.path

    return [{
      label: '문서',
      icon: 'i-lucide-book-marked',
      to: docsPath,
      search: false,
      active: route.path.startsWith(docsPath),
      children: [{
        label: '시작하기',
        description: 'Nuxt로 첫 앱을 만드는 방법을 배워보세요.',
        icon: 'i-lucide-rocket',
        to: `${docsPath}/getting-started/installation`,
        active: route.path.startsWith(`${docsPath}/getting-started`)
      }, {
        label: '구조',
        description: 'Nuxt 프로젝트의 디렉터리 구조를 알아보세요.',
        icon: 'i-lucide-folder-open',
        to: `${docsPath}/directory-structure`,
        active: route.path.startsWith(`${docsPath}/directory-structure`)
      }, {
        label: '가이드',
        description: '핵심 개념과 모범 사례를 확인해보세요.',
        icon: 'i-lucide-book-open',
        to: `${docsPath}/guide`,
        active: route.path.startsWith(`${docsPath}/guide`) && !route.path.startsWith(`${docsPath}/guide/directory-structure`)
      }, {
        label: 'API',
        description: 'Nuxt 컴포넌트, 컴포저블, 유틸리티를 살펴보세요.',
        icon: 'i-lucide-code-xml',
        to: `${docsPath}/api`,
        active: route.path.startsWith(`${docsPath}/api`)
      }, {
        label: '배포',
        description: 'Nuxt 프로젝트를 어디에든 배포하세요.',
        icon: 'i-lucide-cloud',
        to: 'https://nuxt.com/deploy',
        target: '_blank'
      }, {
        label: '예제',
        description: '공식 예제와 커뮤니티 예제를 살펴보세요.',
        icon: 'i-lucide-app-window-mac',
        to: `${docsPath}/examples`,
        active: route.path.startsWith(`${docsPath}/examples`)
      }, {
        label: '커뮤니티',
        description: '커뮤니티에서 도움과 답변을 찾아보세요.',
        icon: 'i-lucide-messages-square',
        to: `${docsPath}/community`,
        active: route.path.startsWith(`${docsPath}/community`)
      }]
    }, {
      label: '모듈',
      icon: 'i-lucide-puzzle',
      description: 'Nuxt 모듈 생태계를 둘러보세요.',
      to: 'https://nuxt.com/modules',
      target: '_blank'
    }, {
      label: '템플릿',
      icon: 'i-lucide-app-window',
      description: 'Nuxt 템플릿으로 프로젝트를 빠르게 시작하세요.',
      to: 'https://nuxt.com/templates',
      target: '_blank'
    }, {
      label: '리소스',
      icon: 'i-lucide-library',
      search: false,
      children: [{
        label: '쇼케이스',
        description: 'Nuxt로 만든 실제 프로젝트를 살펴보세요.',
        icon: 'i-lucide-presentation',
        to: 'https://nuxt.com/showcase',
        target: '_blank'
      }, {
        label: '동영상 강의',
        description: '영상 강의로 Nuxt를 배워보세요.',
        icon: 'i-lucide-graduation-cap',
        to: 'https://nuxt.com/video-courses',
        target: '_blank'
      }, {
        label: 'Nuxt 자격증',
        description: '공식 자격증 프로그램을 확인해보세요.',
        icon: 'i-lucide-medal',
        to: 'https://certification.nuxt.com',
        target: '_blank'
      }]
    }, {
      label: '엔터프라이즈',
      icon: 'i-lucide-building-2',
      search: false,
      children: [{
        label: '지원',
        description: 'Nuxt 전문가의 지원 서비스를 확인해보세요.',
        icon: 'i-lucide-life-buoy',
        to: 'https://nuxt.com/enterprise/support',
        target: '_blank'
      }, {
        label: '에이전시',
        description: 'Nuxt 전문 에이전시를 찾아보세요.',
        icon: 'i-lucide-handshake',
        to: 'https://nuxt.com/enterprise/agencies',
        target: '_blank'
      }, {
        label: '스폰서',
        description: 'Nuxt 프로젝트를 후원하는 방법을 확인해보세요.',
        icon: 'i-lucide-hand-heart',
        to: 'https://nuxt.com/enterprise/sponsors',
        target: '_blank'
      }]
    }, {
      label: '블로그',
      icon: 'i-lucide-newspaper',
      description: 'Nuxt 소식과 릴리스 노트를 읽어보세요.',
      to: 'https://nuxt.com/blog',
      target: '_blank'
    }]
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks

const footerLinks = [{
  label: '커뮤니티',
  children: [{
    label: 'Nuxters',
    to: 'https://nuxters.nuxt.com',
    target: '_blank'
  }, {
    label: '팀',
    to: 'https://nuxt.com/team',
    target: '_blank'
  }, {
    label: '디자인 키트',
    to: 'https://nuxt.com/design-kit',
    target: '_blank'
  }]
}, {
  label: '둘러보기',
  children: [{
    label: '모듈',
    to: 'https://nuxt.com/modules',
    target: '_blank'
  }, {
    label: '템플릿',
    to: 'https://nuxt.com/templates',
    target: '_blank'
  }, {
    label: '쇼케이스',
    to: 'https://nuxt.com/showcase',
    target: '_blank'
  }]
}, {
  label: '엔터프라이즈',
  children: [{
    label: '지원',
    to: 'https://nuxt.com/enterprise/support',
    target: '_blank'
  }, {
    label: '에이전시',
    to: 'https://nuxt.com/enterprise/agencies',
    target: '_blank'
  }, {
    label: '스폰서',
    to: 'https://nuxt.com/enterprise/sponsors',
    target: '_blank'
  }]
}]

export const useFooterLinks = () => ({ footerLinks })

const _useNavigation = () => {
  const nuxtApp = useNuxtApp()
  const searchTerm = ref<string>('')
  const { track } = useAnalytics()

  const { headerLinks } = useHeaderLinks()
  const { footerLinks } = useFooterLinks()

  const searchLinks = computed(() => [{
    label: 'AI에게 물어보기',
    icon: 'i-lucide-wand',
    to: 'javascript:void(0);',
    onSelect: () => {
      track('Ask AI Opened', { source: 'search-links' })
      nuxtApp.$kapa?.openModal()
    }
  }, ...headerLinks.value.flatMap((link) => {
    if (link.search === false) {
      return (link.children || []).map(child => ({
        ...child,
        label: `${link.label} > ${child.label}`
      }))
    }

    return [link]
  }), {
    label: '팀',
    icon: 'i-lucide-users',
    to: 'https://nuxt.com/team',
    target: '_blank'
  }, {
    label: '디자인 키트',
    icon: 'i-lucide-palette',
    to: 'https://nuxt.com/design-kit',
    target: '_blank'
  }, {
    label: '뉴스레터',
    icon: 'i-lucide-mail',
    to: 'https://nuxt.com/newsletter',
    target: '_blank'
  }, {
    label: '소스 코드',
    icon: 'i-lucide-code',
    to: 'https://github.com/nuxt/nuxt.com',
    target: '_blank'
  }])

  const searchGroups = computed<CommandPaletteGroup[]>(() => [{
    id: 'ask-ai-search',
    label: 'AI',
    ignoreFilter: true,
    postFilter: (searchTerm: string, items: any[]) => {
      if (!searchTerm) {
        return []
      }

      return items
    },
    items: [{
      label: 'AI에게 물어보기',
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect() {
        track('Ask AI Opened', { source: 'search-palette', query: searchTerm.value })
        nuxtApp.$kapa?.openModal(searchTerm.value)
      }
    }]
  }])

  watchDebounced(searchTerm, (term) => {
    if (term) {
      track('Search Performed', { term })
    }
  }, { debounce: 500 })

  return {
    searchTerm,
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = import.meta.client ? createSharedComposable(_useNavigation) : _useNavigation
