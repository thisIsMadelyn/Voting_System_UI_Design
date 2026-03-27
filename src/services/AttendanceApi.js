import client from './axiosClient'

export const attendanceApi = {
    checkIn: async (meetingId, userId) => {
        const response = await client.post('/attendance/check-in', {
            meetingId,
            userId,
            method: 'MANUAL',
        })
        return response.data
    },

    checkOut: async (meetingId, userId) => {
        const response = await client.post('/attendance/check-out', null, {
            params: { meetingId, userId },
        })
        return response.data
    },

    getSummary: async (meetingId) => {
        const response = await client.get(`/attendance/summary/${meetingId}`)
        return response.data
    },
}
// import client from './axiosClient'
//
export const checkIn = async (data) => {
    const response = await client.post('/attendance_check', data)
    return response.data
}

export const getAttendanceByMeeting = async (meetingId, moderatorId) => {
    const response = await client.get(`/attendance_check/meeting/${meetingId}?moderatorId=${moderatorId}`)
    return response.data
}