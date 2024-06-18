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

    const startTimeRef = useSignal<HTMLInputElement>()
    const endTimeRef = useSignal<HTMLInputElement>()

    const hasDateInputError = useSignal<boolean>(false)
    const areInputsDisabled = useSignal<boolean>()

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      const startTimeFromHoursToSeconds =
        Number(startTimeRef.value?.value.split(':')[0]) * 60 +
        Number(startTimeRef.value?.value.split(':')[1])
      const endTimeFromHoursToSeconds =
        Number(endTimeRef.value?.value?.split(':')[0]) * 60 +
        Number(endTimeRef.value?.value?.split(':')[1])

      if (endTimeFromHoursToSeconds < startTimeFromHoursToSeconds + 15) {
        if (fullDayRef.value?.checked === false) {
          hasDateInputError.value = true
        }
      } else {
        hasDateInputError.value = false
      }

      track(() =>
        startTimeRef.value?.addEventListener('input', () => {
          const startTimeValueInSeconds =
            Number(startTimeRef.value?.value.split(':')[0]) * 60 +
            Number(startTimeRef.value?.value.split(':')[1])
          const endTimeValueInSeconds =
            Number(endTimeRef.value?.value?.split(':')[0]) * 60 +
            Number(endTimeRef.value?.value?.split(':')[1])

          if (endTimeValueInSeconds < startTimeValueInSeconds + 15) {
            if (fullDayRef.value?.checked === false) {
              hasDateInputError.value = true
            } else {
              hasDateInputError.value = false
            }
          } else {
            hasDateInputError.value = false
          }
        })
      )

      track(() =>
        endTimeRef.value?.addEventListener('input', () => {
          const startTimeValueInSeconds =
            Number(startTimeRef.value?.value.split(':')[0]) * 60 +
            Number(startTimeRef.value?.value.split(':')[1])
          const endTimeValueInSeconds =
            Number(endTimeRef.value?.value?.split(':')[0]) * 60 +
            Number(endTimeRef.value?.value?.split(':')[1])

          if (endTimeValueInSeconds < startTimeValueInSeconds + 15) {
            if (fullDayRef.value?.checked === false) {
              hasDateInputError.value = true
            } else {
              hasDateInputError.value = false
            }
          } else {
            hasDateInputError.value = false
          }
        })
      )
      track(() =>
        fullDayRef.value?.addEventListener('change', () => {
          const startTimeValueInSeconds =
            Number(startTimeRef.value?.value.split(':')[0]) * 60 +
            Number(startTimeRef.value?.value.split(':')[1])
          const endTimeValueInSeconds =
            Number(endTimeRef.value?.value?.split(':')[0]) * 60 +
            Number(endTimeRef.value?.value?.split(':')[1])

          if (endTimeValueInSeconds < startTimeValueInSeconds + 15) {
            if (fullDayRef.value?.checked === false) {
              hasDateInputError.value = true
            } else {
              hasDateInputError.value = false
            }
          } else {
            hasDateInputError.value = false
          }
        })
      )
    })

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
              class="w-full border border-grayBrandMedium rounded-md px-4 py-2 bg-white"
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
            <div class="relative">
              <input
                required
                name="date"
                id="date"
                type="date"
                class="w-full border border-grayBrandMedium rounded-md px-4 py-2 bg-white"
                value={editModalData.date}
              />
              <div class="pl-4 bg-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <IconManager
                  icon="calendar"
                  classCustom="bg-white h-6 w-6 text-primary pointer-events-none"
                />
              </div>
            </div>
          </div>

          {hasDateInputError.value && (
            <div class="mt-6 text-red-500">
              Error: End time must be at least 15 minutes later than start time
            </div>
          )}

          {/* time_start and time_end  */}
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-col gap-2 mt-2 md:mt-8 flex-1">
              <label
                for="time_start"
                class=" text-text text-md md:text-lg font-semibold"
              >
                Starts at
              </label>
              <div class="relative">
                <input
                  ref={startTimeRef}
                  value={editModalData.time_start}
                  name="time_start"
                  id="time_start"
                  type="text"
                  class={`w-full border border-grayBrandMedium rounded-md px-4 py-2 ${areInputsDisabled.value ? 'opacity-85 pointer-events-none text-grayBrand' : ''} `}
                />
                <IconManager
                  icon="time-start"
                  classCustom={`absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-primary pointer-events-none ${areInputsDisabled.value ? 'opacity-85 pointer-events-none !text-grayBrand' : ''} `}
                />
              </div>
            </div>
            <div class="flex flex-col gap-2 mt-2 md:mt-8 flex-1">
              <label
                for="time_end"
                class=" text-text text-md md:text-lg font-semibold"
              >
                Ends at
              </label>
              <div class="relative">
                <input
                  ref={endTimeRef}
                  value={editModalData.time_end}
                  name="time_end"
                  id="time_end"
                  type="text"
                  class={`w-full border border-grayBrandMedium rounded-md px-4 py-2 ${areInputsDisabled.value ? 'opacity-85 pointer-events-none text-grayBrand' : ''} `}
                />
                <IconManager
                  icon="time-end"
                  classCustom={`absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-primary pointer-events-none ${areInputsDisabled.value ? 'opacity-85 pointer-events-none !text-grayBrand' : ''} `}
                />
              </div>
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
            <div class="relative">
              <select
                required
                name="category"
                id="category"
                value={editModalData.category}
                class="w-full border border-grayBrandMedium rounded-md px-4 py-2 bg-white"
              >
                {APP_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <IconManager
                icon="dropdown"
                classCustom="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 pointer-events-none"
              />
            </div>
          </div>

          {/* Visibility  */}
          <div class="flex flex-col gap-2 mt-2 md:mt-8">
            <label
              for="visibility"
              class=" text-text text-md md:text-lg font-semibold"
            >
              Visible for
            </label>
            <div class="relative">
              <select
                required
                name="visibility"
                id="visibility"
                value={editModalData.visibility}
                class="w-full border border-grayBrandMedium rounded-md px-4 py-2 cursor-pointer bg-white"
              >
                <option value="public">All</option>
                <option value="private">Only me</option>
              </select>
              <IconManager
                icon="dropdown"
                classCustom="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 pointer-events-none"
              />
            </div>
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
                class={`btn bg-primaryLight text-black mt-2 md:mt-8 ${
                  hasDateInputError.value
                    ? 'opacity-80 pointer-events-none'
                    : ''
                }`}
                type="submit"
                disabled={hasDateInputError.value}
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
