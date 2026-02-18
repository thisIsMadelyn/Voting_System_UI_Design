import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Sidebar from '../components/layout/Sidebar'
import MainPanel from '../components/layout/MainPanel'
import DashBoardPage from '../pages/DashBoardPage'
import { ROUTES } from './routes'

// Placeholder για pages που δεν έχουν φτιαχτεί ακόμα
const Soon = ({ name }) => (
    <div style={{ padding: '32px', color: 'var(--muted2)' }}>
        {name} — coming soon
    </div>
)

export default function AppRouter() {
    return (
         <Layout>
            <Sidebar />
            <MainPanel>
                <Routes>
                    <Route path={ROUTES.DASHBOARD} element={<DashBoardPage />} />
                    <Route path={ROUTES.EVENTS} element={<Soon name="Events" />} />
                    <Route path={ROUTES.POLLS} element={<Soon name="Polls" />} />
                    <Route path={ROUTES.MEMBERS} element={<Soon name="Members" />} />
                    <Route path={ROUTES.ANNOUNCEMENTS} element={<Soon name="Announcements" />} />
                    <Route path={ROUTES.REPORTS} element={<Soon name="Reports" />} />
                    <Route path={ROUTES.SETTINGS} element={<Soon name="Settings" />} />
                </Routes>
            </MainPanel>
        </Layout>
    )
}