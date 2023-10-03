import type { RefObject } from 'react'
import { useState } from 'react'
import useStore from '@/store/store'
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
  const { selectedEdts, modifySelectedEdt, removeSelectedEdt } = useStore(
    (state) => {
      return {
        selectedEdts: state.selectedEdts,
        modifySelectedEdt: state.modifySelectedEdt,
        removeSelectedEdt: state.removeSelectedEdt,
      }
    }
  )

  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const unselectedGroups = groups.filter((g) => !selectedEdts.includes(g))

  function handleClickSelectEdt(edt: string) {
    modifySelectedEdt(edt, number - 1)
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
        <span className="after:border-x-1 after:border-t-1 after:border-x-transparent relative cursor-pointer font-medium after:absolute after:-right-2 after:top-1/2 after:h-1 after:w-1 after:-translate-y-1/2 after:border-t-dark-gray after:bg-dark-gray after:content-['']">
          {group || 'Sélectionner un groupe'}
        </span>
        <button
          onClick={() => removeSelectedEdt(group)}
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
