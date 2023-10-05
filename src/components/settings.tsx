'use client'
import { useSettingsStore } from '@/store/useSettingsStore'
import useStore from '@/hooks/useStore'
import Option from '@/components/settings/option'
import SelectedEdt from '@/components/settings/selectedEdt'
import AddIcon from '@/assets/add.svg'

export default function Settings({ groups }: { groups: string[] }) {
  const settingsStore = useStore(useSettingsStore, (state) => state)

  if (!settingsStore) return null

  const isAddButtonVisible =
    settingsStore.selectedEdts.length < 3 &&
    !settingsStore.selectedEdts.includes('')

  return (
    <main className='flex flex-col items-center'>
      <div className='w-10/12 max-w-xl'>
        <h1 className='pb-8 pt-4 text-4xl font-medium'>Paramètres</h1>
        <h2 className='pb-4 text-xl font-bold'>Options</h2>
        <div className='flex flex-col gap-6 pb-10'>
          <Option
            title='Dark Mode'
            isActivated={settingsStore.darkMode}
            onClick={() => settingsStore.toggleDarkMode()}
          />
        </div>
        <h2 className='pb-4 text-xl font-bold'>EDTs</h2>
        <div className='max-w flex w-full flex-col gap-4'>
          {settingsStore.selectedEdts.map((group, i) => (
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
              onClick={() => settingsStore.addSelectedEdt('')}
            >
              <AddIcon />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
