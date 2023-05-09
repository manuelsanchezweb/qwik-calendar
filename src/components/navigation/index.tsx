import { Signal, component$ } from '@builder.io/qwik'
import type { User } from '@supabase/supabase-js'

import { handleSignOut } from '~/lib/db'

interface NavigationProps {
  userSignal: User
}

export const Navigation = component$<NavigationProps>(({ userSignal }) => {
  if (!userSignal) return null

  return (
    <nav class="flex justify-between w-full items-center gap-4 my-6">
      <div class="flex ">
        Hola, {userSignal.email} -
        {userSignal.user_metadata?.name ? (
          <p> This is your name, right? {userSignal.user_metadata?.name} </p>
        ) : null}
      </div>
      <button class="bg-blue-500 py-2 px-4 w-fit" onClick$={handleSignOut}>
        Logout
      </button>
    </nav>
  )
})
