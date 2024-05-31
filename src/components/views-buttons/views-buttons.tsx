import { $, type Signal, component$ } from '@builder.io/qwik'
import { VIEWS } from '~/constants/constants'
import { IconManager } from '~/icons/icon-manager'

export const ViewsButtons = component$(
  ({ selectedView }: { selectedView: Signal<string> }) => {
    const handleViewChange = $((view: string) => {
      // change the selected view
      selectedView.value = view

      // add the selected view to the URL
      const small_caps_view = view.toLowerCase()
      window.history.pushState(null, '', `?view=${small_caps_view}`)
    })

    return (
      <div class="flex gap-2 items-center">
        <button
          onClick$={() => handleViewChange(VIEWS.CALENDAR)}
          class="transition-transform hover:scale-105 focus:scale-105"
        >
          <IconManager
            icon={
              selectedView.value === VIEWS.CALENDAR
                ? 'calendar-fill'
                : 'calendar'
            }
            classCustom="w-12 h-auto mb-1"
          />
        </button>
        <button
          onClick$={() => handleViewChange(VIEWS.LIST)}
          class="transition-transform hover:scale-105 focus:scale-105"
        >
          <IconManager
            icon={selectedView.value === VIEWS.LIST ? 'list-fill' : 'list'}
            classCustom="w-12 h-auto mb-1"
          />
        </button>
        <button
          onClick$={() => handleViewChange(VIEWS.PAST_APPOINTMENTS)}
          class="transition-transform hover:scale-105 focus:scale-105"
        >
          <IconManager
            icon={
              selectedView.value === VIEWS.PAST_APPOINTMENTS
                ? 'history-fill'
                : 'history'
            }
            classCustom="w-12 h-auto mb-1"
          />
        </button>
      </div>
    )
  }
)
