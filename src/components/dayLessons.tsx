import useSchedule from '@/hooks/useSchedule'
import sortLessonsByDate from '@/lib/sortLessonsByDate'
import LessonCard from './lessonCard'
import LoaderIcon from '@/assets/loader.svg'

export default function DayLessons({
  scheduleDate,
  currentEdt,
}: {
  scheduleDate: Date
  currentEdt: string | undefined
}) {
  const { data: schedule, isLoading } = useSchedule(currentEdt)

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
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center text-center transition-colors dark:text-white'>
        Aucun EDT sélectionné, va dans les paramètres pour en sélectionner un.
      </div>
    )
  }

  if (isPassedDay) {
    return (
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center transition-colors dark:text-white'>
        <span>Le passé c&apos;est le passé</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center text-main-purple transition-colors dark:text-light-purple'>
        <LoaderIcon className='animate-spin' />
      </div>
    )
  }

  if (!todaySchedule) {
    return (
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center text-main-purple transition-colors dark:text-light-purple'>
        <span>
          Une erreur s&apos;est produite lors de la récupération de l&apos;EDT
        </span>
      </div>
    )
  }

  if (todaySchedule.length === 0) {
    return (
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center transition-colors dark:text-white'>
        <span>Pas de cours 😎</span>
      </div>
    )
  }

  return (
    <div className='flex min-h-0 w-[90vw] max-w-sm flex-col items-center gap-4 overflow-y-auto px-2 pb-4'>
      {todaySchedule.map((lesson: Lesson) => (
        <LessonCard
          subject={lesson.subject}
          type={lesson.type}
          room={lesson.room}
          startTime={lesson.startTime}
          endTime={lesson.endTime}
          key={lesson.id}
        />
      ))}
    </div>
  )
}
