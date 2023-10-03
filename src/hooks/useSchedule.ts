import { useQuery } from '@tanstack/react-query'

export default function useSchedule(group: string) {
  return useQuery({
    queryKey: ['schedule', group],
    queryFn: () =>
      fetch(`http://localhost:3000/api/schedule?group=${group}`).then((res) =>
        res.json()
      ),
    staleTime: 1000 * 3600 * 6, // 6 hours
  })
}
