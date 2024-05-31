import { component$, Slot } from '@builder.io/qwik'

// This would be another way of handling this
// export const onRequest: RequestHandler = async ({ next, url, cookie }) => {
//   // console.log('Before request', url)
//   // console.log({ cookie })
//   // await next()
//   // console.log('After request', url)
// }

export default component$(() => {
  return (
    <main class="w-full max-w-[1200px] px-5">
      <Slot />
    </main>
  )
})
