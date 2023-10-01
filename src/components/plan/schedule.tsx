'use client'
import { useState } from 'react'
import TopMenu from './topMenu/topMenu'
import DateNavigation from './dateNavigation'
import DayLessons from './dayLessons'
import EdtNavigation from './edtNavigation'

export default function Schedule({ lessons }: { lessons: Lesson[] }) {
  const [scheduleDate, setScheduleDate] = useState(new Date())

  const fullScheduleDate = scheduleDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className='flex h-full min-h-0 w-full flex-col items-center justify-between'>
      <div className='flex min-h-0 w-full flex-grow flex-col items-center'>
        <TopMenu
          scheduleDate={scheduleDate}
          setScheduleDate={setScheduleDate}
        />
        <h3 className='py-4 text-center'>{fullScheduleDate}</h3>
        <DayLessons lessons={lessons} scheduleDate={scheduleDate} />
      </div>
      <div className='flex w-full flex-col items-center justify-center border-t-2 border-light-gray'>
        <EdtNavigation />
        <DateNavigation
          setScheduleDate={setScheduleDate}
          scheduleDate={scheduleDate as Date}
        />
      </div>
    </div>
  )
}
