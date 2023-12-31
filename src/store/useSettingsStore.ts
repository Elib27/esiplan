import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  lessonTypesDefaultColors,
  showTomorrowDefaultScheduleHour,
} from '@/constants'

type State = {
  darkMode: boolean
  selectedEdts: string[]
  currentEdt: string | undefined
  lessonTypesColors: typeof lessonTypesDefaultColors
  showNextDayScheduleHour: number
}

type Action = {
  toggleDarkMode: () => void
  setCurrentEdt: (edt: string) => void
  addSelectedEdt: (edt: string) => void
  modifySelectedEdt: (edt: string, index: number) => void
  removeSelectedEdt: (edt: string) => void
  modifyLessonTypeColor: (lessonType: LessonType, color: string) => void
  resetLessonTypeColor: () => void
  setShowNextDayScheduleHour: (hour: number) => void
}

export const useSettingsStore = create(
  persist<State & Action>(
    (set) => ({
      darkMode: false,
      selectedEdts: [],
      currentEdt: undefined,
      lessonTypesColors: lessonTypesDefaultColors,
      showNextDayScheduleHour: showTomorrowDefaultScheduleHour,
      toggleDarkMode: () =>
        set((state) => ({
          darkMode: !state.darkMode,
        })),
      setCurrentEdt: (edt) => set({ currentEdt: edt }),
      addSelectedEdt: (edt) =>
        set((state) => ({ selectedEdts: [...state.selectedEdts, edt] })),
      modifySelectedEdt: (edt, index) =>
        set((state) => {
          const newSelectedEdts = [...state.selectedEdts]
          newSelectedEdts[index] = edt
          return { selectedEdts: newSelectedEdts }
        }),
      removeSelectedEdt: (edt) =>
        set((state) => ({
          selectedEdts: state.selectedEdts.filter((e) => e !== edt),
        })),
      modifyLessonTypeColor: (lessonType: LessonType, color: string) =>
        set((state) => {
          return {
            lessonTypesColors: {
              ...state.lessonTypesColors,
              [lessonType]: color,
            },
          }
        }),
      resetLessonTypeColor: () => {
        for (const [lessonType, color] of Object.entries(
          lessonTypesDefaultColors
        )) {
          document.documentElement.style.setProperty(
            `--color-${lessonType.toLowerCase()}`,
            color
          )
        }
        set(() => ({ lessonTypesColors: lessonTypesDefaultColors }))
      },
      setShowNextDayScheduleHour: (hour: number) =>
        set(() => ({ showNextDayScheduleHour: hour })),
    }),
    {
      name: 'esiplan-settings-storage',
    }
  )
)
