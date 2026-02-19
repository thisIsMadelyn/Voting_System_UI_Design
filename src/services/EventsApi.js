import client from './axiosClient'

export const createEvent = async (eventData) => {
    const response = await client.post('/events', eventData)
    return response.data
}

export const getEventById = async (id) => {
    const response = await client.get(`/events/eventById/${id}`)
    return response.data
}