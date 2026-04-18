import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createPoll, getAllPolls } from '../services/PollsApi'

export function usePolls() {
    return useQuery({
        queryKey: ['polls'],
        queryFn: getAllPolls,
        staleTime: 5 * 60 * 1000,
    })
}

export function useCreatePoll() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createPoll,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['polls'] })
        },
    })
}