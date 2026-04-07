import { ref, watchEffect, onMounted } from 'vue'

/**
 * Toggle between light and dark themes by setting/removing `.dark` on the
 * document root. The library's `@custom-variant dark (&:where(.dark, .dark *))`
 * picks it up and swaps every token.
 *
 * SSR-safe: all `document` access lives inside onMounted / watchEffect, never
 * at module scope. The ref starts as `false` on the server and gets the real
 * value on the client after hydration.
 */
export function useDark() {
  const isDark = ref(false)

  onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
    watchEffect(() => {
      document.documentElement.classList.toggle('dark', isDark.value)
    })
  })

  return {
    isDark,
    toggle: () => {
      isDark.value = !isDark.value
    },
  }
}
