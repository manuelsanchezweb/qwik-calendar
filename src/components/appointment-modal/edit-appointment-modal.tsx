import {
  $,
  type Signal,
  component$,
  useOn,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik'
import { Form } from '@builder.io/qwik-city'
import { APP_CATEGORIES } from '~/config'
import { useEditAppointment } from '~/global'
import { IconManager } from '~/icons/icon-manager'
import { type IAppointment } from '~/types/types'

export const EditAppointmentModal = component$(
  ({
    isRemoveAppointmentModalOpen,
    isEditAppointmentModalOpen,
    editModalData,
  }: {
    isRemoveAppointmentModalOpen: Signal<boolean>
    isEditAppointmentModalOpen: Signal<boolean>
    editModalData: IAppointment
  }) => {
    const action = useEditAppointment()
    const fullDayRef = useSignal<HTMLInputElement>()
    const areInputsDisabled = useSignal<boolean>()

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      areInputsDisabled.value = fullDayRef.value?.checked === true

      track(() =>
        fullDayRef.value?.addEventListener('change', () => {
          areInputsDisabled.value = fullDayRef.value?.checked === true
        })
      )
    })

    useOn(
      'click',
      $((event) => {
        if (
          event.target instanceof HTMLElement &&
          !event.target.closest('.form')
        ) {
          isEditAppointmentModalOpen.value = false
          document.body.style.overflow = 'auto'
        }
      })
    )

    useOn(
      'submit',
      $(() => {
        isEditAppointmentModalOpen.value = false
        document.body.style.overflow = 'auto'
        // TODO: had to make it reload the page to get the last changes
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
            {'Edit This Appointment'}
          </h2>

          {/* Event Name  */}
          <div class="flex flex-col gap-2 mt-2 md:mt-8">
            <label
              for="title"
              class=" text-text text-md md:text-lg font-semibold"
            >
              Event Name
            </label>
            <input
              placeholder="Meeting with John Doe"
              value={editModalData.title}
              required
              name="title"
              id="title"
              type="text"
              class="w-full border border-grayBrandMedium rounded-md px-4 py-2"
            />
          </div>

          {/* Date  */}
          <div class="flex flex-col gap-2 mt-2 md:mt-8">
            <label
              for="date"
              class=" text-text text-md md:text-lg font-semibold"
            >
              Date
            </label>
            <input
              required
              name="date"
              id="date"
              type="date"
              class="w-full border border-grayBrandMedium rounded-md px-4 py-2"
              value={editModalData.date}
            />
          </div>

          {/* time_start and time_end  */}
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-col gap-2 mt-2 md:mt-8 flex-1">
              <label
                for="time_start"
                class=" text-text text-md md:text-lg font-semibold"
              >
                Starts at
              </label>
              <input
                value={editModalData.time_start}
                name="time_start"
                id="time_start"
                type="text"
                class={`"w-full border border-grayBrandMedium rounded-md px-4 py-2 ${areInputsDisabled.value ? 'opacity-85 cursor-not-allowed text-grayBrand' : ''} `}
              />
            </div>
            <div class="flex flex-col gap-2 mt-2 md:mt-8 flex-1">
              <label
                for="time_end"
                class=" text-text text-md md:text-lg font-semibold"
              >
                Ends at
              </label>
              <input
                value={editModalData.time_end}
                name="time_end"
                id="time_end"
                type="text"
                class={`"w-full border border-grayBrandMedium rounded-md px-4 py-2 ${areInputsDisabled.value ? 'opacity-85 cursor-not-allowed text-grayBrand' : ''} `}
              />
            </div>
          </div>

          {/* full_day  */}
          <div class="flex items-center justify-end gap-2 mt-4 md:justify-start md:mt-8">
            <label for="full_day" class=" text-text text-sm font-semibold">
              Is it a full day event?
            </label>
            <input
              ref={fullDayRef}
              name="full_day"
              id="full_day"
              type="checkbox"
              checked={editModalData.full_day === 1}
              class="w-3 h-3 accent-primary"
            />
          </div>

          {/* Category  */}
          <div class="flex flex-col gap-2 mt-2 md:mt-8">
            <label
              for="category"
              class=" text-text text-md md:text-lg font-semibold"
            >
              Category
            </label>
            <select
              required
              name="category"
              id="category"
              value={editModalData.category}
              class="w-full border border-grayBrandMedium rounded-md px-4 py-2"
            >
              {APP_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <input
            hidden
            type="number"
            id="id"
            name="id"
            value={editModalData.id}
          />

          <footer class="mt-5">
            <div class="flex flex-wrap justify-between gap-4 items-center">
              <button
                type="button"
                onClick$={() => {
                  isEditAppointmentModalOpen.value = false
                  isRemoveAppointmentModalOpen.value = true
                }}
                class="btn flex justify-center items-center gap-2 bg-grayBrandLight text-black mt-2 md:mt-8 group"
              >
                <IconManager
                  icon="remove"
                  classCustom="w-6 h-auto text-primary group-hover:text-white group-focus:text-white"
                />
                <span>Delete Event</span>
              </button>
              <button
                type="button"
                class="btn bg-grayBrandLight text-black mt-2 md:mt-8"
                onClick$={() => {
                  isEditAppointmentModalOpen.value = false
                  document.body.style.overflow = 'auto'
                }}
              >
                Cancel
              </button>
              <button
                class="btn bg-primaryLight text-black mt-2 md:mt-8"
                type="submit"
              >
                Save Event
              </button>
            </div>
          </footer>
        </Form>
      </div>
    )
  }
)
