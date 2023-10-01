import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'
import { registerLocale } from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import GearIcon from '@/assets/gear.svg'
import CalendarIcon from '@/assets/calendar.svg'

registerLocale('fr', fr)

export default function TopMenu({
  scheduleDate,
  setScheduleDate,
}: {
  scheduleDate: Date
  setScheduleDate: Dispatch<SetStateAction<Date>>
}) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function handleDateChange(date: Date) {
    setScheduleDate(date)
    setIsDatePickerOpen(false)
  }

  return (
    <div className='z-10 flex w-full justify-between px-8 pt-4'>
      <button
        className='flex aspect-square h-12 items-center justify-center rounded-full bg-light-purple'
        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
      >
        <CalendarIcon />
      </button>

      <Link
        href='/settings'
        className='flex aspect-square h-12 items-center justify-center rounded-full bg-light-purple'
      >
        <GearIcon />
      </Link>
      {isDatePickerOpen && (
        <div className='z-99 absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-light-purple/75'>
          <DatePicker
            selected={scheduleDate}
            inline
            onChange={handleDateChange}
            locale='fr'
            onClickOutside={() => setIsDatePickerOpen(false)}
          />
        </div>
      )}
    </div>
  )
}
