import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { attendanceApi } from './AttendanceApi'

export function useCheckIn() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ meetingId, userId }) => attendanceApi.checkIn(meetingId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] })
        },
    })
}

export function useAttendance(meetingId) {
    return useQuery({
        queryKey: ['attendance', meetingId],
        queryFn: () => attendanceApi.getSummary(meetingId),
        enabled: !!meetingId,
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