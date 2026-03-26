import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { checkIn, getAttendanceByMeeting } from './AttendanceApi'

export function useCheckIn() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: checkIn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] })
        },
    })
}

export function useAttendance(meetingId, moderatorId) {
    return useQuery({
        queryKey: ['attendance', meetingId],
        queryFn: () => getAttendanceByMeeting(meetingId, moderatorId),
        enabled: !!meetingId && !!moderatorId,
    })
}