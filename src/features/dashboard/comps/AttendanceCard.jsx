import Card from '../../../components/ui/Card'
import AttendanceBar from './AttendanceBar'
import styles from './AttendanceCard.module.css'

export default function AttendanceCard({ sessions }) {
    return (
        <Card title="Meeting Attendance" subtitle="Last 5 sessions" animDelay={380}>
            <div className={styles.wrap}>
                {sessions.map((session, i) => (
                    <AttendanceBar key={i} session={session} />
                ))}
            </div>
        </Card>
    )
}