import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  darkMode: boolean
  selectedEdts: string[]
  currentEdt: string | undefined
}

type Action = {
  toggleDarkMode: () => void
  setCurrentEdt: (edt: string) => void
  addSelectedEdt: (edt: string) => void
  modifySelectedEdt: (edt: string, index: number) => void
  removeSelectedEdt: (edt: string) => void
}

export const useSettingsStore = create(
  persist<State & Action>(
    (set) => ({
      darkMode: false,
      selectedEdts: [],
      currentEdt: undefined,
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
    }),
    {
      name: 'esiplan-settings-storage',
    }
  )
)

// export const useSettingsStore = create<State & Action>((set) => ({
//   darkMode: false,
//   selectedEdts: ['3A-S1-TP1A'],
//   currentEdt: '3A-S1-TP1A',
//   toggleDarkMode: () =>
//     set((state) => ({
//       darkMode: !state.darkMode,
//     })),
//   setCurrentEdt: (edt) => set({ currentEdt: edt }),
//   addSelectedEdt: (edt) =>
//     set((state) => ({ selectedEdts: [...state.selectedEdts, edt] })),
//   modifySelectedEdt: (edt, index) =>
//     set((state) => {
//       const newSelectedEdts = [...state.selectedEdts]
//       newSelectedEdts[index] = edt
//       return { selectedEdts: newSelectedEdts }
//     }),
//   removeSelectedEdt: (edt) =>
//     set((state) => ({
//       selectedEdts: state.selectedEdts.filter((e) => e !== edt),
//     })),
// }))
