import { component$ } from '@builder.io/qwik'
import { Logo } from '~/icons/logos'

export const LoadingScreen = component$(() => {
  return (
    <div class="flex flex-col gap-6 items-center justify-center">
      <Logo classCustom="w-48 h-auto" />
      <p>Loading...</p>
    </div>
  )
})
