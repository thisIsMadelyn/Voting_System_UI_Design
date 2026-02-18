import styles from './WeatherWigdet.module.css'

export default function WeatherWidget({ data }) {
    return (
        <div className={styles.widget}>
            <p className={styles.location}>📍 {data.location}</p>
            <div className={styles.main}>
                <span className={styles.icon}>{data.icon}</span>
                <div>
          <span className={styles.temp}>
            {data.temp}
              <sup className={styles.unit}>°{data.unit}</sup>
          </span>
                </div>
            </div>
            <p className={styles.condition}>{data.condition}</p>
            <div className={styles.forecast}>
                {data.forecast.map(f => (
                    <div key={f.day} className={styles.day}>
                        <span className={styles.dayName}>{f.day}</span>
                        <span className={styles.dayTemp}>{f.high}°</span>
                        <span className={styles.dayRain}>{f.icon} {f.rainChance}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}