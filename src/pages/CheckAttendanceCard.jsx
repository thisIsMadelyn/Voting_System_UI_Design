import { useEffect, useState } from 'react'
// import { authApi } from '../services/AuthApi.js'
import { meetingApi } from '../services/MeetingApi.js'
import { attendanceApi } from '../services/AttendanceApi.js'
import client from '../services/AxiosClient.js'
import Card from '../../src/components/ui/Card.jsx'
import styles from './CheckAttendanceCard.module.css'

export default function AttendanceCheckCard() {
    const [meeting, setMeeting]     = useState(null)
    const [users, setUsers]         = useState([])
    const [attended, setAttended]   = useState(new Set())   // userIds checked in
    const [checkedOut, setCheckedOut] = useState(new Set()) // userIds checked out
    const [loading, setLoading]     = useState(true)
    const [error, setError]         = useState(null)

    // const currentUser = authApi.getCurrentUser()

    useEffect(() => {
        async function load() {
            try {
                const [activeMeeting, usersRes] = await Promise.all([
                    meetingApi.getActive(),
                    client.get('/users'),   // adjust to your actual users endpoint
                ])
                setMeeting(activeMeeting)
                setUsers(usersRes.data)
            } catch (e) {
                setError(e.message ?? 'Failed to load attendance data.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const handleCheckIn = async (userId) => {
        try {
            await attendanceApi.checkIn(meeting.id, userId)
            setAttended(prev => new Set([...prev, userId]))
        } catch (e) {
            alert(e.response?.data?.message ?? 'Check-in failed.')
        }
    }

    const handleCheckOut = async (userId) => {
        try {
            await attendanceApi.checkOut(meeting.id, userId)
            setCheckedOut(prev => new Set([...prev, userId]))
        } catch (e) {
            alert(e.response?.data?.message ?? 'Check-out failed.')
        }
    }

    if (loading) return <Card title="Attendance Control" subtitle="Loading..."><p>—</p></Card>
    if (error)   return <Card title="Attendance Control" subtitle="Error"><p className={styles.error}>{error}</p></Card>
    if (!meeting) return <Card title="Attendance Control" subtitle="No active meeting"><p>—</p></Card>

    return (
        <Card
            title="Attendance Control"
            subtitle={`Meeting #${meeting.id} · ${new Date(meeting.meetingDate).toLocaleDateString()}`}
            animDelay={400}
        >
            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => {
                        const isIn  = attended.has(user.userId)
                        const isOut = checkedOut.has(user.userId)
                        return (
                            <tr key={user.userId} className={isOut ? styles.rowOut : isIn ? styles.rowIn : ''}>
                                <td>{user.username}</td>
                                <td>
                                        <span className={`${styles.badge} ${
                                            user.member_status?.toLowerCase() === 'member'        ? styles.badgeMember :
                                                user.member_status?.toLowerCase().includes('junior')  ? styles.badgeJunior :
                                                    styles.badgeAlumni
                                        }`}>
                                                {user.member_status}
                                        </span>
                                </td>
                                <td>
                                    <button
                                        className={styles.btnIn}
                                        onClick={() => handleCheckIn(user.userId)}
                                        disabled={isIn}
                                    >
                                        {isIn ? '✓ In' : 'Check In'}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={styles.btnOut}
                                        onClick={() => handleCheckOut(user.userId)}
                                        disabled={!isIn || isOut}
                                    >
                                        {isOut ? '✓ Out' : 'Check Out'}
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}