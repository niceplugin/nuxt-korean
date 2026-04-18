export default defineNuxtPlugin(() => {
  return {
    provide: {
      ads: {
        adBlocked: ref(false)
      }
    }
  }
})
