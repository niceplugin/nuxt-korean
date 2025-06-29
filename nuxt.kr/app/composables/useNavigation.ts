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
        to: `${to}/getting-started`,
        active: route.path.startsWith(`${to}/getting-started`)
      }, {
        label: '가이드',
        description: '핵심 개념, 디렉터리 구조, 베스트 프랙티스를 알아보세요.',
        icon: 'i-lucide-book-open',
        to: `${to}/guide`,
        active: route.path.startsWith(`${to}/guide`)
      }, {
        label: 'API',
        description: 'Nuxt 컴포넌트, 컴포저블, 유틸리티 등을 살펴보세요.',
        icon: 'i-lucide-code-xml',
        to: `${to}/api`,
        active: route.path.startsWith(`${to}/api`)
      }, {
        label: '예제',
        description: '공식 및 커뮤니티 예제를 탐색하고 확인해보세요.',
        icon: 'i-lucide-app-window-mac',
        to: `${to}/examples`,
        active: route.path.startsWith(`${to}/examples`)
      }, {
        label: '커뮤니티',
        description: '커뮤니티에서 답변과 지원을 받아보세요.',
        icon: 'i-lucide-messages-square',
        to: `https://nuxt.com/docs/community/getting-help`,
        target: '_blank'
      }]
    }, {
      label: '통합',
      icon: 'i-lucide-unplug',
      search: false,
      children: [{
        label: '모듈',
        description: '모듈을 통해 Nuxt 프로젝트를 더욱 강력하게 만들어보세요.',
        icon: 'i-lucide-puzzle',
        to: 'https://nuxt.com/modules',
        target: '_blank'
      }, {
        label: '호스팅',
        description: 'Nuxt 프로젝트를 어디서든 배포하세요.',
        icon: 'i-lucide-rocket',
        to: 'https://nuxt.com/deploy',
        target: '_blank'
      }]
    }, {
      label: '자료실',
      icon: 'i-lucide-library',
      search: false,
      children: [{
        label: '템플릿',
        icon: 'i-lucide-app-window',
        description: 'Nuxt 템플릿으로 다음 프로젝트를 시작해보세요.',
        to: 'https://nuxt.com/templates',
        target: '_blank'
      }, {
        label: '동영상 강의',
        description: '동영상 강의를 통해 Nuxt를 배워보세요.',
        icon: 'i-lucide-graduation-cap',
        to: 'https://nuxt.com/video-courses',
        target: '_blank'
      }, {
        label: '쇼케이스',
        description: 'Nuxt로 만든 다양한 프로젝트를 살펴보세요.',
        icon: 'i-lucide-presentation',
        to: 'https://nuxt.com/showcase',
        target: '_blank'
      }, {
        label: 'Nuxt 자격증',
        description: '공식 자격증을 취득해보세요.',
        icon: 'i-lucide-medal',
        to: 'https://certification.nuxt.com',
        target: '_blank'
      }]
    }, {
      label: '제품',
      icon: 'i-lucide-sparkle',
      search: false,
      children: [{
        label: 'Nuxt UI Pro',
        to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=header',
        description: 'Vue 또는 Nuxt용 프리미엄 컴포넌트로 더 빠르게 구축하세요.',
        icon: 'i-lucide-panels-top-left',
        target: '_blank'
      }, {
        label: 'Nuxt Studio',
        to: 'https://content.nuxt.com/studio/?utm_source=nuxt-website&utm_medium=header',
        description: '시각적 에디터로 Nuxt Content 웹사이트를 편집하세요.',
        icon: 'i-lucide-pen',
        target: '_blank'
      }, {
        label: 'NuxtHub',
        to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=header',
        description: '확장 가능한 풀스택 Nuxt 앱을 배포하고 관리하세요.',
        icon: 'i-lucide-rocket',
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
  label: 'Products',
  children: [{
    label: 'Nuxt UI Pro',
    to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }, {
    label: 'Nuxt Studio',
    to: 'https://content.nuxt.com/studio/?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }, {
    label: 'NuxtHub',
    to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=footer',
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

  const searchLinks = computed(() => [
    {
      label: 'Ask AI',
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect: () => nuxtApp.$kapa?.openModal()
    },
    ...headerLinks.value.map((link) => {
      // Remove `/docs` and `/enterprise` links from command palette
      if (link.search === false) {
        return {
          label: link.label,
          icon: link.icon,
          children: link.children
        }
      }
      return link
    }).filter((link): link is NonNullable<typeof link> => Boolean(link)), {
      label: 'Team',
      icon: 'i-lucide-users',
      to: 'https://nuxt.com/team'
    }, {
      label: 'Design Kit',
      icon: 'i-lucide-palette',
      to: 'https://nuxt.com/design-kit'
    }, {
      label: 'Newsletter',
      icon: 'i-lucide-mail',
      to: 'https://nuxt.com/newsletter'
    }])

  type SearchGroup = {
    id: string
    label: string
    icon?: string
    items: Array<{
      id: string
      label: string
      suffix?: string
      icon?: string
      avatar?: {
        src?: string
        ui?: {
          root: string
        }
      }
      to: string
      onSelect?: () => Promise<void>
    }>
  }

  const searchGroups = computed<SearchGroup[]>(() => {
    const aiGroup: SearchGroup = {
      id: 'ask-ai-search',
      label: 'AI',
      icon: 'i-lucide-wand',
      items: []
    }

    const modulesGroup: SearchGroup = {
      id: 'modules-search',
      label: 'Modules',
      items: []
    }


    const groups = [aiGroup, modulesGroup]

    if (!searchTerm.value) {
      return groups
    }

    aiGroup.items = [{
      id: `ask-ai-${searchTerm.value}`,
      label: `Ask AI about "${searchTerm.value}"`,
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect() {
        return nuxtApp.$kapa.openModal(searchTerm.value)
      }
    }]

    const loadModules = async () => {
      const { modules, fetchList } = useModules()
      if (!modules.value.length) {
        await fetchList()
      }

      modulesGroup.items = modules.value
        .filter(module => ['name', 'npm', 'repo'].map(field => module[field as keyof typeof module]).filter(Boolean).some(value => typeof value === 'string' && value.search(searchTextRegExp(searchTerm.value)) !== -1))
        .map(module => ({
          id: `module-${module.name}`,
          label: module.npm,
          suffix: module.description,
          avatar: {
            src: moduleImage(module.icon),
            ui: {
              root: 'rounded-none bg-transparent'
            }
          },
          to: `/modules/${module.name}`
        }))
    }

    onMounted(() => {
      Promise.all([
        loadModules()
      ]).catch(error => console.error('Error loading search results:', error))
    })

    return groups
  })

  return {
    searchTerm,
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = import.meta.client ? createSharedComposable(_useNavigation) : _useNavigation
