import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { checkIn, checkOut, getSummary } from '../services/AttendanceApi'

export function useCheckIn() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ meetingId, userId }) => checkIn(meetingId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] })
        },
    })
}

export function useAttendance(meetingId) {
    return useQuery({
        queryKey: ['attendance', meetingId],
        queryFn: () => getSummary(meetingId),
        enabled: !!meetingId,
    })
}

export function useCheckOut() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ meetingId, userId }) => checkOut({ meetingId, userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] })
        },
    })
}


// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { checkIn, getAttendanceByMeeting } from './AttendanceApi'
//
// export function useCheckIn() {
//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationFn: checkIn,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['attendance'] })
//         },
//     })
// }
//
// export function useAttendance(meetingId, moderatorId) {
//     return useQuery({
//         queryKey: ['attendance', meetingId],
//         queryFn: () => getAttendanceByMeeting(meetingId, moderatorId),
//         enabled: !!meetingId && !!moderatorId,
//     })
// }