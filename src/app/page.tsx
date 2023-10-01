import Schedule from '@/components/schedule'

async function getPlanning() {
  const res = await fetch('http://localhost:3000/api/lessons', {
    next: { revalidate: 3600 * 6 },
  })
  const lessons = await res.json()
  return lessons
}

export default async function SchedulePage() {
  const lessons = await getPlanning()

  return (
    <main className='flex h-screen flex-col overflow-hidden'>
      <Schedule lessons={lessons} />
    </main>
  )
}
