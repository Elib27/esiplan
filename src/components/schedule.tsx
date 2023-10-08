'use client'
import { useState } from 'react'
import useStore from '@/hooks/useStore'
import { useSettingsStore } from '@/store/useSettingsStore'
import TopMenu from './settings/topMenu'
import DateNavigation from './dateNavigation'
import DayScheduleLayout from './daySchedule/dayScheduleSwipeLayout'
import DayLessons from './daySchedule/daySchedule'
import EdtNavigation from './edtNavigation'

export default function Schedule() {
  const settingsStore = useStore(useSettingsStore, (state) => state)

  const [scheduleDate, setScheduleDate] = useState(new Date())

  const fullScheduleDate = scheduleDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  if (!settingsStore) return null

  return (
    <div className='flex h-full min-h-0 w-full flex-col items-center justify-between'>
      <div className='flex min-h-0 w-full flex-grow flex-col items-center'>
        <TopMenu
          scheduleDate={scheduleDate}
          setScheduleDate={setScheduleDate}
        />
        <h3 className='py-4 text-center transition-colors dark:text-white'>
          {fullScheduleDate}
        </h3>
        <DayScheduleLayout setScheduleDate={setScheduleDate}>
          <DayLessons
            scheduleDate={scheduleDate}
            currentEdt={settingsStore.currentEdt}
          />
        </DayScheduleLayout>
      </div>
      <div className='flex w-full flex-col items-center justify-center border-t-2 border-light-gray'>
        <EdtNavigation
          currentEdt={settingsStore.currentEdt}
          setCurrentEdt={settingsStore.setCurrentEdt}
        />
        <DateNavigation setScheduleDate={setScheduleDate} />
      </div>
    </div>
  )
}
