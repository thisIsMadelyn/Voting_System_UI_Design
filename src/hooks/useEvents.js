import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    createEvent,
    getAllEvents,
    getEventById,
    getEventsByType,
    getEventsByDateRange,
    updateEvent,
    deleteEvent,
} from '../services/eventsApi'

export const useEvents = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: getAllEvents,
    })
}

export const useEventById = (id) => {
    return useQuery({
        queryKey: ['events', id],
        queryFn: () => getEventById(id),
        enabled: !!id,
    })
}

export const useEventsByType = (type) => {
    return useQuery({
        queryKey: ['events', 'type', type],
        queryFn: () => getEventsByType(type),
        enabled: !!type,
    })
}

export const useEventsByDateRange = (from, to) => {
    return useQuery({
        queryKey: ['events', 'range', from, to],
        queryFn: () => getEventsByDateRange(from, to),
        enabled: !!from && !!to,
    })
}

export const useCreateEvent = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] })
        },
    })
}

export const useUpdateEvent = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }) => updateEvent(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] })
        },
    })
}

export const useDeleteEvent = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] })
        },
    })
}
