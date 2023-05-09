import { handleLogin, handleOAuthLogin } from '~/lib/db'
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
// import { HelperText } from '~/types/types'
import IconGithub from '../icon-github'

export const AuthForm = component$(() => {
  const userAction = useSignal('LOGIN')

  const nameSignal = useSignal<string>('')
  const emailSignal = useSignal<string>('')
  const passwordSignal = useSignal<string>('')

  const canSubmit = useSignal<boolean>(
    emailSignal.value.length > 0 && passwordSignal.value.length > 0
  )

  useVisibleTask$(({ track }) => {
    track(emailSignal)
    track(passwordSignal)

    canSubmit.value =
      emailSignal.value.length > 0 && passwordSignal.value.length > 0
  })

  // const helperTextStore = useStore<HelperText>({ error: null, text: null })

  return (
    <main class="flex flex-col gap-8 w-full items-center">
      <div class="w-full h-full sm:h-auto sm:min-w-[400px] p-5 bg-white shadow flex flex-col text-base">
        <span class="font-sans text-4xl text-center pb-2 mb-1 border-b mx-4 align-center">
          {userAction.value === 'REGISTER'
            ? 'Crea una cuenta'
            : 'Inicia sesión'}
        </span>
        {/* Name */}
        {userAction.value === 'REGISTER' ? (
          <fieldset class="flex flex-col my-2">
            <label class="mt-3 mb-2 font-medium text-lg" for="name">
              <span class="font-mono mr-1 text-red-400">*</span>Nombre:
            </label>
            <input
              id="name"
              class="bg-gray-100 border py-1 px-3"
              type="name"
              name="name"
              onInput$={(event) =>
                (nameSignal.value = (
                  event.target as HTMLInputElement
                ).value.trim())
              }
              required
            />
          </fieldset>
        ) : null}
        {/* Email  */}
        <fieldset class="flex flex-col my-2">
          <label class="mt-3 mb-2 font-medium text-lg" for="email">
            <span class="font-mono mr-1 text-red-400">*</span>Email:
          </label>
          <input
            id="email"
            class="bg-gray-100 border py-1 px-3"
            type="email"
            name="email"
            required
            onInput$={(event) =>
              (emailSignal.value = (
                event.target as HTMLInputElement
              ).value.trim())
            }
          />
        </fieldset>
        {/* Password  */}
        <fieldset class="flex flex-col my-2">
          <label class="mt-3 mb-2 font-medium text-lg" for="password">
            <span class="font-mono mr-1 text-red-400">*</span>Password:
          </label>
          <input
            id="password"
            class="bg-gray-100 border py-1 px-3"
            type="password"
            name="password"
            onInput$={(event) =>
              (passwordSignal.value = (
                event.target as HTMLInputElement
              ).value.trim())
            }
            required
          />
        </fieldset>
        {userAction.value === 'LOGIN' ? (
          <button
            class="text-black"
            onClick$={() => (userAction.value = 'REGISTER')}
          >
            ¿No tienes cuenta todavía?
          </button>
        ) : (
          <button
            class="text-black"
            onClick$={() => (userAction.value = 'LOGIN')}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        )}

        {/* {!!helperTextStore.text && (
          <div
            class="border px-1 py-2 my-2 text-center text-sm {helperText.error
        ? 'bg-red-100 border-red-300 text-red-400'
        : 'bg-green-100 border-green-300 text-green-500'}"
          >
            {helperTextStore.text}
          </div>
        )} */}

        <div class="mt-2 flex">
          {userAction.value === 'LOGIN' ? (
            <span class="block w-full mx-1.5 rounded-md shadow-sm">
              <button
                disabled={canSubmit.value === false}
                onClick$={() =>
                  handleLogin({
                    type: 'LOGIN',
                    emailSignal,
                    passwordSignal,
                  })
                }
                type="button"
                class="border w-full border-blue-600 text-blue-600 flex justify-center py-2 px-4 text-sm font-medium rounded-md hover:bg-blue-200 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-blue-600 disabled:text-blue-600 disabled:border-blue-600 disabled:opacity-50"
              >
                Iniciar sesión
              </button>
            </span>
          ) : (
            <span class="block mx-1.5 w-full rounded-md shadow-sm">
              <button
                disabled={canSubmit.value === false}
                type="submit"
                onClick$={() =>
                  handleLogin({
                    type: 'REGISTER',
                    emailSignal,
                    passwordSignal,
                    nameSignal,
                  })
                }
                class="border w-full border-blue-600 text-blue-600 flex justify-center py-2 px-4 text-sm font-medium rounded-md hover:bg-blue-200 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-blue-600 disabled:text-blue-600 disabled:border-blue-600 disabled:opacity-50"
              >
                Crear una cuenta
              </button>
            </span>
          )}
        </div>

        <div class="mt-3">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full mx-1.5 border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm leading-5">
              <span class="px-2 bg-white text-gray-500">
                {' '}
                O continúa a través de{' '}
              </span>
            </div>
          </div>

          <div>
            <div class="mt-3">
              <span class="block rounded-md shadow-sm">
                <button
                  onClick$={() => handleOAuthLogin('github')}
                  type="button"
                  class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                >
                  <div class="flex items-center justify-center">
                    <IconGithub />
                    <span class="ml-4">GitHub</span>
                  </div>
                </button>
              </span>
            </div>
            {/* <div class="mt-3">
            <span class="block rounded-md shadow-sm">
              <button
                onClick$={() => handleOAuthLogin('google')}
                type="button"
                class="w-3/4 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Google
              </button>
            </span>
          </div> */}
          </div>
        </div>
      </div>
    </main>
  )
})
