import type { CommandPaletteGroup } from '@nuxt/ui'
import { createSharedComposable } from '@vueuse/core'

function _useHeaderLinks() {
  const route = useRoute()
  const { version } = useDocsVersion()

  const headerLinks = computed(() => {
    const to = version.value.path

    return [{
      label: '문서',
      icon: 'i-lucide-book-marked',
      to,
      search: false,
      active: route.path.startsWith(to),
      children: [{
        label: '시작하기',
        description: 'Nuxt로 첫 앱을 만드는 방법을 배워보세요.',
        icon: 'i-lucide-rocket',
        to: `${to}/getting-started/installation`,
        active: route.path.startsWith(`${to}/getting-started`)
      }, {
        label: '구조',
        description: 'Nuxt 프로젝트의 디렉터리 구조를 알아보세요.',
        icon: 'i-lucide-folder-open',
        to: `${to}/directory-structure`,
        active: route.path.startsWith(`${to}/directory-structure`)
      }, {
        label: '가이드',
        description: '핵심 개념, 디렉터리 구조, 그리고 모범 사례를 확인하세요.',
        icon: 'i-lucide-book-open',
        to: `${to}/guide`,
        active: route.path.startsWith(`${to}/guide`) && !route.path.startsWith(`${to}/guide/directory-structure`)
      }, {
        label: 'API',
        description: 'Nuxt 컴포넌트, 컴포저블, 유틸리티 등 다양한 요소를 살펴보세요.',
        icon: 'i-lucide-code-xml',
        to: `${to}/api`,
        active: route.path.startsWith(`${to}/api`)
      }, {
        label: '배포',
        description: 'Nuxt 프로젝트를 어디에든 배포하세요.',
        icon: 'i-lucide-cloud',
        to: 'https://nuxt.com/deploy',
        target: '_blank'
      }, {
        label: '예제',
        description: '공식 예제와 커뮤니티 예제를 찾아보고 살펴보세요.',
        icon: 'i-lucide-app-window-mac',
        to: `${to}/examples`,
        active: route.path.startsWith(`${to}/examples`)
      }, {
        label: '커뮤니티',
        description: '커뮤니티로부터 답변과 지원을 받아보세요.',
        icon: 'i-lucide-messages-square',
        to: `https://nuxt.com${to}/community`,
        target: '_blank'
      }]
    }, {
      label: '모듈',
      icon: 'i-lucide-puzzle',
      to: 'https://nuxt.com/modules',
      description: '모듈로 Nuxt 프로젝트를 더욱 강력하게 확장하세요.',
      target: '_blank'
    }, {
      label: '템플릿',
      icon: 'i-lucide-app-window',
      description: '다음 프로젝트를 Nuxt 템플릿으로 시작하세요.',
      to: 'https://nuxt.com/templates',
      target: '_blank'
    }, {
      label: '리소스',
      icon: 'i-lucide-library',
      search: false,
      children: [{
        label: '쇼케이스',
        description: 'Nuxt로 만든 다양한 프로젝트를 살펴보세요.',
        icon: 'i-lucide-presentation',
        to: 'https://nuxt.com/showcase',
        target: '_blank'
      }, {
        label: '동영상 강의',
        description: '동영상 강의를 통해 Nuxt를 배워보세요.',
        icon: 'i-lucide-graduation-cap',
        to: 'https://nuxt.com/video-courses',
        target: '_blank'
      }, {
        label: 'Nuxt 자격증',
        description: '공식 자격증을 취득해보세요.',
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
        to: 'https://nuxt.com/enterprise/support',
        description: 'Nuxt 전문가의 전문적인 지원을 받아보세요.',
        icon: 'i-lucide-life-buoy',
        target: '_blank'
      }, {
        label: '에이전시',
        to: 'https://nuxt.com/enterprise/agencies',
        description: 'Nuxt 개발에 특화된 에이전시를 확인해보세요.',
        icon: 'i-lucide-handshake',
        target: '_blank'
      }, {
        label: '스폰서',
        to: 'https://nuxt.com/enterprise/sponsors',
        description: 'Nuxt 개발을 지속할 수 있도록 후원해주세요.',
        icon: 'i-lucide-hand-heart',
        target: '_blank'
      }]
    }, {
      label: '블로그',
      icon: 'i-lucide-newspaper',
      to: 'https://nuxt.com/blog',
      target: '_blank'
    }]
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks

const footerLinks = [{
  label: 'Community',
  children: [{
    label: 'Nuxters',
    to: 'https://nuxters.nuxt.com',
    target: '_blank'
  }, {
    label: 'Team',
    to: 'https://nuxt.com/team',
    target: '_blank'
  }, {
    label: 'Design Kit',
    to: 'https://nuxt.com/design-kit',
    target: '_blank'
  }]
}, {
  label: 'Explore',
  children: [{
    label: 'Modules',
    to: 'https://nuxt.com/modules',
    target: '_blank'
  }, {
    label: 'Templates',
    to: 'https://nuxt.com/templates',
    target: '_blank'
  }, {
    label: 'Showcase',
    to: 'https://nuxt.com/showcase',
    target: '_blank'
  }]
}, {
  label: 'Enterprise',
  children: [{
    label: 'Support',
    to: 'https://nuxt.com/enterprise/support',
    target: '_blank'
  }, {
    label: 'Agencies',
    to: 'https://nuxt.com/enterprise/agencies',
    target: '_blank'
  }, {
    label: 'Sponsors',
    to: 'https://nuxt.com/enterprise/sponsors',
    target: '_blank'
  }]
}]

export const useFooterLinks = () => ({ footerLinks })

const _useNavigation = () => {
  const nuxtApp = useNuxtApp()
  const searchTerm = ref<string>('')

  const { headerLinks } = useHeaderLinks()
  const { footerLinks } = useFooterLinks()
  const { modules } = useModules()
  const { providers } = useHostingProviders()

  const searchLinks = computed(() => [{
    label: 'Ask AI',
    icon: 'i-lucide-wand',
    to: 'javascript:void(0);',
    onSelect: () => nuxtApp.$kapa?.openModal()
  }, ...headerLinks.value.map((link) => {
    // Remove `/docs` and `/enterprise` links from command palette
    if (link.search === false) {
      return {
        label: link.label,
        icon: link.icon,
        children: link.children
      }
    }
    return link
  }).filter(Boolean), {
    label: 'Team',
    icon: 'i-lucide-users',
    to: 'https://nuxt.com/team',
    target: '_blank'
  }, {
    label: 'Design Kit',
    icon: 'i-lucide-palette',
    to: 'https://nuxt.com/design-kit',
    target: '_blank'
  }, {
    label: 'Newsletter',
    icon: 'i-lucide-mail',
    to: 'https://nuxt.com/newsletter',
    target: '_blank'
  }, {
    label: 'Source Code',
    icon: 'i-lucide-code',
    to: 'https://github.com/nuxt/nuxt.com',
    target: '_blank'
  }])

  const modulesItems = computed(() => modules.value.map(module => ({
    id: `module-${module.name}`,
    label: module.npm,
    suffix: module.description,
    avatar: {
      src: moduleImage(module.icon),
      ui: {
        root: 'rounded-none bg-transparent'
      }
    },
    to: `/modules/${module.name}`,
    // Store searchable fields for filtering
    _searchFields: [module.name, module.npm, module.repo].filter(Boolean)
  })))

  const hostingItems = computed(() => providers.value.map(hosting => ({
    id: `hosting-${hosting.path}`,
    label: hosting.title,
    suffix: hosting.description,
    icon: hosting.logoIcon,
    avatar: hosting.logoSrc
      ? {
          src: hosting.logoSrc,
          ui: {
            root: 'rounded-none bg-transparent'
          }
        }
      : undefined,
    to: hosting.path,
    // Store searchable fields for filtering
    _searchFields: [hosting.title].filter(Boolean)
  })))

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
      label: 'Ask AI',
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect() {
        nuxtApp.$kapa?.openModal(searchTerm.value)
      }
    }]
  }, {
    id: 'modules-search',
    label: 'Modules',
    items: modulesItems.value
  }, {
    id: 'hosting-search',
    label: 'Hosting',
    items: hostingItems.value
  }])

  return {
    searchTerm,
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = import.meta.client ? createSharedComposable(_useNavigation) : _useNavigation
