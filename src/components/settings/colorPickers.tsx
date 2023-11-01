import { useSettingsStore } from '@/store/useSettingsStore'
import debounce from '@/utils/debounce'

export default function ColorPickers() {
  const { lessonTypesColors, modifyLessonTypeColor } = useSettingsStore()

  const debouncedModifyLessonTypeColor = debounce(modifyLessonTypeColor, 300)

  if (!lessonTypesColors) return null

  return (
    <ul className='flex flex-col gap-4'>
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
              className='cursor-pointer'
            />
            <label
              htmlFor={lessonType}
              className='transition-colors dark:text-white'
            >
              {lessonType}
            </label>
          </li>
        )
      )}
    </ul>
  )
}
