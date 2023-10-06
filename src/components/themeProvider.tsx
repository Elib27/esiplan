'use client'
import { useEffect } from 'react'
import { useSettingsStore } from '@/store/useSettingsStore'

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const darkMode = useSettingsStore((state) => state.darkMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return <>{children}</>
}
