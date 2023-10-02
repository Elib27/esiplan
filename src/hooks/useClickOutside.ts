import { useEffect, useRef } from 'react'

export default function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLElement>(null)
  const handleClickOutside = (event: Event) => {
    if (!ref.current?.contains(event.target as Node)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })
  return ref
}
