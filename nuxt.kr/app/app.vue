<script setup lang="ts">
const colorMode = useColorMode()
const { version } = useDocsVersion()

const color = computed(() => colorMode.value === 'dark' ? '#020420' : 'white')
const { data: navigation } = await useFetch('/api/navigation.json')

watch(() => colorMode.preference, (newMode, oldMode) => {
  if (oldMode && newMode !== oldMode) {
    useAnalytics().track('Color Mode Changed', { mode: newMode })
  }
})

useHead({
  titleTemplate: title => title ? `${title} · Nuxt` : 'Nuxt: 직관적인 웹 프레임워크',
  meta: [
    { key: 'theme-color', name: 'theme-color', content: color }
  ]
})

if (import.meta.server) {
  useHead({
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' }
    ],
    htmlAttrs: {
      lang: 'ko'
    }
  })

  useSeoMeta({
    ogSiteName: 'Nuxt',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: 'nuxt_js'
  })
}

const versionNavigation = computed(() => navigation.value?.filter(item => item.path === version.value.path) ?? [])

provide('navigation', versionNavigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
@media (min-width: 1024px) {
  .root {
    --ui-header-height: 112px;
  }
}
</style>
