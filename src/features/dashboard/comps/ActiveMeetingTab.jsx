import { useEffect, useState } from 'react'
import { getActive } from '../../../services/MeetingApi'
import { getAll } from '../../../services/UsersApi'
import { getRound, createRound, deleteRound } from '../../../services/AttendanceApi'
import AttendanceRoundCard from './AttendanceRoundCard'
import styles from './ActiveMeetingTab.module.css'

export default function ActiveMeetingTab() {
    const [meeting, setMeeting] = useState(null)
    const [users, setUsers] = useState([])
    const [rounds, setRounds] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [creating, setCreating] = useState(false)

    const fetchData = async () => {
        try {
            setError(null)
            const [activeMeeting, allUsers] = await Promise.all([
                getActive(),
                getAll(),
            ])
            setMeeting(activeMeeting)
            const allRounds = await getRound(activeMeeting.id)
            setRounds(allRounds)
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

    const handleCreateRound = async () => {
        if (!meeting) return
        setCreating(true)
        try {
            const newRound = await createRound(meeting.id)
            setRounds(prev => [...prev, newRound])
        } catch (err) {
            console.error('Failed to create round', err)
        } finally {
            setCreating(false)
        }
    }

    const handleDeleteRound = async (roundId) => {
        try {
            await deleteRound(roundId)
            setRounds(prev => prev.filter(r => r.id !== roundId))
        } catch (err) {
            console.error('Failed to delete round', err)
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

    return (
        <div className={styles.wrapper}>
            <div className={styles.meetingCard}>
                <div className={styles.meetingInfo}>
                    <span className={styles.meetingLabel}>Active Meeting</span>
                    <span className={styles.meetingTitle}>
                        {meeting.title ?? `Meeting #${meeting.id}`}
                    </span>
                </div>
                <div className={styles.meetingMeta}>
                    <span className={styles.roundCount}>
                        {rounds.length} round{rounds.length !== 1 ? 's' : ''}
                    </span>
                    <button
                        className={styles.btnAdd}
                        onClick={handleCreateRound}
                        disabled={creating}
                        title="Add new round"
                    >
                        {creating ? '...' : '＋ New Round'}
                    </button>
                </div>
            </div>

            {rounds.length === 0 && (
                <div className={styles.emptyRounds}>
                    <p>No rounds yet. Click <strong>＋ New Round</strong> to start.</p>
                </div>
            )}

            <div className={styles.rounds}>
                {[...rounds].reverse().map((round, index) => (
                    <AttendanceRoundCard
                        key={round.id}
                        round={round}
                        users={users}
                        meetingId={meeting.id}
                        defaultExpanded={index === 0}
                        onDelete={() => handleDeleteRound(round.id)}
                    />
                ))}
            </div>
        </div>
    )
}
