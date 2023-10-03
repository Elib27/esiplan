'use client'
import { useState } from 'react'
import TopMenu from './topMenu/topMenu'
import DateNavigation from './dateNavigation'
import DayLessons from './dayLessons'
import EdtNavigation from './edtNavigation'
import useSchedule from '@/hooks/useSchedule'

export default function Schedule() {
  const [scheduleDate, setScheduleDate] = useState(new Date())
  const [currentEdt, setCurrentEdt] = useState('3A-S1-TP1A')

  const { data: schedule, isLoading } = useSchedule(currentEdt)

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
        <DayLessons
          lessons={schedule}
          scheduleDate={scheduleDate}
          isLoading={isLoading}
        />
      </div>
      <div className='flex w-full flex-col items-center justify-center border-t-2 border-light-gray'>
        <EdtNavigation currentEdt={currentEdt} setCurrentEdt={setCurrentEdt} />
        <DateNavigation
          setScheduleDate={setScheduleDate}
          scheduleDate={scheduleDate as Date}
        />
      </div>
    </div>
  )
}
