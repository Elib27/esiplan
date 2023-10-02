import { RefObject, useState } from 'react'
import useStore from '@/store/store'
import useClickOutside from '@/hooks/useClickOutside'
import CrossIcon from '@/assets/cross.svg'

export default function SelectedEdt({
  number,
  group,
}: {
  number: number
  group: string
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

  const groups = [
    '1A-TP1',
    '1A-TP2',
    '1A-TP3',
    '1A-TP4',
    '2A-TP1',
    '2A-TP2',
    '2A-TP3',
    '2A-TP4',
    '3A-TP1',
    '3A-TP2',
    '3A-TP3',
    '3A-TP4',
    '4A-TP1',
    '4A-TP2',
    '4A-TP3',
    '4A-TP4',
    '5A-TP1',
    '5A-TP2',
    '5A-TP3',
    '5A-TP4',
  ]

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
        <span className='font-medium'>{group || 'Sélectionner un EDT'}</span>
        <button
          onClick={() => removeSelectedEdt(group)}
          className='rounded-full transition-colors hover:bg-main-purple/20 active:scale-90'
        >
          <CrossIcon />
        </button>
      </div>
      <div className='relative w-full'>
        <ul
          className={`${
            isDropDownOpen ? 'absolute' : 'hidden'
          } bg-very-light-gray left-0 top-0 flex max-h-80 w-full flex-col gap-1 overflow-y-scroll rounded-b-md p-2`}
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
