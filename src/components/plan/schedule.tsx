'use client'
import { useState } from 'react'
import LessonCard from './lessonCard'
import DateNavigation from './dateNavigation'
import sortLessonsByDate from '@/lib/sortLessonsByDate'

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
    <div className='flex h-full w-full flex-col items-center justify-between gap-4'>
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
      <DateNavigation
        setScheduleDate={setScheduleDate}
        scheduleDate={scheduleDate}
      />
    </div>
  )
}
