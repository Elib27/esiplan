'use client'
import { useState } from 'react'
import LessonCard from '@/components/plan/lessonCard'
import sortLessonsByDate from '@/lib/sortLessonsByDate'
import addDaysToDate from '@/lib/addDaysToDate'

export default function Schedule({ lessons }: { lessons: Lesson[] }) {
  const [scheduleDate, setScheduleDate] = useState(new Date())

  const fullScheduleDate = scheduleDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const todayLessons: Lesson[] = lessons
    ?.filter(
      (lesson: Lesson) =>
        new Date(lesson.startTime).toLocaleDateString('fr-FR') ===
        scheduleDate.toLocaleDateString('fr-FR')
    )
    ?.sort(sortLessonsByDate)

  if (!todayLessons) return null

  return (
    <div className='flex w-full justify-center gap-4'>
      <button
        className='bg-light-purple h-fit self-end rounded-full p-4'
        onClick={() => setScheduleDate(addDaysToDate(scheduleDate, -1))}
      >
        -1
      </button>
      <div className='flex w-[90vw] max-w-sm flex-col items-center gap-4'>
        <h3>{fullScheduleDate}</h3>
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
      <button
        className='bg-light-purple h-fit self-end rounded-full p-4'
        onClick={() => setScheduleDate(addDaysToDate(scheduleDate, 1))}
      >
        +1
      </button>
    </div>
  )
}
