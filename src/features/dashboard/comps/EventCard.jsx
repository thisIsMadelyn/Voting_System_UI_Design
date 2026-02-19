import { useState } from 'react'
import { useEvent, useCreateEvent } from '../../../services/useEvents'
import styles from './EventCard.module.css'

export default function EventCard() {
    const [eventId] = useState(1)
    const { data: event, isLoading, isError } = useEvent(eventId)
    const { mutate: create, isPending } = useCreateEvent()

    const handleCreate = () => {
        create({
            title: "Spring Congress",
            description: "We are expecting other LCs",
            startTime: "2026-03-15T09:00:00",
            endTime: "2026-03-15T17:00:00",
            location: "Thessaloniki",
        })
    }

    if (isLoading) return <div className={styles.state}>Loading event...</div>
    if (isError) return <div className={styles.state}>Failed to load event.</div>

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Events</h1>
                    <p className={styles.subtitle}>Upcoming & recent activity</p>
                </div>
                <button className={styles.createBtn} onClick={handleCreate} disabled={isPending}>
                    {isPending ? 'Creating...' : '+ Create Event'}
                </button>
            </div>

            {event && (
                <div className={styles.card}>
                    <div className={styles.cardTop}>
                        <span className={styles.badge}>Upcoming</span>
                        <span className={styles.location}>📍 {event.location}</span>
                    </div>
                    <h2 className={styles.eventTitle}>{event.title}</h2>
                    <p className={styles.description}>{event.description}</p>
                    <div className={styles.time}>
                        <span>🕘</span>
                        <span>
                            {new Date(event.startTime).toLocaleString()} → {new Date(event.endTime).toLocaleString()}
                        </span>
                    </div>
                </div>
            )}
        </main>
    )
}


