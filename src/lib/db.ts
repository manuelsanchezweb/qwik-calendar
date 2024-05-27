import { $, Signal } from "@builder.io/qwik";
import { createClient } from "@supabase/supabase-js";
import type { Provider } from '@supabase/supabase-js'
import Toastify from 'toastify-js'

// export const supabase = createClient(
//   import.meta.env.PUBLIC_SUPABASE_URL,
//   import.meta.env.PUBLIC_SUPABASE_ANON_KEY
// );

// export const handleSignOut = $(async () => {
//   const { error } = await supabase.auth.signOut()
//   if (error) console.log('Error logging out:', error.message)
// })

// export const handleOAuthLogin = $(async (provider: Provider) => {
//   // You need to enable the third party auth you want in Authentication > Settings
//   // Read more on: https://supabase.com/docs/guides/auth#third-party-logins
//   const { error } = await supabase.auth.signInWithOAuth({ provider })
//   if (error) console.log('Error: ', error.message)
// })

// type HandleLoginProps = {
//   type: string
//   emailSignal: Signal<string>
//   passwordSignal: Signal<string>
//   nameSignal?: Signal<string> | null;
// }

// export async function handleLogin({
//   type,
//   emailSignal,
//   passwordSignal,
//   nameSignal,
// }: HandleLoginProps): Promise<void> {
//   const { email, password } = {
//     email: emailSignal.value,
//     password: passwordSignal.value,
//   };

//   // Comprobar si el usuario ya existe
//   const { data: existingUser, error: userError } = await supabase
//     .from('profiles')
//     .select('email')
//     .eq('email', email)
//     .single();

//     // Error Management antes de llamar a la db
//   if (type === 'LOGIN' && !existingUser) {
//     Toastify({

//       text: "Este usuario no existe. Crea una cuenta, por favor.",
//       duration: 3000,

//     }).showToast();
//     return;
//   } else if (type === 'REGISTER' && existingUser) {
//     Toastify({

//       text: 'El usuario ya existe. Por favor, inicia sesión.',
//       duration: 3000,

//     }).showToast();

//     return;
//   }

//   const {
//     error,
//   } =
//     type === 'LOGIN'
//       ? await supabase.auth.signInWithPassword({ email, password })
//       : await supabase.auth.signUp(
//         {
//           email, password, options: {
//             data: {
//               name: nameSignal?.value,
//             },
//           }
//         }
//       );


//   if (type === 'REGISTER') {
//     emailSignal.value = '';
//     passwordSignal.value = '';
//     nameSignal!.value = '';
//     Toastify({

//       text: "¡El registro ha sido todo un éxito! Mira tu correo.",
//       duration: 3000,
//       style: {
//         background: "linear-gradient(to right, #00b09b, #96c93d)",
//       }

//     }).showToast();
//   }


//   // Error Management después de llamar a la db
//   if (userError || error) {

//     Toastify({

//       text: 'Ha ocurrido un error. Inténtalo de nuevo.',
//       duration: 3000,

//     }).showToast();
//     return;

//   }
// }