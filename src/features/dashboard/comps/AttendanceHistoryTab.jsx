import { useEffect, useState } from 'react'
import { getAll as getAllMeetings } from '../../../services/MeetingApi'
import { getSummary } from '../../../services/AttendanceApi'
import styles from './AttendanceHistoryTab.module.css'

export default function AttendanceHistoryTab() {
    const [meetings, setMeetings] = useState([])
    const [summaries, setSummaries] = useState({})
    const [expanded, setExpanded] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const all = await getAllMeetings()
                const past = all.filter(m => !m.isActive)
                setMeetings(past)
            } catch {
                setError('Failed to load meeting history.')
            } finally {
                setLoading(false)
            }
        }
        fetchMeetings()
    }, [])

    const toggleExpand = async (meetingId) => {
        if (expanded === meetingId) {
            setExpanded(null)
            return
        }
        setExpanded(meetingId)
        if (summaries[meetingId]) return
        try {
            const summary = await getSummary(meetingId)
            setSummaries(prev => ({ ...prev, [meetingId]: summary }))
        } catch {
            setSummaries(prev => ({ ...prev, [meetingId]: [] }))
        }
    }

    if (loading) return <p className={styles.state}>Loading history...</p>
    if (error) return <p className={styles.stateError}>{error}</p>
    if (meetings.length === 0) return (
        <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🗂️</span>
            <p>No past meetings found.</p>
        </div>
    )

    return (
        <div className={styles.wrapper}>
            {meetings.map(meeting => {
                const isOpen = expanded === meeting.id
                const summary = summaries[meeting.id]

                return (
                    <div key={meeting.id} className={styles.card}>
                        <button
                            className={styles.cardHeader}
                            onClick={() => toggleExpand(meeting.id)}
                        >
                            <div className={styles.cardInfo}>
                                <span className={styles.cardTitle}>
                                    {meeting.title ?? `Meeting #${meeting.id}`}
                                </span>
                                <span className={styles.cardDate}>
                                    {meeting.date ?? '—'}
                                </span>
                            </div>
                            <div className={styles.cardRight}>
                                <span className={styles.cardCount}>
                                    {meeting.attendeeCount ?? '?'} attendees
                                </span>
                                <span className={styles.chevron}>{isOpen ? '▲' : '▼'}</span>
                            </div>
                        </button>

                        {isOpen && (
                            <div className={styles.cardBody}>
                                {!summary ? (
                                    <p className={styles.state}>Loading...</p>
                                ) : summary.length === 0 ? (
                                    <p className={styles.state}>No attendance records for this meeting.</p>
                                ) : (
                                    <table className={styles.table}>
                                        <thead>
                                        <tr>
                                            <th>Member</th>
                                            <th>Check In</th>
                                            <th>Check Out</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {summary.map(record => (
                                            <tr key={record.userId}>
                                                <td>{record.fullName ?? record.username ?? record.userId}</td>
                                                <td className={styles.mono}>{record.checkInTime ?? '—'}</td>
                                                <td className={styles.mono}>{record.checkOutTime ?? '—'}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}