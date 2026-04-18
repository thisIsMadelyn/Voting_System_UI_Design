import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createReport, getInbox, getSent } from '../services/ReportsApi.js'

export function useInbox(userId) {
    return useQuery({
        queryKey: ['inbox', userId],
        queryFn: () => getInbox(userId),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    })
}

export function useSent(userId) {
    return useQuery({
        queryKey: ['sent', userId],
        queryFn: () => getSent(userId),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    })
}

export function useCreateReport() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createReport,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inbox'] })
            queryClient.invalidateQueries({ queryKey: ['sent'] })
        },
    })
}