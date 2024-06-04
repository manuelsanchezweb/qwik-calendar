import { component$ } from '@builder.io/qwik'

export const IconGithub = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 16 16"
        height="1.5rem"
        width="1.5rem"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
    )
  }
)

export const IconUser = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_1_959"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="2"
          y="2"
          width="29"
          height="29"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.0859 12.28C11.0859 9.54484 13.3033 7.32751 16.0385 7.32751C18.7737 7.32751 20.991 9.54484 20.991 12.28C20.991 15.0153 18.7737 17.2326 16.0385 17.2326C13.3033 17.2326 11.0859 15.0153 11.0859 12.28ZM16.0385 9.32751C14.4078 9.32751 13.0859 10.6494 13.0859 12.28C13.0859 13.9107 14.4078 15.2326 16.0385 15.2326C17.6691 15.2326 18.991 13.9107 18.991 12.28C18.991 10.6494 17.6691 9.32751 16.0385 9.32751Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.0385 30.3275C23.7704 30.3275 30.0385 24.0595 30.0385 16.3275C30.0385 8.59553 23.7704 2.32751 16.0385 2.32751C8.30647 2.32751 2.03845 8.59553 2.03845 16.3275C2.03845 24.0595 8.30647 30.3275 16.0385 30.3275ZM23.626 25.6247C26.3192 23.4241 28.0385 20.0766 28.0385 16.3275C28.0385 9.7001 22.6659 4.32751 16.0385 4.32751C9.41104 4.32751 4.03845 9.7001 4.03845 16.3275C4.03845 20.0766 5.75776 23.4242 8.45093 25.6247V24.9851C8.45093 21.7819 11.0477 19.1851 14.2509 19.1851H17.826C21.0293 19.1851 23.626 21.7819 23.626 24.9851V25.6247ZM21.6404 26.9424C21.6309 26.8872 21.626 26.8305 21.626 26.7727V24.9851C21.626 22.8864 19.9247 21.1851 17.826 21.1851H14.2509C12.1522 21.1851 10.4509 22.8864 10.4509 24.9851V26.7727C10.4509 26.8305 10.446 26.8873 10.4366 26.9424C12.1088 27.8268 14.0151 28.3275 16.0385 28.3275C18.0618 28.3275 19.9681 27.8268 21.6404 26.9424Z"
            fill="currentColor"
          />
        </mask>
        <g mask="url(#mask0_1_959)">
          <rect
            x="0.0384521"
            y="0.456665"
            width="32"
            height="32"
            fill="currentColor"
          />
        </g>
      </svg>
    )
  }
)

export const IconCalender = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="calender"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="2"
          y="0"
          width="29"
          height="31"
        >
          <path
            d="M10.4793 15.1445C10.4793 14.5922 10.927 14.1445 11.4793 14.1445H12.5636C13.6681 14.1445 14.5636 15.0399 14.5636 16.1445V23.3064C14.5636 23.8587 14.1159 24.3064 13.5636 24.3064C13.0113 24.3064 12.5636 23.8587 12.5636 23.3064V16.1445H11.4793C10.927 16.1445 10.4793 15.6968 10.4793 15.1445Z"
            fill="#000"
          />
          <path
            d="M17.602 14.1445C17.0497 14.1445 16.602 14.5922 16.602 15.1445C16.602 15.6968 17.0497 16.1445 17.602 16.1445H20.7378L16.7448 22.7915C16.4604 23.2649 16.6136 23.8793 17.0871 24.1637C17.5605 24.4481 18.1748 24.2948 18.4592 23.8214L22.4522 17.1744C23.253 15.8414 22.2928 14.1445 20.7378 14.1445H17.602Z"
            fill="#000"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.505 0.525391C11.0573 0.525391 11.505 0.973106 11.505 1.52539V2.12917H21.505V1.52539C21.505 0.973106 21.9527 0.525391 22.505 0.525391C23.0573 0.525391 23.505 0.973106 23.505 1.52539V2.12917H25.505C28.2664 2.12917 30.505 4.36775 30.505 7.12917V25.1292C30.505 27.8906 28.2664 30.1292 25.505 30.1292H7.505C4.74358 30.1292 2.505 27.8906 2.505 25.1292V7.12917C2.505 4.36775 4.74358 2.12917 7.505 2.12917H9.505V1.52539C9.505 0.973106 9.95272 0.525391 10.505 0.525391ZM10.505 7.12917C11.0573 7.12917 11.505 6.68146 11.505 6.12917V4.12917H21.505V6.12917C21.505 6.68146 21.9527 7.12917 22.505 7.12917C23.0573 7.12917 23.505 6.68146 23.505 6.12917V4.12917H25.505C27.1619 4.12917 28.505 5.47232 28.505 7.12917V8.16665H4.505V7.12917C4.505 5.47232 5.84815 4.12917 7.505 4.12917H9.505V6.12917C9.505 6.68146 9.95272 7.12917 10.505 7.12917ZM25.505 28.1292C27.1619 28.1292 28.505 26.786 28.505 25.1292V10.1666H4.505V25.1292C4.505 26.786 5.84815 28.1292 7.505 28.1292H25.505Z"
            fill="#000"
          />
        </mask>
        <g mask="url(#calender)">
          <rect
            x="0.505005"
            y="0.129181"
            width="32"
            height="32"
            fill="#2B7277"
          />
        </g>
      </svg>
    )
  }
)

