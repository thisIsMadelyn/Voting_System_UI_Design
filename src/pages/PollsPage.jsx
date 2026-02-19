import useAuthStore from '../services/AuthStore'
import PollCreationCard from '../../src/features/dashboard/comps/PollCreationCard'

export default function PollsPage() {
    const { user } = useAuthStore()

    return (
        <div>
            <PollCreationCard moderatorId={user.userId} />
        </div>
    )
}