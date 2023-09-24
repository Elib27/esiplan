import { useQuery } from '@tanstack/react-query'

async function getPlanning() {
  const res = await fetch('http://localhost:3000/api/lessons')
  const data = res.json()
  return data
}

export default function usePlanning() {
  return useQuery({
    queryKey: ['planning'],
    queryFn: () => getPlanning(),
  })
}
