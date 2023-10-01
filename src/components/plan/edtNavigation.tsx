import { useState } from 'react'

export default function EdtNavigation() {
  const [selectedEdt, setSelectedEdt] = useState('3A-TP1A')

  const isSelectedStyle =
    "after:absolute after:left-0 after:top-0 after:h-[2px] after:w-full after:bg-main-purple after:content-['']"

  const EDTs = ['3A-TP1A', '3A-TP2A', '2A-TP1']

  return (
    <div className='flex gap-4'>
      {EDTs.map((edt) => (
        <button
          className={`relative select-none pt-2 ${
            edt === selectedEdt ? isSelectedStyle : null
          }`}
          onClick={() => setSelectedEdt(edt)}
          key={edt}
        >
          {edt}
        </button>
      ))}
    </div>
  )
}
