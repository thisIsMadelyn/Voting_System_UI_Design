import { useQuery } from '@tanstack/react-query'
import { getMembershipSummary, getCommitteesSummary } from '../services/MembersApi'

export function useMemberships() {
    return useQuery({
        queryKey: ['memberships'],
        queryFn: getMembershipSummary,
        staleTime: 5 * 60 * 1000,
    })
}

export function useCommittees() {
    return useQuery({
        queryKey: ['committees'],
        queryFn: getCommitteesSummary,
        staleTime: 5 * 60 * 1000,
    })
}