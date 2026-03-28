import client from './axiosClient'

export const checkIn = async ({ meetingId, userId }) => {
    const response = await client.post('/attendance_check/check-in', {
        meetingId,
        userId,
        method: 'MANUAL',
    })
    return response.data
}

export const checkOut = async ({ meetingId, userId }) => {
    const response = await client.post('/attendance_check/check-out', null, {
        params: { meetingId, userId },
    })
    return response.data
}

export const getSummary = async (meetingId) => {
    const response = await client.get(`/attendance_check/by-meeting/${meetingId}`)
    return response.data
}

// import client from './axiosClient'
//
// export const checkIn = async ({ meetingId, userId }) => {
//     const response = await client.post('/attendance/check-in', {
//         meetingId,
//         userId,
//         method: 'MANUAL',
//     })
//     return response.data
// }
//
// export const checkOut = async ({ meetingId, userId }) => {
//     const response = await client.post('/attendance/check-out', null, {
//         params: { meetingId, userId },
//     })
//     return response.data
// }
//
// export const getSummary = async (meetingId) => {
//     const response = await client.get(`/attendance/summary/${meetingId}`)
//     return response.data
// }