import styles from './Card.module.css'

export default function Card({ title, subtitle, action, children, animDelay = 0 }) {
    return (
        <div className={styles.card} style={{ animationDelay: `${animDelay}ms` }}>
            {(title || action) && (
                <div className={styles.header}>
                    <div>
                        {title && <div className={styles.title}>{title}</div>}
                        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
                    </div>
                    {action && <button className={styles.action}>{action}</button>}
                </div>
            )}
            {children}
        </div>
    )
}
