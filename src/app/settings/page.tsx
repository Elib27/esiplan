'use client'
import Link from 'next/link'
import Option from '@/components/settings/option'
import SelectedEdt from '@/components/settings/selectedEdt'
import BackIcon from '@/assets/arrow-back.svg'
import AddIcon from '@/assets/add.svg'
import useStore from '@/store/store'

export default function SettingsPage() {
  const {
    isDarkMode,
    selectedEdts,
    toggleDarkMode,
    addSelectedEdt,
    removeSelectedEdt,
  } = useStore((state) => {
    return {
      isDarkMode: state.darkMode,
      selectedEdts: state.selectedEdts,
      toggleDarkMode: state.toggleDarkMode,
      addSelectedEdt: state.addSelectedEdt,
      removeSelectedEdt: state.removeSelectedEdt,
    }
  })

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
                key={group}
                number={i + 1}
                group={group}
                deleteEdt={() => removeSelectedEdt(group)}
              />
            ))}
          </div>
          {selectedEdts.length < 3 && (
            <div className='flex justify-center pt-4'>
              <button
                className='rounded-full bg-light-purple p-2 active:scale-95'
                onClick={() => addSelectedEdt('1A-TP2')}
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
