import { $, component$, useOnDocument, useSignal } from '@builder.io/qwik'
import type { User } from '@supabase/supabase-js'
import { IconManager } from '~/icons/icon-manager'
import { LogoOnlyText } from '~/icons/logos'
// import { handleSignOut } from '~/lib/db'

interface NavigationProps {
  userSignal: User
}

export const Navigation = component$<NavigationProps>(({ userSignal }) => {
  if (!userSignal) return null

  const showUserMenu = useSignal(false)

  const openUserMenu = $(() => {
    showUserMenu.value = !showUserMenu.value
  })

  const handleOutsideClick = $((event: any) => {
    if (!event.target.closest('.menu')) {
      showUserMenu.value = false
    }
  })

  useOnDocument('click', handleOutsideClick)

  return (
    <nav class="flex justify-between w-full items-center gap-4 my-6">
      <LogoOnlyText classCustom="w-48" />
      <div class="relative">
        <button
          onClick$={openUserMenu}
          class="flex gap-2 items-center text-primary"
        >
          <IconManager icon="user" />
          <span class="hidden sm:block">
            Hola, {userSignal.user_metadata?.name}
          </span>
        </button>
        {showUserMenu.value && (
          <div class="absolute -bottom-20 bg-primary w-full z-10 p-4 rounded-sm">
            <button
              class="bg-white text-primary border border-primary py-2 px-4 w-full"
              // onClick$={handleSignOut}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
})

// get date in this format YYYY-MM-DDTHH:mm:ss.sssZ

// const date = new Date()
// const year = date.getFullYear()
// const month = date.getMonth()
// const day = date.getDate()
// const hours = date.getHours()
// const minutes = date.getMinutes()
// const seconds = date.getSeconds()
// const milliseconds = date.getMilliseconds()
// const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`

// const now = new Date()
// const seconds = now.getSeconds()
// console.log(seconds)
