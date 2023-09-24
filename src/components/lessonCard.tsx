type LessonCardProps = Omit<Lesson, 'id'>

export default function LessonCard({
  subject,
  type,
  room,
  startTime,
  endTime,
}: LessonCardProps) {
  return (
    <div className='rounded-xl bg-purple-900 p-4'>
      <h2 className='text-center font-bold text-white'>{subject}</h2>
      <span className='block text-center text-white'>{room}</span>
      <span className='block text-center text-white'>{type}</span>
      <span className='block text-center text-white'>
        from {startTime} to {endTime}
      </span>
    </div>
  )
}
