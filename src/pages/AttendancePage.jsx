import {useState} from "react";
import ActiveMeetingTab from '../features/dashboard/comps/ActiveMeetingTab.jsx'
import AttendanceHistoryTab from '../features/dashboard/comps/AttendanceHistoryTab.jsx'
import styles from './AttendancePage.module.css'

const TABS = [
    { id: 'active', label: 'Active Meeting' },
    { id: 'history', label: 'History' },
]

export default function AttendancePage() {

    const [activeTab, setActiveTab] = useState('active')

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Attendance</h1>
                <p className={styles.subtitle}>Manage check-ins for the active meeting or review past records.</p>
            </div>

            <div className={styles.tabs}>
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={styles.content}>
                {activeTab === 'active' && <ActiveMeetingTab />}
                {activeTab === 'history' && <AttendanceHistoryTab />}
            </div>
        </div>
    )
}