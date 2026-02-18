import styles from './HeroWelcome.module.css'
import WeatherWidget from './WeatherWigdet'

export default function HeroWelcome({ user, weather, date }) {
    const title = user.role === 'captain' ? 'Captain' : user.role === 'mod' ? 'Moderator' : ''
    const displayName = title ? `${title} ${user.name.split(' ')[1]}` : user.name

    return (
        <div className={styles.hero}>
            <div className={styles.glow} />
            <div className={styles.bar} />

            <div className={styles.left}>
                <p className={styles.greeting}>
                    <span className={styles.greetingLine} />
                    {date}
                </p>
                <h1 className={styles.title}>
                    Welcome back,<br />
                    <span className={styles.highlight}>{displayName}.</span>
                </h1>
                <p className={styles.subtitle}>
                    You have <strong>2 open polls</strong> awaiting member votes,{' '}
                    <strong>3 events</strong> this week, and one pending membership request.
                </p>
            </div>

            <WeatherWidget data={weather} />
        </div>
    )
}