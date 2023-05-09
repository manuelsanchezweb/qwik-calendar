import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Calendar } from '~/components/calendar'
import { routeLoader$ } from '@builder.io/qwik-city'
import { createServerClient } from 'supabase-auth-helpers-qwik'
import { supabase } from '~/lib/db'

export const useDBTest = routeLoader$(async (requestEv) => {
  const supabaseClient = createServerClient(
    requestEv.env.get('PUBLIC_SUPABASE_URL')!,
    requestEv.env.get('PUBLIC_SUPABASE_ANON_KEY')!,
    requestEv
  )

  const { data } = await supabaseClient.from('profiles').select('*')
  return { data }
})

export default component$(() => {
  const data = useDBTest()
  // console.log(data.value)

  return (
    <>
      <h1>Calendar App</h1>
      <br />
      <Calendar />

      <button
        class="btn-black w-full mt-12"
        onClick$={async () => {
          const { error } = await supabase.auth.signOut()
          if (error) console.log('Error logging out:', error.message)
        }}
      >
        Logout
      </button>
    </>
  )
})

export const head: DocumentHead = {
  title: '🗓️ Calendar App con Qwik',
  meta: [
    {
      name: 'description',
      content: 'Crea una app de calendario compartida con Qwik!',
    },
  ],
}
