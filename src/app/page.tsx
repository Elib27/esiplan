import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className='text-bold py-8 text-center text-4xl'>ESIPLAN</h1>
      <Link href='/plan' className='block text-center'>
        Aller au planning
      </Link>
    </>
  )
}
