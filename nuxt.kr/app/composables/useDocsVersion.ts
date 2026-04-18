import type { BadgeProps } from '@nuxt/ui'

interface Version {
  label: string
  shortTag: 'v5' | 'v4' | 'v3' | 'v2'
  branch: string
  tagColor: BadgeProps['color']
  path: string
  collection?: 'docsv3' | 'docsv4' | 'docsv5'
}

const versions: Version[] = [
  {
    label: '버전 5',
    shortTag: 'v5',
    branch: 'main',
    tagColor: 'warning',
    path: '/docs/5.x',
    collection: 'docsv5'
  },
  {
    label: '버전 4',
    shortTag: 'v4',
    branch: '4.x',
    tagColor: 'primary',
    path: '/docs/4.x',
    collection: 'docsv4'
  },
  {
    label: '버전 3',
    shortTag: 'v3',
    branch: '3.x',
    tagColor: 'neutral',
    path: '/docs/3.x',
    collection: 'docsv3'
  },
  {
    label: '버전 2',
    shortTag: 'v2',
    branch: '2.x',
    tagColor: 'neutral',
    path: 'https://v2.nuxt.com'
  }
]

const staticTags: Record<Version['shortTag'], string> = {
  v5: '5',
  v4: '4',
  v3: '3',
  v2: '2'
}

export const useDocsTags = () => {
  const tags = computed(() => staticTags)

  return { tags }
}

export const useDocsVersion = () => {
  const route = useRoute()
  const { track } = useAnalytics()

  const version = computed(() => {
    if (route.path.startsWith('/docs/5.x')) {
      return versions.find(v => v.path === '/docs/5.x')
    }

    if (route.path.startsWith('/docs/3.x')) {
      return versions.find(v => v.path === '/docs/3.x')
    }

    // Default to v4 (current stable)
    return versions.find(v => v.path === '/docs/4.x')
  })

  const items = computed(() => versions.map(v => ({
    ...v,
    ...(v.branch === version.value.branch
      ? {
          checked: true,
          color: v.tagColor,
          type: 'checkbox' as const
        }
      : {
          to: v.path === 'https://v2.nuxt.com' ? v.path : route.path.replace(version.value.path, v.path),
          onSelect: () => track('Version Switched', { version: v.shortTag })
        })
  })))

  return {
    items,
    version,
    versions
  }
}
