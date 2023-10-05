import useSchedule from '@/hooks/useSchedule'
import sortLessonsByDate from '@/lib/sortLessonsByDate'
import LessonCard from './lessonCard'
import NoClass from './noClass'
import PastDay from './pastDay'

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

  if (!currentEdt) {
    return (
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center text-center'>
        Aucun EDT sélectionné, va dans les paramètre pour en sélectionner un.
      </div>
    )
  }

  if (scheduleDate.getTime() < new Date().setHours(0, 0, 0)) {
    return (
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center'>
        <PastDay />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center'>
        Loading...
      </div>
    )
  }

  if (!todaySchedule) {
    return <>Error</>
  }

  if (todaySchedule.length === 0) {
    return (
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center'>
        <NoClass />
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
