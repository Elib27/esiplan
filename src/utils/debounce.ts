export default function debounce(
  func: (...args: any) => void,
  delay: number = 300
) {
  let timer: NodeJS.Timeout | null
  return function (...args: any[]) {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      func.apply(context, args)
    }, delay)
  }
}
