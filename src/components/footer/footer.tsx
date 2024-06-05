import { component$ } from '@builder.io/qwik'
import { APP_VERSION } from '~/constants/constants'
import { deleteAllCookies } from '~/utils/functions'

export const Footer = component$(() => {
  return (
    <footer class="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-between mb-8">
      <div>Version {APP_VERSION}</div>
      <button class="text-red-400 text-xs border-2 bg-red-50 border-red-400 rounded-lg px-4 py-2 flex justify-center items-center" onClick$={() => deleteAllCookies()}>
        Log out
      </button>
    </footer>
  )
})
