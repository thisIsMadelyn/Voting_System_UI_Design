import client from './axiosClient'

export const authApi = {
    // Register new user
    register: async (userData) => {
        const response = await client.post('/auth/register', userData)
        return response.data // { message, userId, username }
    },

    // Login
    login: async (credentials) => {
        const response = await client.post('/auth/login', credentials)
        const { token, username, role, userId, loginProperty } = response.data

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify({ username, role, userId, loginProperty }))

        return response.data
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user')
        return userStr ? JSON.parse(userStr) : null
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token')
    },
}