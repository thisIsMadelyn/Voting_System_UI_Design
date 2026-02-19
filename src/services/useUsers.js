import { useQuery } from '@tanstack/react-query'
import { getAll, getByUsername, getCurrentProfile } from './UsersApi.js'

// Get all users
export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: getAll,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

// Get user by username
export function useUser(username) {
    return useQuery({
        queryKey: ['user', username],
        queryFn: () => getByUsername(username),
        enabled: !!username, // Only run if username is provided
        staleTime: 5 * 60 * 1000,
    })
}

// Get current user's full profile
export function useCurrentUserProfile() {
    return useQuery({
        queryKey: ['currentUserProfile'],
        queryFn: getCurrentProfile,
        staleTime: 10 * 60 * 1000, // 10 minutes
        retry: false,
    })
}