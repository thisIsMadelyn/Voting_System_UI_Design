import Card from '../../../components/ui/Card'
import EventItem from './EventItem'
import styles from './EventsCard.module.css'

export default function EventsCard({ events }) {
    return (
        <Card title="Upcoming Events" subtitle="Next 14 days" action="View all" animDelay={330}>
            <div className={styles.list}>
                {events.map(event => (
                    <EventItem key={event.id} event={event} />
                ))}
            </div>
        </Card>
    )
}