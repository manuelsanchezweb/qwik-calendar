import { $, type Signal, component$, useOn } from '@builder.io/qwik'
import { Form } from '@builder.io/qwik-city'
import { useRemoveAppointment } from '~/global'
import { type IAppointment } from '~/types/types'

export const RemoveAppointmentModal = component$(
  ({
    isRemoveAppointmentModalOpen,
    isEditAppointmentModalOpen,
    editModalData,
  }: {
    isRemoveAppointmentModalOpen: Signal<boolean>
    isEditAppointmentModalOpen: Signal<boolean>
    editModalData: IAppointment
  }) => {
    const action = useRemoveAppointment()

    useOn(
      'submit',
      $(() => {
        isEditAppointmentModalOpen.value = false
        isRemoveAppointmentModalOpen.value = false
        document.body.style.overflow = 'auto'

        window.location.reload()
      })
    )

    return (
      <div>
        <div class="z-10 fixed bg-white inset-0 opacity-70"></div>
        <Form
          spaReset
          action={action}
          style="box-shadow: 10px 10px 120px -12px #E5EDD8;"
          class="form z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-grayBrandLight px-6 md:px-12 py-8 md:py-14 rounded-md w-full max-w-[92%] md:max-w-[600px] overflow-auto"
        >
          <h2 class="text-2xl md:text-4xl font-bold text-primary">
            Are you sure you want to remove this appointment?
          </h2>
          <p>{editModalData.title}</p>

          <input
            hidden
            type="number"
            id="id"
            name="id"
            value={editModalData.id}
          />

          <footer class="mt-5">
            <div class="flex justify-between gap-4 items-center">
              <button
                type="button"
                class="btn bg-grayBrandLight text-black mt-2 md:mt-8"
                onClick$={() => {
                  isEditAppointmentModalOpen.value = true
                  isRemoveAppointmentModalOpen.value = false
                }}
              >
                Cancel
              </button>
              <button
                class="btn bg-primaryLight text-black mt-2 md:mt-8"
                type="submit"
              >
                Delete
              </button>
            </div>
          </footer>
        </Form>
      </div>
    )
  }
)
