import { useState } from 'react'
import { useEvent, useCreateEvent } from '../hooks/useEvents.js'
import { useDismissed } from '../hooks/useDismissed.js'
import styles from './EventPage.module.css'

export default function EventsPage() {
    const [eventId] = useState(1)
    const { data: event, isLoading, isError } = useEvent(eventId)
    const { mutate: create, isPending, isError: createError, error } = useCreateEvent()
    const { dismiss, isVisible } = useDismissed()

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        location: '',
    })

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        create(form, {
            onSuccess: () => {
                setForm({ title: '', description: '', startTime: '', endTime: '', location: '' })
                setShowForm(false)
            }
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
                <button className={styles.createBtn} onClick={() => setShowForm(v => !v)}>
                    {showForm ? 'Cancel' : '+ Create Event'}
                </button>
            </div>

            {showForm && (
                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Title</label>
                                <input
                                    className={styles.input}
                                    name="title"
                                    placeholder="Event title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Location</label>
                                <input
                                    className={styles.input}
                                    name="location"
                                    placeholder="e.g. Thessaloniki"
                                    value={form.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Description</label>
                            <textarea
                                className={styles.textarea}
                                name="description"
                                placeholder="What is this event about?"
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Start Time</label>
                                <input
                                    className={styles.input}
                                    name="startTime"
                                    type="datetime-local"
                                    value={form.startTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>End Time</label>
                                <input
                                    className={styles.input}
                                    name="endTime"
                                    type="datetime-local"
                                    value={form.endTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formFooter}>
                            {createError && <span className={styles.error}>{error?.response?.data || 'Something went wrong'}</span>}
                            <button type="submit" className={styles.submitBtn} disabled={isPending}>
                                {isPending ? 'Creating...' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.list}>
                {event && isVisible(event.Id) && (
                    <div className={styles.card}>
                        <div className={styles.cardTop}>
                            <span className={styles.badge}>Upcoming</span>
                            <div className={styles.cardActions}>
                                <span className={styles.location}>📍 {event.location}</span>
                                <button className={styles.dismissBtn} onClick={() => dismiss(event.Id)}>✕</button>
                            </div>
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

                {event && !isVisible(event.Id) && (
                    <p className={styles.state}>No events to show.</p>
                )}
            </div>
        </main>
    )
}