export const IconCalenderFill = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="6.21523"
          y="5.51733"
          width="33.2033"
          height="33.1039"
          fill="#E5EDD8"
        />
        <path
          d="M14.5551 20.7112C14.5551 19.9495 15.1727 19.3319 15.9344 19.3319H17.43C18.9536 19.3319 20.1887 20.567 20.1887 22.0906V31.9692C20.1887 32.731 19.5711 33.3486 18.8093 33.3486C18.0475 33.3486 17.43 32.731 17.43 31.9692V22.0906H15.9344C15.1727 22.0906 14.5551 21.473 14.5551 20.7112Z"
          fill="#2B7277"
        />
        <path
          d="M24.3797 19.3319C23.6179 19.3319 23.0004 19.9495 23.0004 20.7112C23.0004 21.473 23.6179 22.0906 24.3797 22.0906H28.7049L23.1973 31.259C22.805 31.912 23.0164 32.7593 23.6694 33.1516C24.3224 33.5439 25.1698 33.3325 25.5621 32.6795L31.0697 23.5111C32.1742 21.6724 30.8498 19.3319 28.7049 19.3319H24.3797Z"
          fill="#2B7277"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.5906 0.546631C15.3523 0.546631 15.9699 1.16418 15.9699 1.92596V2.75878H29.7632V1.92596C29.7632 1.16418 30.3807 0.546631 31.1425 0.546631C31.9043 0.546631 32.5219 1.16418 32.5219 1.92596V2.75878H35.2805C39.0894 2.75878 42.1772 5.84652 42.1772 9.65543V34.4834C42.1772 38.2923 39.0894 41.38 35.2805 41.38H10.4526C6.64364 41.38 3.5559 38.2923 3.5559 34.4834V9.65543C3.5559 5.84652 6.64364 2.75878 10.4526 2.75878H13.2112V1.92596C13.2112 1.16418 13.8288 0.546631 14.5906 0.546631ZM14.5906 9.65543C15.3523 9.65543 15.9699 9.03788 15.9699 8.2761V5.51744H29.7632V8.2761C29.7632 9.03788 30.3807 9.65543 31.1425 9.65543C31.9043 9.65543 32.5219 9.03788 32.5219 8.2761V5.51744H35.2805C37.5659 5.51744 39.4185 7.37008 39.4185 9.65543V11.0865H6.31457V9.65543C6.31457 7.37008 8.16721 5.51744 10.4526 5.51744H13.2112V8.2761C13.2112 9.03788 13.8288 9.65543 14.5906 9.65543ZM35.2805 38.6214C37.5659 38.6214 39.4185 36.7687 39.4185 34.4834V13.8451H6.31457V34.4834C6.31457 36.7687 8.16721 38.6214 10.4526 38.6214H35.2805Z"
          fill="#2B7277"
        />
      </svg>
    )
  }
)

