import { $, component$, useSignal } from '@builder.io/qwik'
import { Form } from '@builder.io/qwik-city'
import { useSubmitPassword } from '~/global'
import { Logo } from '~/icons/logos'

export const LoginForm = component$(() => {
  const passwordVisible = useSignal(false)
  const submitAction = useSubmitPassword()

  const togglePasswordVisibility = $(() => {
    passwordVisible.value = !passwordVisible.value
  })
  return (
    <div class="flex flex-col items-center bg-primaryLight fixed inset-0 justify-center">
      <div class="flex flex-col items-center px-4 md:px-16 py-12 bg-grayBrandLight rounded-lg shadow-sm">
        <Logo classCustom="w-32 h-32" />
        <Form
          action={submitAction}
          class="flex flex-col gap-4 items-center px-2"
          spaReset
        >
          <div class="flex flex-col gap-2 items-center text-center">
            <label for="password">Do you remember your password?</label>
            <div class="relative">
              <input
                required
                class="px-3 py-2 text-sm border border-grayBrandMiddle rounded-md"
                type={passwordVisible.value ? 'text' : 'password'}
                id="password"
                name="password"
                pattern=".{3,}"
                placeholder="coolapp123"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center justify-center pr-1 text-sm leading-5 text-accent"
                onClick$={() => togglePasswordVisibility()}
              >
                {passwordVisible.value ? <IconEyeOn /> : <IconEyeOff />}
              </button>
            </div>
          </div>
          <button class="btn text-black mt-6" type="submit">
            {submitAction.isRunning ? 'Loading...' : 'Submit'}
          </button>
          <small class="text-red-700">{submitAction.value?.message}</small>
        </Form>
      </div>
    </div>
  )
})

export const IconEyeOn = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </svg>
  )
})

export const IconEyeOff = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
      <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
      <path d="M3 3l18 18" />
    </svg>
  )
})
