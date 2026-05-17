import client from './axiosClient'

export const createEvent = async (eventData) => {
    const response = await client.post('/events', eventData)
    return response.data
}

export const getAllEvents = async () => {
    const response = await client.get('/events')
    return response.data
}

export const getEventById = async (id) => {
    const response = await client.get(`/events/${id}`)
    return response.data
}

export const getEventsByType = async (type) => {
    const response = await client.get(`/events/type/${type}`)
    return response.data
}

export const getEventsByDateRange = async (from, to) => {
    const response = await client.get('/events/range', {
        params: { from, to }
    })
    return response.data
}

export const updateEvent = async (id, eventData) => {
    const response = await client.put(`/events/${id}`, eventData)
    return response.data
}

export const deleteEvent = async (id) => {
    const response = await client.delete(`/events/${id}`)
    return response.data
}