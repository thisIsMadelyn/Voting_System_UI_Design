import Icon from '../ui/Icon'
import styles from './SidebarUser.module.css'

export default function SidebarUser() {
    return (
        <div className={styles.footer}>
            <div className={styles.userCard}>
                <div className={styles.avatar}>JD</div>
                <div className={styles.info}>
                    <div className={styles.name}>Jordan Davis</div>
                    <span className={styles.badge}>● Captain</span>
                </div>
                <Icon name="moreHorizontal" size={14} className={styles.moreIcon} />
            </div>
        </div>
    )
}