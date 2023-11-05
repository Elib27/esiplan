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
  const typeColors: { readonly [index: string]: string } = {
    CM: 'bg-[--color-cm]',
    TD: 'bg-[--color-td]',
    TP: 'bg-[--color-tp]',
    DS: 'bg-[--color-ds]',
    AU: 'bg-[--color-au]',
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
      } flex w-[90vw] max-w-sm flex-shrink-0 select-none items-center gap-2 overflow-hidden rounded-2xl bg-main-purple shadow-card`}
    >
      <div className='flex h-full w-14 flex-col justify-between py-3 pl-3'>
        <span className='w-fit text-sm text-white'>
          {formatTime(startTime)}
        </span>
        <span className='w-fit text-sm text-white'>{formatTime(endTime)}</span>
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
        className={`flex h-full w-16 items-center justify-center ${
          typeColors[type.toUpperCase()]
        }`}
      >
        <span className='font-bold'>{type.toUpperCase()}</span>
      </div>
    </div>
  )
}
