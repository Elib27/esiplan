import { Dispatch, SetStateAction } from 'react'
import addDaysToDate from '@/lib/addDaysToDate'
import ArrowLeftIcon from '@/assets/arrow-left.svg'
import ArrowRightIcon from '@/assets/arrow-right.svg'
import TodayIcon from '@/assets/today.svg'

export default function DateNavigation({
  setScheduleDate,
}: {
  setScheduleDate: Dispatch<SetStateAction<Date>>
}) {
  const handleClickPrevDay = () => setScheduleDate((d) => addDaysToDate(d, -1))
  const handleClickNextDay = () => setScheduleDate((d) => addDaysToDate(d, 1))
  const handleClickToday = () => setScheduleDate(new Date())

  return (
    <div className='flex items-center gap-10 p-4'>
      <button
        className='flex aspect-square h-14 items-center justify-center rounded-full bg-light-purple active:scale-95'
        onClick={handleClickPrevDay}
        aria-label='Jour précédent'
      >
        <ArrowLeftIcon className='relative right-px' />
      </button>
      <button
        className='flex aspect-square h-14 items-center justify-center rounded-full bg-light-purple active:scale-95'
        onClick={handleClickToday}
        aria-label="Aujourd'hui"
      >
        <TodayIcon />
      </button>
      <button
        className='flex aspect-square h-14 items-center justify-center rounded-full bg-light-purple active:scale-95'
        onClick={handleClickNextDay}
        aria-label='Jour suivant'
      >
        <ArrowRightIcon className='relative left-px' />
      </button>
    </div>
  )
}
