import { useMemo } from 'react'
import { useSettingsStore } from '@/store/useSettingsStore'
import debounce from '@/utils/debounce'

export default function ColorPickers() {
  const { lessonTypesColors, modifyLessonTypeColor, resetLessonTypeColor } =
    useSettingsStore()

  const debouncedModifyLessonTypeColor = useMemo(
    () => debounce(modifyLessonTypeColor, 300),
    [modifyLessonTypeColor]
  )

  if (!lessonTypesColors) return null

  return (
    <>
      <ul className='flex flex-col gap-4 pb-6'>
        {(Object.entries(lessonTypesColors) as [LessonType, string][]).map(
          ([lessonType, color]) => (
            <li className='flex items-center gap-2' key={lessonType}>
              <input
                type='color'
                name={lessonType}
                id={lessonType}
                value={color}
                onChange={(e) =>
                  debouncedModifyLessonTypeColor(lessonType, e.target.value)
                }
                className='h-7 cursor-pointer rounded-sm'
              />
              <label
                htmlFor={lessonType}
                className='font-medium transition-colors dark:text-white'
              >
                {lessonType}
              </label>
            </li>
          )
        )}
      </ul>
      <button
        onClick={resetLessonTypeColor}
        className='rounded-md bg-light-purple px-4 py-1 font-medium text-dark-purple transition-colors active:scale-95'
      >
        Couleurs par défaut
      </button>
    </>
  )
}
