export function useUserSession() {
  const user = useState<Record<string, any> | null>('user-session:user', () => null)
  const session = useState<Record<string, any> | null>('user-session:session', () => null)
  const loggedIn = computed(() => Boolean(user.value))

  async function clear() {
    user.value = null
    session.value = null
  }

  return {
    user,
    session,
    loggedIn,
    clear
  }
}
