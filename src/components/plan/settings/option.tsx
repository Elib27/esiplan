import Switch from './switch'

export default function Option({
  title,
  isActivated,
  onClick,
}: {
  title: string
  isActivated: boolean
  onClick: () => void
}) {
  return (
    <div className='flex w-full items-center justify-between'>
      <span>{title}</span>
      <Switch isOn={isActivated} onClick={onClick} />
    </div>
  )
}
