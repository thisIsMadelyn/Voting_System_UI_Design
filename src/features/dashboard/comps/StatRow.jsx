import styles from './StatRow.module.css'
import StatCard from './StatCard'

export default function StatsRow({ stats }) {
    return (
        <div className={styles.row}>
            {stats.map((stat, i) => (
                <StatCard
                    key={stat.id}
                    stat={stat}
                    iconName={stat.icon}
                    animDelay={80 + i * 50}
                />
            ))}
        </div>
    )
}
