import { useSettingsStore } from '@/store/useSettingsStore'

export default function EdtNavigation({
  currentEdt,
  setCurrentEdt,
}: {
  currentEdt: string | undefined
  setCurrentEdt: (edt: string) => void
}) {
  const isSelectedStyle =
    "after:absolute after:left-0 after:top-0 after:h-[4px] after:rounded-b-md after:w-full after:bg-secondary-purple after:content-[''] dark:after:bg-light-purple text-secondary-purple dark:text-light-purple"

  const { selectedEdts } = useSettingsStore()

  return (
    <div className='flex gap-4'>
      {selectedEdts?.map((edt) => (
        <button
          className={`relative select-none pt-2 text-sm font-medium text-dark-gray sm:text-base ${
            edt === currentEdt ? isSelectedStyle : 'dark:text-secondary-purple'
          }`}
          onClick={() => setCurrentEdt(edt)}
          key={edt}
        >
          {edt}
        </button>
      ))}
    </div>
  )
}
