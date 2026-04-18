import client from './axiosClient'

export const createReport = async (data) => {
    const response = await client.post('/reports', data)
    return response.data
}

export const getInbox = async (userId) => {
    const response = await client.get(`/reports/inbox/${userId}`)
    return response.data
}

export const getSent = async (userId) => {
    const response = await client.get(`/reports/sent/${userId}`)
    return response.data
}