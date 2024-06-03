import { $, type Signal, component$, useOn } from '@builder.io/qwik'
import { Form } from '@builder.io/qwik-city'
import { APP_CATEGORIES } from '~/config'
import { useAddAppointment } from '~/global'

export const AddAppointmentModal = component$(
  ({
    isAddAppointmentModalOpen,
  }: {
    isAddAppointmentModalOpen: Signal<boolean>
  }) => {
    const action = useAddAppointment()
    // Default date for the date input comes form ?day on the url or today
    const url = new URL(window.location.href)
    const day = url.searchParams.get('day')

    const defaultOptionForDate = day
      ? day
      : new Date().toISOString().split('T')[0]

    useOn(
      'click',
      $((event) => {
        if (
          event.target instanceof HTMLElement &&
          !event.target.closest('.form')
        ) {
          isAddAppointmentModalOpen.value = false
          document.body.style.overflow = 'auto'
        }
      })
    )

    useOn(
      'submit',
      $(() => {
        isAddAppointmentModalOpen.value = false
        document.body.style.overflow = 'auto'
      })
    )

    return (
      <div>
        <div class="z-10 fixed bg-white inset-0 opacity-70"></div>
        <Form
          spaReset
          action={action}
          style="box-shadow: 10px 10px 120px -12px #E5EDD8;"
          class="form z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-grayBrandLight px-6 md:px-12 py-8 md:py-14 rounded-md w-full max-w-[92%] md:max-w-[600px] overflow-auto"
        >
          <h2 class="text-2xl md:text-4xl font-bold text-primary">
            Create New Appointment
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
              defaultValue={defaultOptionForDate}
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
                value="08:00"
                name="time_start"
                id="time_start"
                type="text"
                class="w-full border border-grayBrandMedium rounded-md px-4 py-2"
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
                value="09:00"
                name="time_end"
                id="time_end"
                type="text"
                class="w-full border border-grayBrandMedium rounded-md px-4 py-2"
              />
            </div>
          </div>

          {/* full_day  */}
          <div class="flex items-center justify-end gap-2 mt-4 md:justify-start md:mt-8">
            <label for="full_day" class=" text-text text-sm font-semibold">
              Is it a full day event?
            </label>
            <input
              name="full_day"
              id="full_day"
              type="checkbox"
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
              class="w-full border border-grayBrandMedium rounded-md px-4 py-2"
            >
              {APP_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <footer class="mt-5">
            <div class="flex justify-end gap-4 items-center">
              <button
                class="btn bg-grayBrandLight text-black mt-2 md:mt-8"
                onClick$={() => {
                  isAddAppointmentModalOpen.value = false
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
