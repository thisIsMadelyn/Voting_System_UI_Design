import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnnouncement, getAllAnnouncements } from './AnnouncementsApi'

export function useAnnouncements() {
    return useQuery({
        queryKey: ['announcements'],
        queryFn: getAllAnnouncements,
        staleTime: 5 * 60 * 1000,
    })
}

export function useCreateAnnouncement() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createAnnouncement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['announcements'] })
        },
    })
}