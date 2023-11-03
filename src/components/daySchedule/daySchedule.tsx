import { useEffect } from 'react'
import useSchedule from '@/hooks/useSchedule'
import sortLessonsByDate from '@/lib/sortLessonsByDate'
import LessonCard from '../lessonCard'
import LoaderIcon from '@/assets/loader.svg'

export default function DaySchedule({
  scheduleDate,
  currentEdt,
}: {
  scheduleDate: Date
  currentEdt: string | undefined
}) {
  const { data: schedule, isLoading, refetch } = useSchedule(currentEdt)

  // Refetch schedule when the page is voluntary reloaded
  useEffect(() => {
    if (!refetch) return
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (
          entry instanceof PerformanceNavigationTiming &&
          entry.type === 'reload'
        ) {
          refetch()
        }
      })
    })
    observer.observe({ type: 'navigation', buffered: true })
  }, [refetch])

  const todaySchedule: Schedule = schedule
    ?.filter(
      (lesson: Lesson) =>
        new Date(lesson.startTime).toLocaleDateString('fr-FR') ===
        scheduleDate.toLocaleDateString('fr-FR')
    )
    ?.sort(sortLessonsByDate)

  const isPassedDay = scheduleDate.getTime() < new Date().setHours(0, 0, 0)

  if (!currentEdt) {
    return (
      <div className='flex h-full select-none flex-col items-center justify-center transition-colors dark:text-white'>
        <span className='text-center'>
          Aucun EDT sélectionné, va dans les paramètres pour en sélectionner un.
        </span>
      </div>
    )
  }

  if (isPassedDay) {
    return (
      <div className='flex h-full select-none flex-col items-center justify-center transition-colors dark:text-white'>
        <span className='text-center'>Le passé c&apos;est le passé ⌚</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex h-full flex-col items-center justify-center text-main-purple transition-colors dark:text-light-purple'>
        <LoaderIcon className='animate-spin' />
      </div>
    )
  }

  if (!todaySchedule) {
    return (
      <div className='flex h-full select-none flex-col items-center justify-center transition-colors dark:text-white'>
        <span className='text-center'>
          Une erreur s&apos;est produite lors de la récupération de l&apos;EDT
        </span>
      </div>
    )
  }

  if (todaySchedule.length === 0) {
    return (
      <div className='flex h-full select-none flex-col items-center justify-center transition-colors dark:text-white'>
        <span className='text-center'>Pas de cours 😎</span>
      </div>
    )
  }

  return (
    <>
      {todaySchedule.map((lesson) => (
        <LessonCard
          subject={lesson.subject}
          type={lesson.type}
          room={lesson.room}
          startTime={lesson.startTime}
          endTime={lesson.endTime}
          key={lesson.id}
        />
      ))}
    </>
  )
}
