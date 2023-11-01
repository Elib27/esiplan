'use client'
import { useSettingsStore } from '@/store/useSettingsStore'
import useStore from '@/hooks/useStore'
import useGroups from '@/hooks/useGroups'
import ColorPickers from './colorPickers'
import Option from '@/components/settings/option'
import SelectedEdt from '@/components/settings/selectedEdt'
import AddIcon from '@/assets/add.svg'

export default function Settings() {
  const settingsStore = useStore(useSettingsStore, (state) => state)

  const { data: groups } = useGroups()

  if (!settingsStore || !groups) return null

  const isAddButtonVisible =
    settingsStore.selectedEdts.length < 3 &&
    !settingsStore.selectedEdts.includes('')

  return (
    <main className='flex flex-col items-center'>
      <div className='w-10/12 max-w-xl'>
        <h1 className='pb-8 pt-4 text-4xl font-medium transition-colors dark:text-white'>
          Paramètres
        </h1>
        <h2 className='pb-4 text-xl font-bold transition-colors dark:text-white'>
          Options
        </h2>
        <div className='flex flex-col gap-6 pb-10'>
          <Option
            title='Dark Mode'
            isActivated={settingsStore.darkMode}
            onClick={() => settingsStore.toggleDarkMode()}
          />
        </div>
        <h2 className='pb-4 text-xl font-bold transition-colors dark:text-white'>
          EDTs
        </h2>
        <div className='max-w flex w-full flex-col items-center gap-4 pb-10'>
          {settingsStore.selectedEdts.map((group, i) => (
            <SelectedEdt
              number={i + 1}
              group={group}
              groups={groups}
              key={group}
            />
          ))}
          {isAddButtonVisible && (
            <button
              className='flex-grow-0 rounded-full bg-light-purple p-2 active:scale-95'
              onClick={() => settingsStore.addSelectedEdt('')}
            >
              <AddIcon />
            </button>
          )}
        </div>
        <h2 className='pb-4 text-xl font-bold transition-colors dark:text-white'>
          Colors
        </h2>
        <ColorPickers />
      </div>
    </main>
  )
}
