import { component$, useSignal, useStore } from '@builder.io/qwik'
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
import {
  IS_ADD_APPOINTMENT_MODAL_OPENED,
  IS_EDIT_APPOINTMENT_MODAL_OPENED,
} from '~/config'
import { RemoveAppointmentModal } from '~/components/appointment-modal/remove-appointment-modal'

export const useUsersAndAppointments = routeLoader$(
  async (requestEvent: RequestEventBase) => {
    // Get the view from the URL
    const viewFromURL = new URLSearchParams(requestEvent.query)
    let initialView = viewFromURL.get('view')?.toUpperCase() as ViewKeys
    if (!initialView) initialView = VIEWS.CALENDAR

    // Get the last day visited
    const lastDayVisited = viewFromURL.get('day')
    // convert 2024-01-01 to a Date object
    const lastDayVisitedDate = lastDayVisited
      ? new Date(lastDayVisited)
      : new Date()

    // Get the users and appointments
    const users = await getUsers()
    const appointments = await getAppointments()

    // console.log(appointments)
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
      lastDayVisitedDate,
    }
  }
)

export default component$(() => {
  const items = useUsersAndAppointments()

  const {
    users,
    appointments,
    initialView,
    isAuthorized,
    userName,
    lastDayVisitedDate,
  } = items.value

  const selectedView = useSignal<ViewKeys>(initialView)
  const isAddAppointmentModalOpen = useSignal(IS_ADD_APPOINTMENT_MODAL_OPENED)
  const isEditAppointmentModalOpen = useSignal(IS_EDIT_APPOINTMENT_MODAL_OPENED)
  const isRemoveAppointmentModalOpen = useSignal(false)

  const editModalData: IAppointment = useStore({
    id: -1,
    title: '',
    date: '',
    time_start: '',
    time_end: '',
    full_day: 0,
    category: '',
  })

  if (!isAuthorized) return <LoginForm />

  return (
    <>
      <main class="pb-4">
        <svg
          viewBox="0 0 1392 204"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="my-8 sm:w-[300px] sm:h-[100px] h-[70px] w-[200px]"
        >
          <g clip-path="url(#clip0_5_2650)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M123.454 128.154C123.454 87.8621 156.117 55.199 196.409 55.199C236.701 55.199 269.364 87.8622 269.364 128.154C269.364 168.446 236.701 201.109 196.409 201.109C156.117 201.109 123.454 168.446 123.454 128.154ZM215.567 117.591C215.567 111.758 220.296 107.029 226.129 107.029C231.963 107.029 236.692 111.758 236.692 117.591C236.692 123.425 231.963 128.154 226.129 128.154C220.296 128.154 215.567 123.425 215.567 117.591ZM195.017 107.029C189.183 107.029 184.454 111.758 184.454 117.591C184.454 123.425 189.183 128.154 195.017 128.154C200.85 128.154 205.579 123.425 205.579 117.591C205.579 111.758 200.85 107.029 195.017 107.029Z"
              fill="#2B7277"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M465.074 203.75C427.978 203.75 400.572 173.852 400.572 133.711C400.572 93.5698 427.978 63.6717 465.074 63.6717C480.023 63.6717 493.034 68.9316 502.17 77.5134V66.4401H543.695V200.981H502.17V189.908C493.034 198.49 480.023 203.75 465.074 203.75ZM473.656 165.547C491.65 165.547 503.831 152.535 503.831 133.711C503.831 114.886 491.65 101.875 473.933 101.875C456.216 101.875 443.481 115.163 443.481 133.711C443.481 152.258 456.215 165.547 473.656 165.547Z"
              fill="#2B7277"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M639.957 63.6717C626.392 63.6717 613.935 67.8242 604.799 75.0219V0H562.444V200.981H604.246V191.292C613.381 199.043 626.116 203.75 639.957 203.75C678.16 203.75 705.567 173.852 705.567 133.711C705.567 93.5698 678.16 63.6717 639.957 63.6717ZM662.658 133.711C662.658 152.258 650.2 165.547 632.483 165.547C614.489 165.547 602.308 152.535 602.308 133.711C602.308 114.886 614.489 101.875 632.483 101.875C650.2 101.875 662.658 115.163 662.658 133.711Z"
              fill="#2B7277"
            />
            <path
              d="M286.659 200.981V0H329.015V200.981H286.659Z"
              fill="#2B7277"
            />
            <path d="M347.768 0V200.981H390.124V0H347.768Z" fill="#2B7277" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M999.539 133.818C999.539 172.575 1027.5 202.75 1063.49 202.75C1080.37 202.75 1094.77 196.382 1104.18 185.586V199.981H1134.63V0.661011H1104.18V81.7733C1094.77 70.9768 1080.37 64.3328 1063.49 64.3328C1027.5 64.3328 999.539 94.7844 999.539 133.818ZM1106.12 133.541C1106.12 157.349 1090.89 173.959 1068.47 173.959C1046.32 173.959 1030.82 157.349 1030.82 133.541C1030.82 109.733 1046.32 93.1235 1068.47 93.1235C1090.89 93.1235 1106.12 109.733 1106.12 133.541Z"
              fill="#0B3460"
            />
            <path
              d="M75.5121 178.258C88.215 178.258 99.7955 173.546 108.634 165.75C112.132 173.654 116.698 180.98 122.15 187.544C109.314 197.634 93.1085 203.665 75.5121 203.665C71.4834 203.665 67.5198 203.348 63.647 202.736C27.5767 197.036 0 165.826 0 128.153C3.6459e-06 86.4484 33.8079 52.6404 75.5121 52.6404C92.9981 52.6404 109.128 58.5995 121.931 68.5895L122.15 68.7607C116.698 75.3247 112.132 82.6507 108.634 90.5551C107.877 89.8871 107.099 89.2418 106.302 88.62C97.8052 81.9901 87.137 78.0469 75.5121 78.0469C47.8395 78.0469 25.4064 100.48 25.4064 128.153C25.4064 153.131 43.6964 173.861 67.613 177.641C70.1787 178.047 72.8163 178.258 75.5121 178.258Z"
              fill="#0B3460"
            />
            <path
              d="M63.0584 107.027C57.2248 107.027 52.4958 111.756 52.4958 117.59C52.4958 123.424 57.2248 128.153 63.0584 128.153C68.892 128.153 73.621 123.424 73.621 117.59C73.621 111.756 68.892 107.027 63.0584 107.027Z"
              fill="#0B3460"
            />
            <path
              d="M83.6083 117.59C83.6083 111.756 88.3373 107.027 94.1709 107.027C100.004 107.027 104.733 111.756 104.733 117.59C104.733 123.424 100.004 128.153 94.1709 128.153C88.3373 128.153 83.6083 123.424 83.6083 117.59Z"
              fill="#0B3460"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M721.055 133.541C721.055 173.128 751.507 202.75 791.371 202.75C812.133 202.75 831.235 194.998 844.246 179.772L824.868 160.117C816.84 169.53 804.659 174.236 791.094 174.236C771.162 174.236 756.767 163.162 752.337 144.891H851.444C852.551 139.355 853.105 134.925 853.105 130.496C853.105 92.2929 826.529 64.3328 789.71 64.3328C751.23 64.3328 721.055 94.5076 721.055 133.541ZM752.337 119.976C756.767 102.813 770.331 92.293 789.156 92.293C807.704 92.293 819.331 102.259 823.207 119.976H752.337Z"
              fill="#0B3460"
            />
            <path
              d="M927.346 92.8466C909.629 92.8466 896.894 105.581 896.894 123.298V199.981H866.443V67.1011H896.894V82.3269C906.03 70.9768 920.148 64.3328 936.481 64.3328C966.379 64.3328 987.972 90.632 987.972 116.654V199.981H957.521V123.298C957.521 105.581 945.063 92.8466 927.346 92.8466Z"
              fill="#0B3460"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1219.09 202.75C1179.23 202.75 1148.77 173.128 1148.77 133.541C1148.77 94.5076 1178.95 64.3328 1217.43 64.3328C1254.25 64.3328 1280.82 92.2929 1280.82 130.496C1280.82 134.925 1280.27 139.355 1279.16 144.891H1180.06C1184.49 163.162 1198.88 174.236 1218.81 174.236C1232.38 174.236 1244.56 169.53 1252.59 160.117L1271.96 179.772C1258.95 194.998 1239.85 202.75 1219.09 202.75ZM1216.88 92.293C1198.05 92.293 1184.49 102.813 1180.06 119.976H1250.93C1247.05 102.259 1235.42 92.293 1216.88 92.293Z"
              fill="#0B3460"
            />
            <path
              d="M1359.22 64.3328C1343.71 64.3328 1332.09 70.4231 1324.61 80.9428V67.1011H1294.16V199.981H1324.61V126.067C1324.61 103.366 1336.79 92.8466 1353.96 92.8466C1361.71 92.8466 1367.25 95.0613 1372.23 100.044L1392.16 79.5586C1383.02 69.0389 1372.51 64.3328 1359.22 64.3328Z"
              fill="#0B3460"
            />
          </g>
          <defs>
            <clipPath id="clip0_5_2650">
              <rect width="1392" height="204" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <Debug users={users} appointments={appointments} />
        <div class="flex flex-row justify-between items-center">
          <div class="flex md:items-center gap-2">
            <div class="text-primary text-3xl md:text-8xl">
              {getCurrentDay()}
            </div>
            <div class="flex md:px-4 flex-col md:leading-[35px] md:text-3xl">
              <span>{getDayName()}</span>
              <span>{getCurrentMonthAndYear()}</span>
            </div>
          </div>
          <div class="flex flex-col gap-2 md:flex-row md:items-center">
            <small class="text-primary flex items-center text-lg">
              {/* I commented out because it looks like you can click on it, */}
              {/* At the beginning we wanted to do some settings here  */}
              {/* <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mr-4"
              >
                <mask
                  id="mask0_1_942"
                  style="mask-type:alpha"
                  maskUnits="userSpaceOnUse"
                  x="2"
                  y="2"
                  width="29"
                  height="28"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.5525 11.9525C11.5525 9.21732 13.7698 7 16.505 7C19.2402 7 21.4576 9.21732 21.4576 11.9525C21.4576 14.6877 19.2402 16.9051 16.505 16.9051C13.7698 16.9051 11.5525 14.6877 11.5525 11.9525ZM16.505 9C14.8744 9 13.5525 10.3219 13.5525 11.9525C13.5525 13.5832 14.8744 14.9051 16.505 14.9051C18.1357 14.9051 19.4576 13.5832 19.4576 11.9525C19.4576 10.3219 18.1357 9 16.505 9Z"
                    fill="#2B7277"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.505 30C24.237 30 30.505 23.732 30.505 16C30.505 8.26801 24.237 2 16.505 2C8.77302 2 2.505 8.26801 2.505 16C2.505 23.732 8.77302 30 16.505 30ZM24.0926 25.2972C26.7857 23.0966 28.505 19.7491 28.505 16C28.505 9.37258 23.1324 4 16.505 4C9.87759 4 4.505 9.37258 4.505 16C4.505 19.7491 6.22431 23.0967 8.91748 25.2972V24.6576C8.91748 21.4543 11.5142 18.8576 14.7175 18.8576H18.2926C21.4958 18.8576 24.0926 21.4543 24.0926 24.6576V25.2972ZM22.1069 26.6149C22.0975 26.5597 22.0926 26.503 22.0926 26.4451V24.6576C22.0926 22.5589 20.3913 20.8576 18.2926 20.8576H14.7175C12.6188 20.8576 10.9175 22.5589 10.9175 24.6576V26.4451C10.9175 26.503 10.9126 26.5597 10.9031 26.6149C12.5753 27.4993 14.4817 28 16.505 28C18.5283 28 20.4347 27.4992 22.1069 26.6149Z"
                    fill="#2B7277"
                  />
                </mask>
                <g mask="url(#mask0_1_942)">
                  <rect
                    x="0.505005"
                    y="0.129181"
                    width="32"
                    height="32"
                    fill="#2B7277"
                  />
                </g>
              </svg> */}
              <span class="sm:hidden">Hi,</span>
              <span class="hidden sm:block">Howdy,</span>
              <span class="font-bold ml-2">{userName}</span>!
            </small>
          </div>
        </div>

        {/* Filter Buttons + Add Button  */}
        <div class="flex justify-between items-center bg-grayBrandLight py-6 px-4 rounded-md my-6">
          <ViewsButtons selectedView={selectedView} />

          <button
            onClick$={() => {
              isAddAppointmentModalOpen.value = true
              document.body.style.overflow = 'hidden'
            }}
            class="transition-transform hover:scale-105 focus:scale-105"
          >
            <IconManager icon="add" classCustom="w-12 h-auto" />
          </button>
        </div>

        {selectedView.value === VIEWS.CALENDAR ? (
          <CalendarView
            appointments={appointments}
            users={users}
            isAddAppointmentModalOpen={isAddAppointmentModalOpen}
            isEditAppointmentModalOpen={isEditAppointmentModalOpen}
            editModalData={editModalData}
            userName={userName}
            lastDayVisitedDate={lastDayVisitedDate}
          />
        ) : (
          ''
        )}

        {selectedView.value === VIEWS.LIST ? (
          <ListView
            appointments={appointments}
            users={users}
            isEditAppointmentModalOpen={isEditAppointmentModalOpen}
            editModalData={editModalData}
            userName={userName}
          />
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
            isRemoveAppointmentModalOpen={isRemoveAppointmentModalOpen}
            isEditAppointmentModalOpen={isEditAppointmentModalOpen}
            editModalData={editModalData}
          />
        ) : (
          ''
        )}

        {isRemoveAppointmentModalOpen.value ? (
          <RemoveAppointmentModal
            isEditAppointmentModalOpen={isEditAppointmentModalOpen}
            isRemoveAppointmentModalOpen={isRemoveAppointmentModalOpen}
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
