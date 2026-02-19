import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Sidebar from '../components/layout/Sidebar'
import MainPanel from '../components/layout/MainPanel'
import DashBoardPage from '../pages/DashBoardPage'
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginPage from '../pages/LoginPage.jsx';
import PollsPage from "../pages/PollsPage.jsx";
import { ROUTES } from './routes'
import EventCard from "../features/dashboard/comps/EventCard.jsx";

// Placeholder για pages που δεν έχουν φτιαχτεί ακόμα
const Soon = ({ name }) => (
    <div style={{ padding: '32px', color: 'var(--muted2)' }}>
        {name} — coming soon
    </div>
)

export default function AppRouter() {
    return (
        <Routes>
            {/* Public route */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />

            {/* Protected routes */}
            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Sidebar />
                            <MainPanel>
                                <Routes>
                                    <Route path={ROUTES.DASHBOARD} element={<DashBoardPage />} />
                                    <Route path={ROUTES.EVENTS} element={<EventCard />} />
                                    <Route path={ROUTES.POLLS} element={<PollsPage />} />
                                    <Route path={ROUTES.MEMBERS} element={<Soon name="Members" />} />
                                    <Route path={ROUTES.ANNOUNCEMENTS} element={<Soon name="Announcements" />} />
                                    <Route path={ROUTES.REPORTS} element={<Soon name="Reports" />} />
                                    <Route path={ROUTES.SETTINGS} element={<Soon name="Settings" />} />
                                </Routes>
                            </MainPanel>
                        </Layout>
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}