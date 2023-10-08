import { Dispatch, SetStateAction, useRef } from 'react'
import addDaysToDate from '@/lib/addDaysToDate'

export default function DayScheduleSwipeLayout({
  setScheduleDate,
  children,
}: {
  setScheduleDate: Dispatch<SetStateAction<Date>>
  children: React.ReactNode
}) {
  const touchstartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const MIN_SWIPE_DISTANCE = 50

  const navigateToPrevDay = () => setScheduleDate((d) => addDaysToDate(d, -1))
  const navigateToNextDay = () => setScheduleDate((d) => addDaysToDate(d, 1))

  function checkDirection() {
    if (!touchstartX.current || !touchEndX.current) return

    const swipeDistance = touchEndX.current - touchstartX.current
    if (swipeDistance > MIN_SWIPE_DISTANCE) {
      navigateToPrevDay()
    } else if (swipeDistance < -MIN_SWIPE_DISTANCE) {
      navigateToNextDay()
    }
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchstartX.current = e.changedTouches[0].screenX
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    touchEndX.current = e.changedTouches[0].screenX
    checkDirection()
  }

  return (
    <div
      className='flex min-h-0 w-full flex-grow flex-col items-center gap-4 overflow-y-auto px-2 pb-4'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}
