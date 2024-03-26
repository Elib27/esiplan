import { Dispatch, SetStateAction, useRef } from 'react'
import addDaysToDate from '@/lib/addDaysToDate'

export default function DayScheduleSwipeLayout({
  setScheduleDate,
  children,
}: {
  setScheduleDate: Dispatch<SetStateAction<Date>>
  children: React.ReactNode
}) {
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null)

  const MIN_X_SWIPE_DISTANCE = 20
  const MAX_Y_SWIPE_DISTANCE = 20

  const navigateToPrevDay = () => setScheduleDate((d) => addDaysToDate(d, -1))
  const navigateToNextDay = () => setScheduleDate((d) => addDaysToDate(d, 1))

  function checkDirection() {
    if (
      !touchStartX.current ||
      !touchEndX.current ||
      !touchStartY.current ||
      !touchEndY.current
    )
      return

    const swipeDistanceX = touchEndX.current - touchStartX.current
    const swipeDistanceY = touchEndY.current - touchStartY.current

    if (Math.abs(swipeDistanceY) > MAX_Y_SWIPE_DISTANCE) return

    if (swipeDistanceX > MIN_X_SWIPE_DISTANCE) {
      navigateToPrevDay()
    } else if (swipeDistanceX < -MIN_X_SWIPE_DISTANCE) {
      navigateToNextDay()
    }
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.changedTouches[0].screenX
    touchStartY.current = e.changedTouches[0].screenY
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    touchEndX.current = e.changedTouches[0].screenX
    touchEndY.current = e.changedTouches[0].screenY
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
