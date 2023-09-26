import Schedule from '@/components/plan/schedule'

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
    <>
      <h1 className='py-8 text-center text-4xl font-bold'>Emploi du temps</h1>
      <Schedule lessons={lessons} />
    </>
  )
}
