import Icon from '../../../components/ui/Icon'
import styles from './StatCard.module.css'

export default function StatCard({stat, iconName, animDelay = 0}) {
    return (
        <div
            className={`${styles.card} ${styles[`color-${stat.color}`]}`}
            style={{animationDelay: `${animDelay}ms`}}
        >
            <div className={styles.bar}/>
            <div className={`${styles.icon} ${styles[`icon-${stat.color}`]}`}>
                <Icon name={iconName} size={16}/>
            </div>
            <p className={styles.label}>{stat.label}</p>
            <p className={styles.value}>{stat.value}</p>
            <span className={`${styles.delta} ${stat.deltaUp ? styles.deltaUp : styles.deltaDown}`}>
        {stat.delta}
      </span>
            <p className={styles.sub}>{stat.sub}</p>
        </div>
    )
}