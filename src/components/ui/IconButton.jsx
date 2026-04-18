import styles from './IconButton.module.css'

export default function IconButton({ children, hasNotification = false }) {
    return (
        <button className={styles.btn}>
            {children}
            {hasNotification && <span className={styles.dot} />}
        </button>
    )
}