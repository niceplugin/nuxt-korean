export default defineNuxtPlugin(() => {
  return {
    provide: {
      kapa: {
        async openModal() {}
      }
    }
  }
})
