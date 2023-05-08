import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Calendar } from '~/components/calendar'

export default component$(() => {
  return (
    <>
      <h1>Calendar App</h1>
      <br />
      <Calendar />
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
