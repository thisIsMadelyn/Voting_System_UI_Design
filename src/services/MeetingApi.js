import client from './axiosClient'

export const meetingApi = {
    getActive: async () => {
        const response = await client.get('/meetings/active')
        return response.data
    },
}