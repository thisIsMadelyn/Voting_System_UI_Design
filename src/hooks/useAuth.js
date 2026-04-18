import { authApi } from '../services/authApi'

export function useAuth() {
    const user = authApi.getCurrentUser()
    // loginProperty: 'USER' | 'MODERATOR' | 'ADMIN'
    const isPrivileged = ['MODERATOR', 'ADMIN'].includes(user?.role)
    const isAdmin = user?.role === 'ADMIN'
    return { user, isPrivileged, isAdmin }
}