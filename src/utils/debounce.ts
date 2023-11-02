export default function debounce<T extends any[]>(
  func: (...args: T) => void,
  delay: number = 300
) {
  let timer: NodeJS.Timeout | null
  return function (...args: T) {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      func.apply(context, args)
    }, delay)
  }
}
