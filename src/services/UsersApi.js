// src/services/UsersApi.js
import client from './axiosClient'

// Export 1
export const getAll = async () => {
    const response = await client.get('/users')
    return response.data
}

// Export 2
export const getByUsername = async (username) => {
    const response = await client.get(`/users/user/username/${username}`)
    return response.data
}

// Export 3
export const getCurrentProfile = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.username) {
        // Notice we just call getByUsername directly now
        return await getByUsername(user.username)
    }
    throw new Error('No authenticated user')
}
