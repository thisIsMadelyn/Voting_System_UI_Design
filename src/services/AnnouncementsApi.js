import client from './axiosClient'

export const createAnnouncement = async (data) => {
    const response = await client.post('/announcements', data)
    return response.data
}

export const getAllAnnouncements = async () => {
    const response = await client.get('/announcements')
    return response.data
}
export const deleteAnnouncement = async (id) => {
    await client.delete(`/announcements/${id}`)
}