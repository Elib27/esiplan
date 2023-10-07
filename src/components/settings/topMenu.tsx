import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import GearIcon from '@/assets/gear.svg'
import CalendarIcon from '@/assets/calendar.svg'

const DatePicker = dynamic(() => import('@/components/datePicker/datePicker'))

export default function TopMenu({
  scheduleDate,
  setScheduleDate,
}: {
  scheduleDate: Date
  setScheduleDate: Dispatch<SetStateAction<Date>>
}) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

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
        <DatePicker
          scheduleDate={scheduleDate}
          setScheduleDate={setScheduleDate}
          setIsDatePickerOpen={setIsDatePickerOpen}
        />
      )}
    </div>
  )
}
