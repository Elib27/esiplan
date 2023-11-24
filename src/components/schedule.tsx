'use client'
import { useState, useEffect } from 'react'
import useStore from '@/hooks/useStore'
import { useSettingsStore } from '@/store/useSettingsStore'
import addDaysToDate from '@/lib/addDaysToDate'
import TopMenu from './topMenu'
import DateNavigation from './dateNavigation'
import DayScheduleSwipeLayout from './daySchedule/dayScheduleSwipeLayout'
import DaySchedule from './daySchedule/daySchedule'
import EdtNavigation from './edtNavigation'

export default function Schedule() {
  const settingsStore = useStore(useSettingsStore, (state) => state)

  const [scheduleDate, setScheduleDate] = useState(new Date())

  useEffect(() => {
    if (!settingsStore?.showNextDayScheduleHour) return
    console.log('tomo: ', settingsStore.showNextDayScheduleHour)
    const todayDate = new Date()
    const getInitialDate = () => {
      if (todayDate.getHours() >= settingsStore.showNextDayScheduleHour) {
        const tomorrowDate = addDaysToDate(new Date(), 1)
        console.log('oui')
        return tomorrowDate
      }
      return todayDate
    }
    setScheduleDate(getInitialDate())
  }, [settingsStore?.showNextDayScheduleHour])

  // Update colors when settings change
  useEffect(() => {
    if (!settingsStore?.lessonTypesColors) return
    for (const [lessonType, color] of Object.entries(
      settingsStore.lessonTypesColors
    )) {
      document.documentElement.style.setProperty(
        `--color-${lessonType.toLowerCase()}`,
        color
      )
    }
  }, [settingsStore?.lessonTypesColors])

  const fullScheduleDate = scheduleDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const todayDate = new Date()

  const scheduleDateTitle = `${fullScheduleDate} ${
    settingsStore?.showNextDayScheduleHour &&
    todayDate.getHours() >= settingsStore?.showNextDayScheduleHour &&
    scheduleDate.getDate() === todayDate.getDate() + 1
      ? '(demain)'
      : ''
  }`

  if (!settingsStore) return null

  return (
    <div className='flex h-full min-h-0 w-full flex-col items-center justify-between'>
      <div className='flex min-h-0 w-full flex-grow flex-col items-center'>
        <TopMenu
          scheduleDate={scheduleDate}
          setScheduleDate={setScheduleDate}
        />
        <h3 className='py-4 text-center transition-colors dark:text-white'>
          {scheduleDateTitle}
        </h3>
        <DayScheduleSwipeLayout setScheduleDate={setScheduleDate}>
          <DaySchedule
            scheduleDate={scheduleDate}
            currentEdt={settingsStore.currentEdt}
          />
        </DayScheduleSwipeLayout>
      </div>
      <div className='flex w-full flex-col items-center justify-center border-t-2 border-light-gray dark:border-secondary-purple'>
        <EdtNavigation
          currentEdt={settingsStore.currentEdt}
          setCurrentEdt={settingsStore.setCurrentEdt}
        />
        <DateNavigation setScheduleDate={setScheduleDate} />
      </div>
    </div>
  )
}
