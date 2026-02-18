import { useState } from 'react'
import styles from './Sidebar.module.css'
import Sidebarlogo from './Sidebarlogo'
import Navgroup from './Navgroup'
import SideBarUser from './SideBarUser'

const NAV = [
    {
        group: 'Overview',
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
            { id: 'events', label: 'Events', icon: 'calendar', chip: '3', chipColor: 'green' },
            { id: 'polls', label: 'Polls', icon: 'check', chip: '2 open' },
        ]
    },
    {
        group: 'Council',
        items: [
            { id: 'members', label: 'Members', icon: 'users' },
            { id: 'announcements', label: 'Announcements', icon: 'message' },
            { id: 'reports', label: 'Reports', icon: 'bar-chart' },
        ]
    },
    {
        group: 'Admin',
        items: [
            { id: 'settings', label: 'Settings', icon: 'settings' },
        ]
    },
]

export default function Sidebar() {
    const [active, setActive] = useState('dashboard')

    return (
        <aside className={styles.sidebar}>
            <div className={styles.glow} />
            <Sidebarlogo />
            <nav className={styles.nav}>
                {NAV.map(group => (
                    <Navgroup key={group.group} group={group} active={active} onSelect={setActive} />
                ))}
            </nav>
            <SideBarUser />
        </aside>
    )
}