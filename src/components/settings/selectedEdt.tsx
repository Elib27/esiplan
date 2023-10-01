import CrossIcon from '@/assets/cross.svg'

export default function SelectedEdt({
  number,
  group,
  deleteEdt,
}: {
  number: number
  group: string
  deleteEdt: () => void
}) {
  return (
    <div className='flex items-center justify-between rounded-md bg-light-purple px-3 py-1.5'>
      <span className='text-dark-gray'>{number}.</span>
      <span>{group}</span>
      <button onClick={deleteEdt} className='rounded-full active:scale-90'>
        <CrossIcon />
      </button>
    </div>
  )
}
