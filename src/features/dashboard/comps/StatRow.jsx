import Icon from '../../../components/ui/Icon'
import styles from './StatRow.module.css'
import StatCard from './StatCard'

const iconMap = {
    users: 'users',
    calendar: 'calendar',
    check: 'check',
    activity: 'activity',
}

export default function StatsRow({ stats }) {
    return (
        <div className={styles.row}>
            {stats.map((stat, i) => (
                <StatCard
                    key={stat.id}
                    stat={stat}
                    iconName={iconMap[stat.icon]}
                    animDelay={80 + i * 50}
                />
            ))}
        </div>
    )
}
