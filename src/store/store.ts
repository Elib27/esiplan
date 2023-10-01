import { create } from 'zustand'

type State = {
  darkMode: boolean
  selectedEdts: string[]
}

type Action = {
  toggleDarkMode: () => void
  addSelectedEdt: (edt: string) => void
  removeSelectedEdt: (edt: string) => void
}

const useStore = create<State & Action>((set) => ({
  darkMode: false,
  selectedEdts: ['3A-TP1A', '3A-TP1B'],
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  addSelectedEdt: (edt) =>
    set((state) => ({ selectedEdts: [...state.selectedEdts, edt] })),
  removeSelectedEdt: (edt) =>
    set((state) => ({
      selectedEdts: state.selectedEdts.filter((e) => e !== edt),
    })),
}))

export default useStore
