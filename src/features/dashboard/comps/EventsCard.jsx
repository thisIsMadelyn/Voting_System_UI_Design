import Card from '../../../components/ui/Card'
import EventItem from './EventItem'
import styles from './EventsCard.module.css'
import { useState } from 'react'

export default function EventsCard({ events, loading, error }) {
    const [expanded, setExpanded] = useState(false)

    if (loading) {
        return (
            <Card title="Upcoming Events" subtitle="Next 14 days" animDelay={330}>
                <div className={styles.loadingState}>
                    <p>Loading events...</p>
                </div>
            </Card>
        )
    }

    if (error) {
        return (
            <Card title="Upcoming Events" subtitle="Next 14 days" animDelay={330}>
                <div className={styles.errorState}>
                    <p>⚠️ {error}</p>
                </div>
            </Card>
        )
    }

    if (!events || events.length === 0) {
        return (
            <Card title="Upcoming Events" subtitle="Next 14 days" animDelay={330}>
                <div className={styles.emptyState}>
                    <p>No events scheduled.</p>
                </div>
            </Card>
        )
    }

    // Show max 3 items by default, expand to show all
    const visibleEvents = expanded ? events : events.slice(0, 3)
    const hasMore = events.length > 3

    return (
        <Card
            title="Upcoming Events"
            subtitle="Next 14 days"
            action={hasMore ? (expanded ? 'Show less' : 'View all') : null}
            onActionClick={() => setExpanded(!expanded)}
            animDelay={330}
        >
            <div className={styles.list}>
                {visibleEvents.map(event => (
                    <EventItem key={event.id} event={event} />
                ))}
            </div>

            {hasMore && (
                <div className={styles.footer}>
                    <button
                        className={styles.toggleBtn}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? '← Collapse' : `Show ${events.length - 3} more`}
                    </button>
                </div>
            )}
        </Card>
    )
}