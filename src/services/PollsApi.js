import client from './axiosClient'

export const createPoll = async ({ pollData, moderatorId }) => {
    const response = await client.post(`/polls?moderatorId=${moderatorId}`, pollData)
    return response.data
}

export const getAllPolls = async () => {
    const response = await client.get('/polls')
    return response.data
}