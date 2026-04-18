import { ROUTES } from "../../router/Routes";
import styles from './Sidebar.module.css'
import Sidebarlogo from './Sidebarlogo'
import Navgroup from './Navgroup'
import SideBarUser from './SideBarUser'
import { useNavigate, useLocation } from 'react-router-dom'


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
        group: 'Details',
        items: [
            { id: 'members', label: 'Members', icon: 'users' },
            { id: 'announcements', label: 'Announcements', icon: 'message' },
            { id: 'reports', label: 'Reports', icon: 'bar-chart' },
        ]
    },
    {
        group: 'Admin',
        items: [
            { id: 'attendance', label: 'Attendance', icon: 'user-check' },
            { id: 'settings', label: 'Settings', icon: 'settings' },
        ]
    }
]

const NAV_ROUTE_MAP = {
    dashboard: ROUTES.DASHBOARD,
    events: ROUTES.EVENTS,
    polls: ROUTES.POLLS,
    members: ROUTES.MEMBERS,
    announcements: ROUTES.ANNOUNCEMENTS,
    reports: ROUTES.REPORTS,
    attendance: ROUTES.ATTENDANCE,
    settings: ROUTES.SETTINGS,
}

export default function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()

    const active = Object.entries(NAV_ROUTE_MAP).find(
        ([, route]) => location.pathname === route
    )?.[0] ?? 'dashboard'

    return (
        <aside className={styles.sidebar}>
            <div className={styles.glow} />
            <Sidebarlogo />
            <nav className={styles.nav}>
                {NAV.map(group => (
                    <Navgroup key={group.group} group={group} active={active} onSelect={(id) => navigate(NAV_ROUTE_MAP[id])} />
                ))}
            </nav>
            <SideBarUser />
        </aside>
    )
}