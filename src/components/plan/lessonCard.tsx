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

  const formatedStartTime = new Date(startTime).toLocaleTimeString('fr-FR', {
    timeStyle: 'short',
  })
  const formatedEndTime = new Date(endTime).toLocaleTimeString('fr-FR', {
    timeStyle: 'short',
  })

  const lessonTypeBgColors: { readonly [index: string]: string } = {
    cm: 'bg-color-cm',
    td: 'bg-color-td',
    tp: 'bg-color-tp',
    ds: 'bg-color-ds',
    ex: 'bg-color-ex',
    au: 'bg-color-au',
  }

  return (
    <div
      className={`h-${getCardSizeWithDuration(
        lessonDuration
      )} bg-main-purple flex w-full items-center gap-2 overflow-hidden rounded-2xl`}
    >
      <div className='flex h-full flex-col justify-between py-4 pl-4'>
        <span className='text-sm text-white'>{formatedStartTime}</span>
        <span className='text-sm text-white'>{formatedEndTime}</span>
      </div>
      <div className='flex-1 py-8'>
        <h2 className='text-ellipsis text-center font-bold text-white'>
          {subject}
        </h2>
        <span className='block text-ellipsis text-center text-white'>
          {room}
        </span>
      </div>
      <div
        className={`${
          lessonTypeBgColors[type.toLocaleLowerCase()]
        } flex h-full items-center justify-center`}
      >
        <span className='px-4 font-bold'>{type.toUpperCase()}</span>
      </div>
    </div>
  )
}
