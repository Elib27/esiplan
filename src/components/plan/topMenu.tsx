import Link from 'next/link'
import GearIcon from '@/assets/gear.svg'
import CalendarIcon from '@/assets/calendar.svg'

export default function TopMenu() {
  return (
    <div className='flex w-full justify-between px-8 pt-4'>
      <button
        className='flex aspect-square h-12 items-center justify-center rounded-full bg-light-purple'
        onClick={() => console.log('pick a date !')}
      >
        <CalendarIcon />
      </button>
      <Link
        href='/settings'
        className='flex aspect-square h-12 items-center justify-center rounded-full bg-light-purple'
      >
        <GearIcon />
      </Link>
    </div>
  )
}
