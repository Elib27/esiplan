import { useSettingsStore } from '@/store/useSettingsStore'
// import useStore from '@/hooks/useStore'

export default function EdtNavigation({
  currentEdt,
  setCurrentEdt,
}: {
  currentEdt: string | undefined
  setCurrentEdt: (edt: string) => void
}) {
  const isSelectedStyle =
    "after:absolute after:left-0 after:top-0 after:h-[2px] after:w-full after:bg-main-purple after:content-['']"

  const { selectedEdts } = useSettingsStore()

  return (
    <div className='flex gap-4'>
      {selectedEdts?.map((edt) => (
        <button
          className={`relative select-none pt-2 transition-colors dark:text-white ${
            edt === currentEdt ? isSelectedStyle : null
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
