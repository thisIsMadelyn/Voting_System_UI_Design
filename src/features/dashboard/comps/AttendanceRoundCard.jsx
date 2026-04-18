import { useEffect, useState } from "react";
import { checkIn, checkOut, getByRound } from "../../../services/AttendanceApi.js";
import styles from './AttendanceRoundCard.module.css'

export default function AttendanceRoundCard({ round, users, meetingId, defaultExpanded, onDelete }) {

    const [expanded, setExpanded] = useState(defaultExpanded)
    const [records, setRecords] = useState([])
    const [actionLoading, setActionLoading] = useState(null) // FIX 1: null not false
    const [loadingRecords, setLoadingRecords] = useState(false)

    const fetchRecords = async () => {
        setLoadingRecords(true) // FIX 2: use loadingRecords for fetch, not actionLoading
        try {
            const data = await getByRound(round.id)
            setRecords(data)
        } catch (err) {
            console.error('Failed to fetch round records', err)
        } finally {
            setLoadingRecords(false)
        }
    }

    useEffect(() => {
        if (expanded) fetchRecords()
    }, [expanded])

    const getStatus = (userId) => {
        const found = records.find(r => r.user?.id === userId)
        if (!found) return 'absent'
        if (found.check_out_time) return 'out'
        return 'in'
    }

    const handleCheckIn = async (userId) => {
        console.log('round:', round)
        console.log('roundId being sent:', round.id)
        setActionLoading(userId + '_in')
        try {
            await checkIn({ meetingId, userId, roundId: round.id })
            await fetchRecords()
        } catch (err) {
            if (err?.response?.status === 409) { // FIX 3: number not string
                alert('User is already checked in for this round.')
            } else {
                console.error('Check-in failed: ', err)
            }
        } finally {
            setActionLoading(null)
        }
    }

    const handleCheckOut = async (userId) => {
        setActionLoading(userId + '_out')
        try {
            await checkOut({ meetingId, userId, roundId: round.id })
            await fetchRecords()
        } catch (err) {
            console.error('Check-out failed: ', err)
        } finally {
            setActionLoading(null)
        }
    }

    const checkedInCount = records.filter(r => !r.check_out_time).length

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <button
                    className={styles.headerToggle}
                    onClick={() => setExpanded(e => !e)}
                >
                    <span className={styles.roundLabel}>Round {round.roundNumber}</span>
                    <span className={styles.roundMeta}>
                        {checkedInCount} / {users.length} present
                    </span>
                    <span className={styles.chevron}>{expanded ? '▲' : '▼'}</span>
                </button>
                <button
                    className={styles.btnDelete}
                    onClick={onDelete}
                    title="Delete round"
                >
                    ✕
                </button>
            </div>

            {expanded && (
                <div className={styles.body}>
                    {loadingRecords ? (
                        <p className={styles.state}>Loading...</p>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>Member</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => {
                                const status = getStatus(user.id)
                                return (
                                    <tr key={user.id} className={status === 'absent' ? styles.rowAbsent : ''}>
                                        <td>
                                            {/* FIX 4: wrapper div inside td, not flex on td */}
                                            <div className={styles.nameCell}>
                                                    <span className={styles.name}>
                                                        {user.firstName && user.lastName
                                                            ? `${user.firstName} ${user.lastName}`
                                                            : user.username}
                                                    </span>
                                                <span className={styles.username}>@{user.username}</span>
                                            </div>
                                        </td>
                                        <td>
                                                <span className={`${styles.status} ${styles[`status_${status}`]}`}>
                                                    {status === 'in' ? 'Present' : status === 'out' ? 'Checked Out' : 'Absent'}
                                                </span>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
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
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    )
}