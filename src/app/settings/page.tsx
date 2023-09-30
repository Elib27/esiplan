'use client'
import Link from 'next/link'
import { useState } from 'react'
import Option from '@/components/plan/settings/option'
import BackIcon from '@/assets/arrow-back.svg'

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isUpdateAtOpening, setIsUpdateAtOpening] = useState(false)
  const [isOtherOption, setIsOtherOption] = useState(false)

  return (
    <>
      <Link href='/plan' className='m-4 block w-fit text-dark-gray'>
        <BackIcon />
      </Link>
      <main className='flex flex-col items-center'>
        <div className='w-10/12 max-w-2xl'>
          <h1 className='py-8 text-4xl font-medium'>Paramètres</h1>
          <h2 className='pb-4 text-xl font-bold'>Options</h2>
          <div className='flex flex-col gap-6 pb-8'>
            <Option
              title='Dark Mode'
              isActivated={isDarkMode}
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
            <Option
              title='Raffraichir à chaque ouverture'
              isActivated={isUpdateAtOpening}
              onClick={() => setIsUpdateAtOpening(!isUpdateAtOpening)}
            />
            <Option
              title='Autre option folle'
              isActivated={isOtherOption}
              onClick={() => setIsOtherOption(!isOtherOption)}
            />
          </div>
          <h2 className='pb-4 text-xl font-bold'>EDTs</h2>
        </div>
      </main>
    </>
  )
}
