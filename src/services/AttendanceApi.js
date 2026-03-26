import client from './axiosClient'

export const checkIn = async (data) => {
    const response = await client.post('/attendance_check', data)
    return response.data
}

export const getAttendanceByMeeting = async (meetingId, moderatorId) => {
    const response = await client.get(`/attendance_check/meeting/${meetingId}?moderatorId=${moderatorId}`)
    return response.data
}