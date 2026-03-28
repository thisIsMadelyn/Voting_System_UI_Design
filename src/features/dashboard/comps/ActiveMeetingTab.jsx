import { useEffect, useState } from 'react'
// import { getActive } from '../../../services/MeetingApi'
import { getActive } from '../../../services/MeetingApi'
import { checkIn, checkOut, getSummary } from '../../../services/AttendanceApi'
import { getAll } from '../../../services/UsersApi'
import styles from './ActiveMeetingTab.module.css'

export default function ActiveMeetingTab() {
    const [meeting, setMeeting] = useState(null)
    const [users, setUsers] = useState([])
    const [attended, setAttended] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [actionLoading, setActionLoading] = useState(null)

    const fetchData = async () => {
        try {
            setError(null)
            const [activeMeeting, allUsers] = await Promise.all([
                getActive(),
                getAll(),
            ])
            setMeeting(activeMeeting)

            const summary = await getSummary(activeMeeting.id)
            setAttended(summary.map(a => ({
                userId: a.userId,
                checkedOut: !!a.checkOutTime,
            })))
            setUsers(allUsers)
        } catch (err) {
            if (err?.response?.status === 404) {
                setMeeting(null)
            } else {
                setError('Failed to load meeting data.')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const getStatus = (userId) => {
        const record = attended.find(a => a.userId === userId)
        if (!record) return 'absent'
        if (record.checkedOut) return 'out'
        return 'in'
    }

    const handleCheckIn = async (userId) => {
        setActionLoading(userId + '_in')
        try {
            await checkIn({ meetingId: meeting.id, userId })
            await fetchData()
        } catch (err) {
            console.error('Check-in failed', err)
        } finally {
            setActionLoading(null)
        }
    }

    const handleCheckOut = async (userId) => {
        setActionLoading(userId + '_out')
        try {
            await checkOut({ meetingId: meeting.id, userId })
            await fetchData()
        } catch (err) {
            console.error('Check-out failed', err)
        } finally {
            setActionLoading(null)
        }
    }

    if (loading) return <p className={styles.state}>Loading...</p>
    if (error) return <p className={styles.stateError}>{error}</p>
    if (!meeting) return (
        <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📋</span>
            <p>No active meeting right now.</p>
        </div>
    )

    const checkedInCount = attended.filter(a => !a.checkedOut).length

    return (
        <div className={styles.wrapper}>
            <div className={styles.meetingCard}>
                <div className={styles.meetingInfo}>
                    <span className={styles.meetingLabel}>Active Meeting</span>
                    <span className={styles.meetingTitle}>{meeting.title ?? `Meeting #${meeting.id}`}</span>
                </div>
                <div className={styles.meetingMeta}>
                    <span className={styles.badge}>{checkedInCount} / {users.length} checked in</span>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Member</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => {
                        const status = getStatus(user.id)
                        return (
                            <tr key={user.id}>
                                <td className={styles.nameCell}>
                                    <span className={styles.name}>{user.fullName ?? user.username}</span>
                                    <span className={styles.username}>@{user.username}</span>
                                </td>
                                <td>
                                        <span className={styles[`role_${String(user.role ?? '').toLowerCase()}`] ?? styles.roleDefault}>
                                            {user.role}
                                        </span>
                                </td>
                                <td>
                                        <span className={`${styles.status} ${styles[`status_${status}`]}`}>
                                            {status === 'in' ? 'Checked In' : status === 'out' ? 'Checked Out' : 'Absent'}
                                        </span>
                                </td>
                                <td className={styles.actions}>
                                    <button
                                        className={styles.btnIn}
                                        disabled={status === 'in' || status === 'out' || actionLoading !== null}
                                        onClick={() => handleCheckIn(user.id)}
                                    >
                                        {actionLoading === user.id + '_in' ? '...' : 'Check In'}
                                    </button>
                                    <button
                                        className={styles.btnOut}
                                        disabled={status !== 'in' || actionLoading !== null}
                                        onClick={() => handleCheckOut(user.id)}
                                    >
                                        {actionLoading === user.id + '_out' ? '...' : 'Check Out'}
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}