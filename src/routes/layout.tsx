import { component$, Slot } from '@builder.io/qwik'

export default component$(() => {
  return (
    <main class="w-full max-w-[1200px] px-5">
      <Slot />
    </main>
  )
})
