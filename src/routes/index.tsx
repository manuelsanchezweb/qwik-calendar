import { $, component$, useSignal, useStore } from '@builder.io/qwik'
import {
  type RequestEventBase,
  routeLoader$,
  type DocumentHead,
} from '@builder.io/qwik-city'
import { IconManager } from '~/icons/icon-manager'
import { ListView } from '~/components/views/list-view'
import { CalendarView } from '~/components/views/calendar-view'
import { Debug } from '~/components/debug'
import {
  getCurrentDay,
  getCurrentMonthAndYear,
  getDayName,
} from '~/utils/functions'
import { VIEWS, type ViewKeys } from '~/constants/constants'
import { type IAppointment, type IUser } from '~/types/types'

import { PastAppointmentsView } from '~/components/views/past-appointment-view'
import { ViewsButtons } from '~/components/views-buttons/views-buttons'
import { getAppointments, getUsers } from '~/db/queries'
import { LoginForm } from '~/components/login-form/login-form'
import { Footer } from '~/components/footer/footer'
import { AddAppointmentModal } from '~/components/appointment-modal/add-appointment-modal'
import { EditAppointmentModal } from '~/components/appointment-modal/edit-appointment-modal'
import { IS_ADD_APPOINTMENT_MODAL_OPENED, IS_EDIT_APPOINTMENT_MODAL_OPENED } from '~/config'

export const useUsersAndAppointments = routeLoader$(
  async (requestEvent: RequestEventBase) => {
    // Get the view from the URL
    const viewFromURL = new URLSearchParams(requestEvent.query)
    let initialView = viewFromURL.get('view')?.toUpperCase() as ViewKeys
    if (!initialView) initialView = VIEWS.CALENDAR

    // Get the users and appointments
    const users = await getUsers()
    const appointments = await getAppointments()

    // Check if user is authorized and who is the user
    const isAuthorized =
      requestEvent.cookie.get('collabender-rules')?.value === '1'
    const userName =
      requestEvent.cookie.get('collabender-user')?.value ?? 'Undefined'

    return {
      users: users as IUser[],
      appointments: appointments as IAppointment[],
      initialView,
      isAuthorized,
      userName,
    }
  }
)

export default component$(() => {
  const items = useUsersAndAppointments()
  const { users, appointments, initialView, isAuthorized, userName } =
    items.value

  const selectedView = useSignal<ViewKeys>(initialView)
  const isAddAppointmentModalOpen = useSignal(IS_ADD_APPOINTMENT_MODAL_OPENED)

  const isEditAppointmentModalOpen = useSignal(IS_EDIT_APPOINTMENT_MODAL_OPENED)

  const editModalData = useStore({
    id: '',
    title: '',
    date: '',
    start: '',
    end: '',
    fullDay: false,
    category: ''
  })

  const openAddAppointmentModal = $(() => {
    isAddAppointmentModalOpen.value = true
    document.body.style.overflow = 'hidden'
  })

  if (!isAuthorized) return <LoginForm />

  return (
    <>
      <main class="py-12">
        <Debug users={users} appointments={appointments} />
        <div class="flex justify-between items-center">
          <div class="flex md:items-center gap-2">
            <div class="text-primary text-5xl md:text-8xl">
              {getCurrentDay()}
            </div>
            <div class="flex flex-col md:text-3xl">
              <span>{getDayName()}</span>
              <span>{getCurrentMonthAndYear()}</span>
            </div>
          </div>
          <div class="flex flex-col gap-2 md:flex-row md:items-center">
            <small class="text-primary text-lg">
              Howdy, <span class="font-bold">{userName}</span>! 👋
            </small>
          </div>
        </div>

        {/* Filter Buttons + Add Button  */}
        <div class="flex justify-between items-center bg-grayBrandLight py-6 px-4 rounded-md my-6">
          <ViewsButtons selectedView={selectedView} />

          <button
            onClick$={openAddAppointmentModal}
            class="transition-transform hover:scale-105 focus:scale-105"
          >
            <IconManager icon="add" classCustom="w-12 h-auto" />
          </button>
        </div>

        {selectedView.value === VIEWS.CALENDAR ? (
          <CalendarView appointments={appointments} users={users} isAddAppointmentModalOpen={isAddAppointmentModalOpen} isEditAppointmentModalOpen={isEditAppointmentModalOpen} editModalData={editModalData}/>
        ) : (
          ''
        )}

        {selectedView.value === VIEWS.LIST ? (
          <ListView appointments={appointments} users={users} isEditAppointmentModalOpen={isEditAppointmentModalOpen} editModalData={editModalData}/>
        ) : (
          ''
        )}

        {selectedView.value === VIEWS.PAST_APPOINTMENTS ? (
          <PastAppointmentsView appointments={appointments} users={users} />
        ) : (
          ''
        )}

        {isAddAppointmentModalOpen.value ? (
          <AddAppointmentModal
            isAddAppointmentModalOpen={isAddAppointmentModalOpen}
   
          />
        ) : (
          ''
        )}

        {isEditAppointmentModalOpen.value ? (
          <EditAppointmentModal
            isEditAppointmentModalOpen={isEditAppointmentModalOpen}
            editModalData={editModalData}
          />
        ) : (
          ''
        )}
      </main>
      <Footer />
    </>
  )
})

export const head: DocumentHead = {
  title: 'Calendar App con Qwik',
  meta: [
    {
      name: 'description',
      content: 'Crea una app de calendario compartida con Qwik!',
    },
  ],
}
