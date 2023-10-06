type LessonCardProps = Omit<Lesson, 'id'>

function getLessonDuration(startTime: string, endTime: string): number {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const duration = end.getTime() - start.getTime()
  const MS_PER_TIME_BLOCK = 60 * 60 * 1000 * 1.5 // Lesson duration: 1:30
  const hours = duration / MS_PER_TIME_BLOCK
  return hours
}

function getCardHeightWithDuration(durationInTimeBlocks: number): number {
  if (durationInTimeBlocks < 1) return 1
  if (durationInTimeBlocks > 1 && durationInTimeBlocks < 2) return 1.5
  if (durationInTimeBlocks > 2) return 2
  return durationInTimeBlocks
}

const formatTime = (time: string) =>
  new Date(time).toLocaleTimeString('fr-FR', {
    timeStyle: 'short',
  })

export default function LessonCard({
  subject,
  type,
  room,
  startTime,
  endTime,
}: LessonCardProps) {
  const lessonTypeBgColors: { readonly [index: string]: string } = {
    cm: 'bg-color-cm',
    td: 'bg-color-td',
    tp: 'bg-color-tp',
    ds: 'bg-color-ds',
    ex: 'bg-color-ex',
    au: 'bg-color-au',
  }

  const cardSizes: { readonly [index: number]: string } = {
    1: 'h-24',
    1.5: 'h-36',
    2: 'h-48',
  }

  const lessonDuration = getLessonDuration(startTime, endTime)

  return (
    <div
      className={`${
        cardSizes[getCardHeightWithDuration(lessonDuration)]
      } flex w-full flex-shrink-0 items-center gap-2 overflow-hidden rounded-2xl bg-main-purple shadow-card`}
    >
      <div className='flex h-full flex-col justify-between py-3 pl-3'>
        <span className='text-sm text-white'>{formatTime(startTime)}</span>
        <span className='text-sm text-white'>{formatTime(endTime)}</span>
      </div>
      <div className='flex-1 overflow-hidden'>
        <h2 className='overflow-hidden text-ellipsis text-center font-bold text-white'>
          {subject}
        </h2>
        <span className='block overflow-hidden text-ellipsis text-center text-white'>
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
