import styles from './DashBoardPage.module.css'
import HeroWelcome from '../features/dashboard/comps/HeroWelcome'
import StatRow from '../features/dashboard/comps/StatRow'
import PollCard from '../features/dashboard/comps/PollCard'
import EventsCard from '../features/dashboard/comps/EventsCard'
import AttendanceCard from '../features/dashboard/comps/AttendanceCard'
import NoticeBoardCard from '../features/dashboard/comps/NoticeBoardCard'

// import CheckAttendanceCard from '../features/dashboard/comps/CheckAttendanceCard.jsx'
// import { authApi } from '../services/AuthApi.js'

import {
    mockUser,
    mockWeather,
    mockStats,
    mockPolls,
    mockEvents,
    mockAttendance,
    mockNotices,
} from '../features/dashboard/data/mockDashboard'

const TODAY = 'Tuesday, February 17 · 2026'

// const currentUser = authApi.getCurrentUser()

export default function DashboardPage() {
    return (
        <main className={styles.content}>
            <HeroWelcome user={mockUser} weather={mockWeather} date={TODAY} />
            <StatRow stats={mockStats} />

            <div className={styles.mainGrid}>
                <PollCard polls={mockPolls} />
                <EventsCard events={mockEvents} />
            </div>

            <div className={styles.bottomGrid}>
                <AttendanceCard sessions={mockAttendance} />
                <NoticeBoardCard notices={mockNotices} />
            </div>

            {/*{isModerator && <CheckAttendanceCard />}*/}
        </main>
    )
}