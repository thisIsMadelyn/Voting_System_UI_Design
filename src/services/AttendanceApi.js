import client from './axiosClient'

export const checkIn = async ({ meetingId, userId, roundId }) => {
    const response = await client.post('/attendance_check/check-in', {
        meetingId,
        userId,
        roundId: roundId ?? null,
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

export const getRound = async (meetingId) => {
    const response = await client.get(`/attendance_rounds/meeting/${meetingId}`)
    return response.data
}

export const createRound = async (meetingId) => {
    const response = await client.post(`/attendance_rounds?meetingId=${meetingId}`)
    return response.data
}

export const deleteRound = async (roundId) => {
    const response = await client.delete(`/attendance_rounds/${roundId}`)
    return response.data
}

export const getByRound = async (roundId) => {
    const response = await client.get(`/attendance_check/by-round/${roundId}`)
    return response.data
}