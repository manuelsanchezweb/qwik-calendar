type Appointment = {
  id: number
  title: string
  date: string
  timeStart: string
  timeEnd: string
  fullDay: boolean
  category: string
}

export const FAKE_APPOINTMENTS: Array<Appointment> = [
  {
    id: 1,
    title: 'Learn German',
    date: '2024-12-31T23:59:59.999Z',
    timeStart: '10:00',
    timeEnd: '11:00',
    fullDay: false,
    category: 'Education',
  },
  {
    id: 2,
    title: 'Cook paella',
    date: '2024-12-30T23:59:59.999Z',
    timeStart: '10:00',
    timeEnd: '11:00',
    fullDay: false,
    category: 'Gastronomy',
  },
  {
    id: 3,
    title: 'Go to the beach',
    date: '2024-12-29T23:59:59.999Z',
    timeStart: '',
    timeEnd: '',
    fullDay: true,
    category: 'Leisure',
  },
]
