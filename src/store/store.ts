import { create } from 'zustand'

type State = {
  darkMode: boolean
  selectedEdts: string[]
}

type Action = {
  toggleDarkMode: () => void
  addSelectedEdt: (edt: string) => void
  modifySelectedEdt: (edt: string, index: number) => void
  removeSelectedEdt: (edt: string) => void
}

const useStore = create<State & Action>((set) => ({
  darkMode: false,
  selectedEdts: ['3A-S1-TP1A', '3A-S1-TP1B'],
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
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
}))

export default useStore
