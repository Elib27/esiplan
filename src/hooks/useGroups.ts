import { useQuery } from '@tanstack/react-query'

async function getGroups() {
  try {
    const response = await fetch('http://localhost:3000/api/groups')
    if (!response.ok) {
      throw new Error('Failed to fetch groups')
    }
    const groups: string[] = await response.json()
    return groups
  } catch (error) {
    console.error(error)
  }
}

export default function useGroups() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroups(),
    staleTime: 1000 * 3600 * 12, // 12 hours
  })
}
