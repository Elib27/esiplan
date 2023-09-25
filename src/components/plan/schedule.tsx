'use client'
import { useState } from 'react'
import LessonCard from '@/components/plan/lessonCard'

const sortByDate = (a: Lesson, b: Lesson) => {
  if (new Date(a.startTime).getTime() >= new Date(b.startTime).getTime())
    return 1
  return -1
}

const addDays = (date: Date, days: number) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

export default function Schedule({ lessons }: { lessons: Lesson[] }) {
  const [scheduleDate, setScheduleDate] = useState(new Date())

  const fullScheduleDate = scheduleDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const todayLessons: Lesson[] = lessons
    ?.filter(
      (lesson: Lesson) =>
        new Date(lesson.startTime).toLocaleDateString('fr-FR') ===
        scheduleDate.toLocaleDateString('fr-FR')
    )
    ?.sort(sortByDate)

  if (!todayLessons) return null

  return (
    <div className='flex w-full justify-center gap-4'>
      <button
        className='h-fit self-end rounded-full bg-violet-300 p-4'
        onClick={() => setScheduleDate(addDays(scheduleDate, -1))}
      >
        -1
      </button>
      <div className='flex flex-col items-center gap-4'>
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
        className='h-fit self-end rounded-full bg-violet-300 p-4'
        onClick={() => setScheduleDate(addDays(scheduleDate, 1))}
      >
        +1
      </button>
    </div>
  )
}
