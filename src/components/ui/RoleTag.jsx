import styles from './RoleTag.module.css'

export default function RoleTag({ role = 'member' }) {
    const variant = role.toLowerCase()
    return (
        <span className={`${styles.tag} ${styles[variant]}`}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
    )
}