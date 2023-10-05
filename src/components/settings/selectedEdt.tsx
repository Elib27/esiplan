import type { RefObject } from 'react'
import { useState } from 'react'
import { useSettingsStore } from '@/store/useSettingsStore'
import useClickOutside from '@/hooks/useClickOutside'
import CrossIcon from '@/assets/cross.svg'

export default function SelectedEdt({
  number,
  group,
  groups,
}: {
  number: number
  group: string
  groups: string[]
}) {
  const {
    currentEdt,
    selectedEdts,
    setCurrentEdt,
    modifySelectedEdt,
    removeSelectedEdt,
  } = useSettingsStore()

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const unselectedGroups = groups.filter((g) => !selectedEdts.includes(g))

  function updateCurrentEdtWhenRemove(edtToRemove: string) {
    if (currentEdt !== edtToRemove) return
    const newSelectedEdts = selectedEdts.filter((e) => e !== edtToRemove)
    if (newSelectedEdts.length === 0) setCurrentEdt('')
    else setCurrentEdt(newSelectedEdts[0])
  }

  function handleClickRemoveEdt(edtToRemove: string) {
    updateCurrentEdtWhenRemove(edtToRemove)
    removeSelectedEdt(edtToRemove)
  }

  function handleClickSelectEdt(newEdt: string) {
    if (group === currentEdt || selectedEdts.length <= 1) setCurrentEdt(newEdt)
    modifySelectedEdt(newEdt, number - 1)
    setIsDropDownOpen(false)
  }

  const containerRef = useClickOutside(() => setIsDropDownOpen(false))

  return (
    <div ref={containerRef as RefObject<HTMLDivElement>}>
      <div
        className={`${
          isDropDownOpen ? 'rounded-t-md' : 'rounded-md'
        } flex items-center justify-between bg-light-purple px-3 py-1.5`}
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
      >
        <span className='text-dark-gray'>{number}.</span>
        <span className="relative cursor-pointer select-none font-medium after:absolute after:-right-4 after:top-1/2 after:-translate-y-1/2 after:border-x-[6px] after:border-t-8 after:border-x-light-purple after:border-t-dark-gray after:content-['']">
          {group || 'Sélectionner un groupe'}
        </span>
        <button
          onClick={() => handleClickRemoveEdt(group)}
          className='rounded-full transition-colors hover:bg-main-purple/20 active:scale-90'
        >
          <CrossIcon />
        </button>
      </div>
      <div className='relative z-10 w-full'>
        <ul
          className={`${
            isDropDownOpen ? 'absolute' : 'hidden'
          } left-0 top-0 flex max-h-80 w-full flex-col gap-1 overflow-y-scroll rounded-b-md bg-very-light-gray p-2`}
        >
          {unselectedGroups.map((g) => (
            <li
              className='cursor-pointer hover:text-main-purple'
              onClick={() => handleClickSelectEdt(g)}
              key={g}
            >
              {g}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
