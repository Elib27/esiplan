export default function Switch({
  isOn,
  onClick,
}: {
  isOn: boolean
  onClick: () => void
}) {
  return (
    <button
      className={`flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-xl transition-colors ${
        isOn ? 'bg-main-purple' : 'bg-light-purple'
      }`}
      onClick={onClick}
    >
      <div
        className={`mx-1 aspect-square h-4 rounded-full bg-white transition-transform ${
          isOn ? 'translate-x-4' : 'translate-x-0'
        }`}
      ></div>
    </button>
  )
}
