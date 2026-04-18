import type { Stats } from '#shared/types'

export default defineNuxtPlugin(() => {
  const stats = useStats()
  stats.value ||= null as Stats | null
})
