import addDaysToDate from '@/lib/addDaysToDate'
import ArrowLeftIcon from '@/assets/arrow-left.svg'
import ArrowRightIcon from '@/assets/arrow-right.svg'
import TodayIcon from '@/assets/today.svg'

type dateNavigationProps = {
  scheduleDate: Date
  setScheduleDate: (date: Date) => void
}

export default function DateNavigation({
  scheduleDate,
  setScheduleDate,
}: dateNavigationProps) {
  const handleClickPrevDay = () =>
    setScheduleDate(addDaysToDate(scheduleDate, -1))
  const handleClickNextDay = () =>
    setScheduleDate(addDaysToDate(scheduleDate, 1))
  const handleClickToday = () => setScheduleDate(new Date())

  return (
    <div className='flex items-center gap-10 p-4'>
      <button
        className='flex aspect-square h-14 items-center justify-center rounded-full bg-light-purple active:scale-95'
        onClick={handleClickPrevDay}
      >
        <ArrowLeftIcon className='relative right-px' />
      </button>
      <button
        className='flex aspect-square h-14 items-center justify-center rounded-full bg-light-purple active:scale-95'
        onClick={handleClickToday}
      >
        <TodayIcon />
      </button>
      <button
        className='flex aspect-square h-14 items-center justify-center rounded-full bg-light-purple active:scale-95'
        onClick={handleClickNextDay}
      >
        <ArrowRightIcon className='relative left-px' />
      </button>
    </div>
  )
}
