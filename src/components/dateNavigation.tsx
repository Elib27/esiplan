import { Dispatch, SetStateAction, useEffect } from 'react'
import addDaysToDate from '@/lib/addDaysToDate'
import ArrowLeftIcon from '@/assets/arrow-left.svg'
import ArrowRightIcon from '@/assets/arrow-right.svg'
import TodayIcon from '@/assets/today.svg'

export default function DateNavigation({
  setScheduleDate,
}: {
  setScheduleDate: Dispatch<SetStateAction<Date>>
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowLeft':
          setScheduleDate((d) => addDaysToDate(d, -1))
          break
        case 'ArrowRight':
          setScheduleDate((d) => addDaysToDate(d, 1))
          break
        case 'ArrowUp':
          setScheduleDate((d) => addDaysToDate(d, 7))
          break
        case 'ArrowDown':
          setScheduleDate((d) => addDaysToDate(d, -7))
          break
        case ' ':
          setScheduleDate(new Date())
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setScheduleDate])

  return (
    <div className='flex items-center gap-10 p-4'>
      <button
        className='flex aspect-square h-14 items-center justify-center rounded-full bg-light-purple active:scale-95'
        onClick={() => setScheduleDate((d) => addDaysToDate(d, -1))}
        aria-label='Jour précédent'
      >
        <ArrowLeftIcon className='relative right-px' />
      </button>
      <button
        className='flex aspect-square h-14 items-center justify-center rounded-full bg-light-purple active:scale-95'
        onClick={() => setScheduleDate(new Date())}
        aria-label="Aujourd'hui"
      >
        <TodayIcon />
      </button>
      <button
        className='flex aspect-square h-14 items-center justify-center rounded-full bg-light-purple active:scale-95'
        onClick={() => setScheduleDate((d) => addDaysToDate(d, 1))}
        aria-label='Jour suivant'
      >
        <ArrowRightIcon className='relative left-px' />
      </button>
    </div>
  )
}
