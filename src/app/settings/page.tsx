import Link from 'next/link'
import Settings from '@/components/settings'
// import BackIcon from '@/assets/arrow-back.svg'

export default async function SettingsPage() {
  return (
    <>
      <Link href='/' className='m-4 block w-fit text-dark-gray'>
        {/* <BackIcon /> */} retour
      </Link>
      <Settings />
    </>
  )
}
