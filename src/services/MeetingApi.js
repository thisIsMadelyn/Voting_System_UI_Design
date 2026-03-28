import client from './AxiosClient'

export const getActive = async () => {
    const response = await client.get('/general_meetings/active')
    return response.data
}

export const getAll = async () => {
    const response = await client.get('/general_meetings')
    return response.data
}