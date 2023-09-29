import LessonCard from './lessonCard'
import NoClass from './noClass'
import sortLessonsByDate from '@/lib/sortLessonsByDate'
import PastDay from './pastDay'

export default function DayLessons({
  lessons,
  scheduleDate,
}: {
  lessons: Lesson[]
  scheduleDate: Date
}) {
  const todayLessons: Lesson[] = lessons
    ?.filter(
      (lesson: Lesson) =>
        new Date(lesson.startTime).toLocaleDateString('fr-FR') ===
        scheduleDate.toLocaleDateString('fr-FR')
    )
    ?.sort(sortLessonsByDate)

  if (scheduleDate.getTime() < new Date().getTime()) {
    return (
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center'>
        <PastDay />
      </div>
    )
  }

  if (todayLessons.length === 0) {
    return (
      <div className='flex h-full min-h-0 w-[90vw] max-w-sm items-center justify-center'>
        <NoClass />
      </div>
    )
  }

  return (
    <div className='flex min-h-0 w-[90vw] max-w-sm flex-col items-center gap-4 overflow-y-auto px-2 pb-4'>
      {todayLessons.map((lesson: Lesson) => (
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
