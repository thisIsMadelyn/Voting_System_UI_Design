import Icon from '../ui/Icon'
// import useAuthStore from '../../services/AuthStore'
import { useCurrentUserProfile } from '../../services/useUsers'
import styles from './SidebarUser.module.css'

export default function SidebarUser() {
    // const { logout } = useAuthStore()
    // Use the profile data from TanStack Query
    const { data: profile, isLoading } = useCurrentUserProfile()

    // Get initials from the username we know exists
    const getInitials = () => {
        if (profile?.username) {
            return profile.username.substring(0, 2).toUpperCase()
        }
        return '??'
    }

    // Display the username (matches HeroWelcome)
    const displayName = isLoading ? 'Loading...' : profile?.username || 'User'

    // Role badge - pulling from the profile object
    const roleDisplay = profile?.role === 'ADMIN' ? 'Admin' :
        profile?.role === 'MODERATOR' ? 'Moderator' :
            'Member'

    return (
        <div className={styles.footer}>
            <div className={styles.userCard}  title="Click to logout">
                <div className={styles.avatar}>{getInitials()}</div>
                <div className={styles.info}>
                    <div className={styles.name}>{displayName}</div>
                    <span className={styles.badge}>● {roleDisplay}</span>
                </div>
                <Icon name="moreHorizontal" size={14} className={styles.moreIcon} />
            </div>
        </div>
    )
}
// onClick={logout}