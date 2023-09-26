type LessonCardProps = Omit<Lesson, 'id'>

function getLessonDuration(startTime: string, endTime: string): number {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const duration = end.getTime() - start.getTime()
  const MS_IN_LESSON_HOUR = 60 * 60 * 1000 * 1.5 // Lesson duration: 1:30
  const hours = duration / MS_IN_LESSON_HOUR
  return hours
}

function getCardSizeWithDuration(durationInHours: number): number {
  const HEIGHT_PER_LESSON_HOUR = 36
  return durationInHours * HEIGHT_PER_LESSON_HOUR
}

export default function LessonCard({
  subject,
  type,
  room,
  startTime,
  endTime,
}: LessonCardProps) {
  const lessonDuration = getLessonDuration(startTime, endTime)

  return (
    <div
      className={
        `h-${getCardSizeWithDuration(lessonDuration)}` +
        ' rounded-xl bg-purple-900 p-4'
      }
    >
      <h2 className='text-center font-bold text-white'>{subject}</h2>
      <span className='block text-center text-white'>{room}</span>
      <span className='block text-center text-white'>{type}</span>
      <span className='block text-center text-white'>
        from {new Date(startTime).toLocaleTimeString('fr-FR')} to{' '}
        {new Date(endTime).toLocaleTimeString('fr-FR')}
      </span>
      <span className='block text-center text-white'>
        Duration:{' '}
        {Math.round(100 * getLessonDuration(startTime, endTime)) / 100}
      </span>
    </div>
  )
}