export const IconList = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="list"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="2"
          y="2"
          width="29"
          height="29"
        >
          <path
            d="M11.5574 10.8971C11.5574 10.3448 12.0051 9.89706 12.5574 9.89706H24.5574C25.1097 9.89706 25.5574 10.3448 25.5574 10.8971C25.5574 11.4493 25.1097 11.8971 24.5574 11.8971H12.5574C12.0051 11.8971 11.5574 11.4493 11.5574 10.8971Z"
            fill="#000"
          />
          <path
            d="M8.55737 9.89706C8.00509 9.89706 7.55737 10.3448 7.55737 10.8971C7.55737 11.4493 8.00509 11.8971 8.55737 11.8971C9.10966 11.8971 9.55737 11.4493 9.55737 10.8971C9.55737 10.3448 9.10966 9.89706 8.55737 9.89706Z"
            fill="#000"
          />
          <path
            d="M11.5574 16.8971C11.5574 16.3448 12.0051 15.8971 12.5574 15.8971H24.5574C25.1097 15.8971 25.5574 16.3448 25.5574 16.8971C25.5574 17.4493 25.1097 17.8971 24.5574 17.8971H12.5574C12.0051 17.8971 11.5574 17.4493 11.5574 16.8971Z"
            fill="#000"
          />
          <path
            d="M8.55737 15.8971C8.00509 15.8971 7.55737 16.3448 7.55737 16.8971C7.55737 17.4493 8.00509 17.8971 8.55737 17.8971C9.10966 17.8971 9.55737 17.4493 9.55737 16.8971C9.55737 16.3448 9.10966 15.8971 8.55737 15.8971Z"
            fill="#000"
          />
          <path
            d="M11.5574 22.8971C11.5574 22.3448 12.0051 21.8971 12.5574 21.8971H24.5574C25.1097 21.8971 25.5574 22.3448 25.5574 22.8971C25.5574 23.4493 25.1097 23.8971 24.5574 23.8971H12.5574C12.0051 23.8971 11.5574 23.4493 11.5574 22.8971Z"
            fill="#000"
          />
          <path
            d="M8.55737 21.8971C8.00509 21.8971 7.55737 22.3448 7.55737 22.8971C7.55737 23.4493 8.00509 23.8971 8.55737 23.8971C9.10966 23.8971 9.55737 23.4493 9.55737 22.8971C9.55737 22.3448 9.10966 21.8971 8.55737 21.8971Z"
            fill="#000"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.55737 7.89706C2.55737 5.13564 4.79595 2.89706 7.55737 2.89706H25.5574C28.3188 2.89706 30.5574 5.13564 30.5574 7.89706V25.8971C30.5574 28.6585 28.3188 30.8971 25.5574 30.8971H7.55737C4.79595 30.8971 2.55737 28.6585 2.55737 25.8971V7.89706ZM7.55737 4.89706C5.90052 4.89706 4.55737 6.24021 4.55737 7.89706V25.8971C4.55737 27.5539 5.90052 28.8971 7.55737 28.8971H25.5574C27.2142 28.8971 28.5574 27.5539 28.5574 25.8971V7.89706C28.5574 6.24021 27.2142 4.89706 25.5574 4.89706H7.55737Z"
            fill="#000"
          />
        </mask>
        <g mask="url(#list)">
          <rect
            x="0.557373"
            y="0.897064"
            width="32"
            height="32"
            fill="#2B7277"
          />
        </g>
      </svg>
    )
  }
)

