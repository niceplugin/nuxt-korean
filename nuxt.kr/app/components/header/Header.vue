<script setup lang="ts">
const route = useRoute()
const { headerLinks } = useHeaderLinks()
</script>

<template>
  <UHeader :ui="{ left: 'min-w-0 items-end' }" class="flex flex-col">
    <template #left>
      <NuxtLink to="/" aria-label="Back to home">
        <NuxtLogo class="block w-auto h-6" />
      </NuxtLink>

      <VersionMenu />
    </template>

    <UNavigationMenu
      :items="headerLinks.map((link) => {
        if (link.to?.startsWith('/docs')) {
          return { ...link, children: [] }
        }
        return link
      })"
      variant="link"
      content-orientation="vertical"
      :ui="{ linkLeadingIcon: 'hidden' }"
    />

    <template #right>
      <UColorModeButton />
      <UButton
        icon="i-simple-icons-github"
        to="https://go.nuxt.com/github"
        target="_blank"
        variant="ghost"
        color="neutral"
        square
        aria-label="Nuxt on GitHub"
      />
    </template>

    <template #toggle="{ open, toggle }">
      <HeaderToggle
        :open="open"
        class="lg:hidden"
        @click="toggle"
      />
    </template>

    <template #body>
      <HeaderBody />
    </template>

    <template v-if="route.path.startsWith('/docs/')" #bottom>
      <HeaderBottom />
    </template>
  </UHeader>
</template>
