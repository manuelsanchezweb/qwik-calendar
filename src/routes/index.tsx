import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Calendar } from '~/components/calendar'
import type { User } from '@supabase/supabase-js'
import { supabase } from '~/lib/db'
import { AuthForm } from '~/components/auth'
import { Navigation } from '~/components/navigation'
import { LoadingScreen } from '~/components/loading-screen/loading-screen'

export default component$(() => {
  const userSignal = useSignal<User | null>()
  const isLoading = useSignal(true)

  useVisibleTask$(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      userSignal.value = session?.user ?? null
    })

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user
      userSignal.value = currentUser ?? null
      isLoading.value = false
    })

    return () => {
      authListener?.unsubscribe()
    }
  })

  if (isLoading.value) return <LoadingScreen />

  return (
    <>
      {userSignal.value ? (
        <>
          <Navigation userSignal={userSignal.value} />

          <h1 class="text-black text-4xl my-6">Calendar App</h1>
          <Calendar />
        </>
      ) : (
        <div class="min-w-full flex items-center justify-center">
          <AuthForm />
        </div>
      )}
    </>
  )
})

export const head: DocumentHead = {
  title: 'Calendar App con Qwik',
  meta: [
    {
      name: 'description',
      content: 'Crea una app de calendario compartida con Qwik!',
    },
  ],
}
