import { Dispatch, SetStateAction } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'
import { registerLocale } from 'react-datepicker'
import fr from 'date-fns/locale/fr'

registerLocale('fr', fr)

export default function datePicker({
  scheduleDate,
  setScheduleDate,
  setIsDatePickerOpen,
}: {
  scheduleDate: Date
  setScheduleDate: Dispatch<SetStateAction<Date>>
  setIsDatePickerOpen: Dispatch<SetStateAction<boolean>>
}) {
  function handleDateChange(date: Date) {
    setScheduleDate(date)
    setIsDatePickerOpen(false)
  }

  return (
    <div className='z-99 absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-light-purple/75 transition-colors dark:bg-dark-gray/75'>
      <DatePicker
        selected={scheduleDate}
        inline
        onChange={handleDateChange}
        locale='fr'
        onClickOutside={() => setIsDatePickerOpen(false)}
      />
    </div>
  )
}
