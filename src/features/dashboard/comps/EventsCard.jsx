import Card from '../../../components/ui/Card'
import EventItem from './EventItem'
import styles from './EventsCard.module.css'

// EventsCard.jsx — add these props
export default function EventsCard({ events, loading, error }) {
    if (loading) return <Card title="Upcoming Events" subtitle="Next 14 days"><p>Loading...</p></Card>
    if (error)   return <Card title="Upcoming Events" subtitle="Next 14 days"><p>{error}</p></Card>

    return (
        <Card title="Upcoming Events" subtitle="Next 14 days" action="View all" animDelay={330}>
            <div className={styles.list}>
                {events.map(event => <EventItem key={event.id} event={event} />)}
            </div>
        </Card>
    )
}