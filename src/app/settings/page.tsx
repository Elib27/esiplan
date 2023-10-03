import Link from 'next/link'
import Settings from '@/components/settings'
// import BackIcon from '@/assets/arrow-back.svg'

async function getGroups() {
  const response = await fetch('http://localhost:3000/api/groups', {
    next: { revalidate: 3600 * 6 },
  })
  const groups: string[] = await response.json()
  return groups
}

export default async function SettingsPage() {
  const groups = await getGroups()

  return (
    <>
      <Link href='/' className='m-4 block w-fit text-dark-gray'>
        {/* <BackIcon /> */} retour
      </Link>
      <Settings groups={groups} />
    </>
  )
}
