'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Option from '@/components/settings/option'
import SelectedEdt from '@/components/settings/selectedEdt'
import BackIcon from '@/assets/arrow-back.svg'
import AddIcon from '@/assets/add.svg'
import useStore from '@/store/store'

export default function SettingsPage() {
  const { isDarkMode, selectedEdts, toggleDarkMode, addSelectedEdt } = useStore(
    (state) => {
      return {
        isDarkMode: state.darkMode,
        selectedEdts: state.selectedEdts,
        toggleDarkMode: state.toggleDarkMode,
        addSelectedEdt: state.addSelectedEdt,
      }
    }
  )

  const [groups, setGroups] = useState<string[]>([])

  useEffect(() => {
    async function getGroups() {
      const response = await fetch('/api/groups', {
        next: { revalidate: 3600 * 6 },
      })
      const groupsData = await response.json()
      setGroups(groupsData)
    }
    getGroups()
  }, [])

  const isAddButtonVisible =
    selectedEdts.length < 3 && !selectedEdts.includes('')

  return (
    <>
      <Link href='/' className='m-4 block w-fit text-dark-gray'>
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
              onClick={() => toggleDarkMode()}
            />
          </div>
          <h2 className='pb-4 text-xl font-bold'>EDTs</h2>
          <div className='max-w flex w-full flex-col gap-4'>
            {selectedEdts.map((group, i) => (
              <SelectedEdt
                number={i + 1}
                group={group}
                groups={groups}
                key={group}
              />
            ))}
          </div>
          {isAddButtonVisible && (
            <div className='flex justify-center pt-4'>
              <button
                className='rounded-full bg-light-purple p-2 active:scale-95'
                onClick={() => addSelectedEdt('')}
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