export const IconListFill = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="46"
        height="45"
        viewBox="0 0 46 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="6.4878"
          y="5.51733"
          width="33.1039"
          height="33.1039"
          fill="#E5EDD8"
        />
        <path
          d="M16.1431 13.7932C16.1431 13.0314 16.7607 12.4139 17.5224 12.4139H34.0744C34.8362 12.4139 35.4537 13.0314 35.4537 13.7932C35.4537 14.555 34.8362 15.1725 34.0744 15.1725H17.5224C16.7607 15.1725 16.1431 14.555 16.1431 13.7932Z"
          fill="#2B7277"
        />
        <path
          d="M12.0051 12.4139C11.2433 12.4139 10.6258 13.0314 10.6258 13.7932C10.6258 14.555 11.2433 15.1725 12.0051 15.1725C12.7669 15.1725 13.3845 14.555 13.3845 13.7932C13.3845 13.0314 12.7669 12.4139 12.0051 12.4139Z"
          fill="#2B7277"
        />
        <path
          d="M16.1431 22.0692C16.1431 21.3074 16.7607 20.6898 17.5224 20.6898H34.0744C34.8362 20.6898 35.4537 21.3074 35.4537 22.0692C35.4537 22.831 34.8362 23.4485 34.0744 23.4485H17.5224C16.7607 23.4485 16.1431 22.831 16.1431 22.0692Z"
          fill="#2B7277"
        />
        <path
          d="M12.0051 20.6898C11.2433 20.6898 10.6258 21.3074 10.6258 22.0692C10.6258 22.831 11.2433 23.4485 12.0051 23.4485C12.7669 23.4485 13.3845 22.831 13.3845 22.0692C13.3845 21.3074 12.7669 20.6898 12.0051 20.6898Z"
          fill="#2B7277"
        />
        <path
          d="M16.1431 30.3452C16.1431 29.5834 16.7607 28.9658 17.5224 28.9658H34.0744C34.8362 28.9658 35.4537 29.5834 35.4537 30.3452C35.4537 31.1069 34.8362 31.7245 34.0744 31.7245H17.5224C16.7607 31.7245 16.1431 31.1069 16.1431 30.3452Z"
          fill="#2B7277"
        />
        <path
          d="M12.0051 28.9658C11.2433 28.9658 10.6258 29.5834 10.6258 30.3452C10.6258 31.1069 11.2433 31.7245 12.0051 31.7245C12.7669 31.7245 13.3845 31.1069 13.3845 30.3452C13.3845 29.5834 12.7669 28.9658 12.0051 28.9658Z"
          fill="#2B7277"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.72914 9.6552C3.72914 5.84628 6.81687 2.75854 10.6258 2.75854H35.4537C39.2627 2.75854 42.3504 5.84628 42.3504 9.6552V34.4832C42.3504 38.2921 39.2627 41.3798 35.4537 41.3798H10.6258C6.81687 41.3798 3.72914 38.2921 3.72914 34.4832V9.6552ZM10.6258 5.51721C8.34044 5.51721 6.4878 7.36985 6.4878 9.6552V34.4832C6.4878 36.7685 8.34044 38.6211 10.6258 38.6211H35.4537C37.7391 38.6211 39.5917 36.7685 39.5917 34.4832V9.6552C39.5917 7.36985 37.7391 5.51721 35.4537 5.51721H10.6258Z"
          fill="#2B7277"
        />
      </svg>
    )
  }
)

export const IconAdd = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="addicon"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="2"
          y="2"
          width="29"
          height="29"
        >
          <path
            d="M16.5211 8.89706C17.0734 8.89706 17.5211 9.34478 17.5211 9.89706V15.8971H23.5574C24.1097 15.8971 24.5574 16.3448 24.5574 16.8971C24.5574 17.4493 24.1097 17.8971 23.5574 17.8971H17.5211V23.8971C17.5211 24.4493 17.0734 24.8971 16.5211 24.8971C15.9688 24.8971 15.5211 24.4493 15.5211 23.8971V17.8971H9.48486C8.93258 17.8971 8.48486 17.4493 8.48486 16.8971C8.48486 16.3448 8.93258 15.8971 9.48486 15.8971H15.5211V9.89706C15.5211 9.34478 15.9688 8.89706 16.5211 8.89706Z"
            fill="#000"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.55737 7.89706C2.55737 5.13564 4.79595 2.89706 7.55737 2.89706H25.5574C28.3188 2.89706 30.5574 5.13564 30.5574 7.89706V25.8971C30.5574 28.6585 28.3188 30.8971 25.5574 30.8971H7.55737C4.79595 30.8971 2.55737 28.6585 2.55737 25.8971V7.89706ZM7.55737 4.89706C5.90052 4.89706 4.55737 6.24021 4.55737 7.89706V25.8971C4.55737 27.5539 5.90052 28.8971 7.55737 28.8971H25.5574C27.2142 28.8971 28.5574 27.5539 28.5574 25.8971V7.89706C28.5574 6.24021 27.2142 4.89706 25.5574 4.89706H7.55737Z"
            fill="#000"
          />
        </mask>
        <g mask="url(#addicon)">
          <rect
            x="0.557373"
            y="0.897064"
            width="32"
            height="32"
            fill="#2B7277"
          />
        </g>
      </svg>
    )
  }
)

