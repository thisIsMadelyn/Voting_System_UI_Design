import { useEffect, useState } from 'react'
import styles from './AttendanceBar.module.css'

export default function AttendanceBar({ session }) {
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setAnimate(true), 450)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className={styles.row}>
            <span className={styles.label}>{session.label}</span>
            <div className={styles.barBg}>
                <div
                    className={styles.bar}
                    style={{
                        width: animate && session.pct ? `${session.pct}%` : '0%',
                        background: session.color
                    }}
                />
            </div>
            <span className={styles.pct}>
        {session.pct ? `${session.pct}%` : '—'}
      </span>
        </div>
    )
}