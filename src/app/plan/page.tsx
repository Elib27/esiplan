import LessonCard from '@/components/lessonCard'

async function getPlanning() {
  const res = await fetch('http://localhost:3000/api/lessons', {
    cache: 'no-cache',
  })
  const lessons = await res.json()
  return lessons
}

export default async function Plan() {
  const lessons = await getPlanning()

  if (!lessons) return null

  return (
    <>
      <h1 className='my-8 text-center text-4xl font-bold'>Emploi du temps</h1>
      <div className='flex w-full flex-col items-center gap-4'>
        {lessons.slice(0, 10).map((lesson: Lesson) => (
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
    </>
  )
}