export const IconEdit = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.67486 27.4916C6.07515 28.064 4.53551 26.5071 5.12559 24.9139L7.55286 18.3602C7.66376 18.0608 7.83807 17.7888 8.06384 17.5631L20.6219 5.00502C21.7935 3.83344 23.693 3.83344 24.8645 5.00502L27.6676 7.80807C28.8392 8.97964 28.8392 10.8791 27.6676 12.0507L15.2391 24.4792C14.9254 24.7928 14.5461 25.0331 14.1284 25.1825L7.67486 27.4916ZM9.08053 19.994L11.2845 22.198C11.6751 22.5885 12.3082 22.5885 12.6987 22.198C13.0893 21.8074 13.0893 21.1743 12.6987 20.7837L10.1852 18.2702L22.0361 6.41923C22.4266 6.02871 23.0598 6.02871 23.4503 6.41923L26.2534 9.22228C26.6439 9.61281 26.6439 10.246 26.2534 10.6365L13.8249 23.065C13.7203 23.1695 13.5939 23.2496 13.4547 23.2994L7.00109 25.6085L9.08053 19.994Z"
          fill="#2B7277"
        />
      </svg>
    )
  }
)

export const IconHistory = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" fill="white" />
        <path
          d="M7 3H25C27.2091 3 29 4.79086 29 7V25C29 27.2091 27.2091 29 25 29H7C4.79086 29 3 27.2091 3 25V7C3 4.79086 4.79086 3 7 3Z"
          stroke="#2B7277"
          stroke-width="2"
        />
        <g clip-path="url(#clip0_1264_3488)">
          <path
            d="M16 12V16L18 18"
            stroke="#2B7277"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.95947 15.0925C8.16085 13.1155 9.08303 11.2819 10.55 9.94138C12.0171 8.6009 13.9263 7.84744 15.9133 7.82475C17.9004 7.80205 19.8263 8.51171 21.3236 9.81832C22.8208 11.1249 23.7846 12.937 24.0311 14.9089C24.2776 16.8808 23.7895 18.8744 22.66 20.5094C21.5304 22.1443 19.8384 23.3062 17.9069 23.7733C15.9754 24.2405 13.9395 23.9801 12.1876 23.042C10.4358 22.1039 9.09063 20.5537 8.4088 18.6871M7.95947 23.1804V18.6871H12.4527"
            stroke="#2B7277"
            stroke-width="1.79731"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1264_3488">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(4 4)"
            />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

