const externalExactRoutes = new Set([
  '/changelog',
  '/design-kit',
  '/evals',
  '/newsletter',
  '/showcase',
  '/team',
  '/templates',
  '/video-courses'
])

const externalRoutePrefixes = [
  '/blog',
  '/deploy',
  '/enterprise',
  '/modules'
]

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1)
  }

  return path
}

export default defineNuxtRouteMiddleware((to) => {
  const path = normalizePath(to.path)
  const isExternalRoute = externalExactRoutes.has(path)
    || externalRoutePrefixes.some(prefix => path === prefix || path.startsWith(`${prefix}/`))

  if (!isExternalRoute) {
    return
  }

  return navigateTo(`https://nuxt.com${to.fullPath}`, {
    external: true,
    redirectCode: 302
  })
})
