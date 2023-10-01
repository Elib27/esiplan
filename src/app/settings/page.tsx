'use client'
import Link from 'next/link'
import { useState } from 'react'
import Option from '@/components/plan/settings/option'
import SelectedEdt from '@/components/plan/settings/selectedEdt'
import BackIcon from '@/assets/arrow-back.svg'
import AddIcon from '@/assets/add.svg'

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isUpdateAtOpening, setIsUpdateAtOpening] = useState(false)
  const [isOtherOption, setIsOtherOption] = useState(false)
  const [selectedEdts, setSelectedEdts] = useState<string[]>([
    '3A-TP1A',
    '3A-TP1B',
  ])

  function deleteEdt(group: string) {
    const newSelectedEdts = selectedEdts.filter((edt) => edt !== group)
    setSelectedEdts(newSelectedEdts)
  }

  return (
    <>
      <Link href='/plan' className='m-4 block w-fit text-dark-gray'>
        <BackIcon />
      </Link>
      <main className='flex flex-col items-center'>
        <div className='w-10/12 max-w-xl'>
          <h1 className='pb-8 pt-4 text-4xl font-medium'>Paramètres</h1>
          <h2 className='pb-4 text-xl font-bold'>Options</h2>
          <div className='flex flex-col gap-6 pb-10'>
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
          <div className='max-w flex w-full flex-col gap-4'>
            {selectedEdts.map((group, i) => (
              <SelectedEdt
                key={group}
                number={i + 1}
                group={group}
                deleteEdt={() => deleteEdt(group)}
              />
            ))}
          </div>
          {selectedEdts.length < 3 && (
            <div className='flex justify-center pt-4'>
              <button
                className='rounded-full bg-light-purple p-2 active:scale-95'
                onClick={() => setSelectedEdts([...selectedEdts, '1A-TP2'])}
              >
                <AddIcon />
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