export const IconHistoryFill = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" fill="white" />
        <path
          d="M7 3H25C27.2091 3 29 4.79086 29 7V25C29 27.2091 27.2091 29 25 29H7C4.79086 29 3 27.2091 3 25V7C3 4.79086 4.79086 3 7 3Z"
          stroke="#2B7277"
          stroke-width="2"
        />
        <g clip-path="url(#clip0_1264_3497)">
          <path
            d="M4 7C4 5.34315 5.34315 4 7 4H25C26.6569 4 28 5.34315 28 7V25C28 26.6569 26.6569 28 25 28H7C5.34315 28 4 26.6569 4 25V7Z"
            fill="#E5EDD8"
          />
          <path
            d="M16 12V16L18 18"
            stroke="#2B7277"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.95947 15.0925C8.16085 13.1155 9.08303 11.2819 10.55 9.94138C12.0171 8.6009 13.9263 7.84744 15.9133 7.82475C17.9004 7.80205 19.8263 8.51171 21.3236 9.81832C22.8208 11.1249 23.7846 12.937 24.0311 14.9089C24.2776 16.8808 23.7895 18.8744 22.66 20.5094C21.5304 22.1443 19.8384 23.3062 17.9069 23.7733C15.9754 24.2405 13.9395 23.9801 12.1876 23.042C10.4358 22.1039 9.09063 20.5537 8.4088 18.6871M7.95947 23.1804V18.6871H12.4527"
            stroke="#2B7277"
            stroke-width="1.79731"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1264_3497">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(4 4)"
            />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

export const IconChevronDown = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.8278 11.9588C28.2626 11.524 28.2626 10.819 27.8278 10.3842C27.393 9.9494 26.6881 9.94941 26.2533 10.3842L16.7595 19.878L7.26565 10.3842C6.83085 9.94941 6.12589 9.94941 5.69109 10.3842C5.25629 10.819 5.25629 11.524 5.69109 11.9588L15.9722 22.2399C16.407 22.6747 17.1119 22.6747 17.5467 22.2399L27.8278 11.9588Z"
          fill="#2B7277"
        />
      </svg>
    )
  }
)
export const IconRemove = component$(
  ({ classCustom }: { classCustom?: string }) => {
    return (
      <svg
        class={classCustom}
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_1_1448"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="5"
          y="1"
          width="23"
          height="32"
        >
          <path
            d="M26.9996 3.85408C27.5411 3.74514 27.8917 3.21791 27.7827 2.67648C27.6738 2.13504 27.1466 1.78444 26.6051 1.89338L6.725 5.89338C6.18357 6.00232 5.83296 6.52955 5.9419 7.07098C6.05084 7.61242 6.57807 7.96302 7.1195 7.85408L26.9996 3.85408Z"
            fill="#212121"
          />
          <path
            d="M13.67 14.5696C14.2223 14.5696 14.67 15.0174 14.67 15.5696V25.5006C14.67 26.0529 14.2223 26.5006 13.67 26.5006C13.1178 26.5006 12.67 26.0529 12.67 25.5006V15.5696C12.67 15.0174 13.1178 14.5696 13.67 14.5696Z"
            fill="#212121"
          />
          <path
            d="M20.6446 15.5696C20.6446 15.0174 20.1969 14.5696 19.6446 14.5696C19.0923 14.5696 18.6446 15.0174 18.6446 15.5696L18.6446 25.5006C18.6446 26.0529 19.0923 26.5006 19.6446 26.5006C20.1969 26.5006 20.6446 26.0529 20.6446 25.5006L20.6446 15.5696Z"
            fill="#212121"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.78578 8.52979C7.01969 8.52979 5.63572 10.0478 5.79855 11.8064L7.46083 29.759C7.60371 31.3021 8.89836 32.4824 10.448 32.4824H22.7803C24.3272 32.4824 25.6205 31.3062 25.7669 29.7663L27.4736 11.8137C27.641 10.0526 26.2561 8.52979 24.4871 8.52979H8.78578ZM7.79003 11.622C7.73576 11.0358 8.19708 10.5298 8.78578 10.5298H24.4871C25.0767 10.5298 25.5384 11.0374 25.4826 11.6244L23.7759 29.577C23.7271 30.0903 23.296 30.4824 22.7803 30.4824H10.448C9.93149 30.4824 9.49994 30.089 9.45231 29.5746L7.79003 11.622Z"
            fill="#212121"
          />
        </mask>
        <g mask="url(#mask0_1_1448)">
          <rect
            x="0.599243"
            y="0.5"
            width="32"
            height="32"
            fill="currentColor"
          />
        </g>
      </svg>
    )
  }
)
