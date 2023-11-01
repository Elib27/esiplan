'use client'
import Link from 'next/link'
import Settings from '@/components/settings/settings'
import BackIcon from '@/assets/arrow-back.svg'

export default function SettingsPage() {
  return (
    <>
      <Link
        href='/'
        className='m-4 block w-fit text-dark-gray transition-colors dark:text-white'
      >
        <BackIcon />
      </Link>
      <Settings />
    </>
  )
}
