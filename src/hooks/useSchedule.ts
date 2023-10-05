import { useQuery } from '@tanstack/react-query'

async function getGroupSchedule(group: string | undefined) {
  const response = await fetch(
    `http://localhost:3000/api/schedule?group=${group}`
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch schedule: ${group}`)
  }
  const schedule = await response.json()
  return schedule
}

export default function useSchedule(group: string | undefined) {
  return useQuery({
    queryKey: ['schedule', group],
    queryFn: () => getGroupSchedule(group),
    staleTime: 1000 * 3600 * 12, // 12 hours
    enabled: !!group,
  })
}
