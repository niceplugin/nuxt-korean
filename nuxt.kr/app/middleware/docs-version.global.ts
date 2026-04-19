export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/docs/3.x' || to.path.startsWith('/docs/3.x/')) {
    return navigateTo(`https://nuxt.com${to.fullPath}`, {
      external: true,
      redirectCode: 301
    })
  }

  if (to.path.startsWith('/docs/') && !to.path.startsWith('/docs/5.x') && !to.path.startsWith('/docs/4.x') && !to.path.startsWith('/docs/3.x')) {
    return to.fullPath.replace('/docs', '/docs/4.x')
  }
})
