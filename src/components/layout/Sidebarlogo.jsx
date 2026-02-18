import styles from './SidebarLogo.module.css'

export default function SidebarLogo() {
    return (
        <div className={styles.logo}>
            <div className={styles.crest}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6BAE78" strokeWidth="1.8">
                    <path d="M12 2L3 7l9 5 9-5-9-5z"/>
                    <path d="M3 12l9 5 9-5"/>
                    <path d="M3 17l9 5 9-5"/>
                </svg>
            </div>
            <div>
                <div className={styles.name}>Student Council</div>
                <div className={styles.sub}>2025 — 2026</div>
            </div>
        </div>
    )
}