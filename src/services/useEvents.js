import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createEvent, getEventById } from './EventsApi'

export function useEvent(id) {
    return useQuery({
        queryKey: ['event', id],
        queryFn: () => getEventById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    })
}

export function useCreateEvent() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['event'] })
        },
    })
}