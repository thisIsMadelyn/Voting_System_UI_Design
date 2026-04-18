import { useState } from 'react'
import { useEvents, useCreateEvent } from '../hooks/useEvents'
import styles from './EventPage.module.css'

const EVENT_TYPES = [
    'ADVANCED_SKILLS_WORKSHOP',
    'CONGRESS',
    'EXCHANGE',
    'HOBOM',
    'IMW',
    'LRM',
    'OPERATIONAL',
    'SUBOM',
    'WIBOM',
    'WORKSHOP',
]

export default function EventsPage({ currentUserId }) {
    const { data: events = [], isLoading, isError } = useEvents()
    const { mutate: createEvent, isPending, isError: createError, error } = useCreateEvent()

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        hostingLC: '',
        type: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate times
        if (new Date(form.startTime) >= new Date(form.endTime)) {
            alert('End time must be after start time')
            return
        }

        // Prepare payload with current user as createdBy
        const payload = {
            title: form.title,
            description: form.description,
            startTime: form.startTime,
            endTime: form.endTime,
            hostingLC: form.hostingLC,
            type: form.type,
            createdBy: currentUserId, // Set from logged-in user
        }

        createEvent(payload, {
            onSuccess: () => {
                setForm({
                    title: '',
                    description: '',
                    startTime: '',
                    endTime: '',
                    hostingLC: '',
                    type: '',
                })
                setShowForm(false)
            },
        })
    }

    if (isLoading) return <div className={styles.state}>Loading events...</div>
    if (isError) return <div className={styles.state}>Failed to load events.</div>

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Events</h1>
                    <p className={styles.subtitle}>Manage upcoming & recent activity</p>
                </div>
                <button
                    className={styles.createBtn}
                    onClick={() => setShowForm(v => !v)}
                >
                    {showForm ? 'Cancel' : '+ Create Event'}
                </button>
            </div>

            {showForm && (
                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Title */}
                        <div className={styles.field}>
                            <label className={styles.label}>Title *</label>
                            <input
                                className={styles.input}
                                name="title"
                                placeholder="Event title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className={styles.field}>
                            <label className={styles.label}>Description *</label>
                            <textarea
                                className={styles.textarea}
                                name="description"
                                placeholder="What is this event about?"
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                                required
                            />
                        </div>

                        {/* Hosting LC */}
                        <div className={styles.field}>
                            <label className={styles.label}>Hosting LC *</label>
                            <input
                                className={styles.input}
                                name="hostingLC"
                                placeholder="e.g. LC Thessaloniki"
                                value={form.hostingLC}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Event Type */}
                        <div className={styles.field}>
                            <label className={styles.label}>Event Type *</label>
                            <select
                                className={styles.select}
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a type</option>
                                {EVENT_TYPES.map(type => (
                                    <option key={type} value={type}>
                                        {type.replace(/_/g, ' ')}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Start Time */}
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Start Time *</label>
                                <input
                                    className={styles.input}
                                    name="startTime"
                                    type="datetime-local"
                                    placeholder="2026-05-10T10:00"
                                    value={form.startTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* End Time */}
                            <div className={styles.field}>
                                <label className={styles.label}>End Time *</label>
                                <input
                                    className={styles.input}
                                    name="endTime"
                                    type="datetime-local"
                                    placeholder="2026-05-10T13:00"
                                    value={form.endTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Form Footer */}
                        <div className={styles.formFooter}>
                            {createError && (
                                <span className={styles.error}>
                                    {error?.response?.data?.message || 'Failed to create event'}
                                </span>
                            )}
                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={isPending}
                            >
                                {isPending ? 'Creating...' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Events List */}
            <div className={styles.list}>
                {events.length === 0 ? (
                    <p className={styles.state}>No events yet.</p>
                ) : (
                    events.map(event => (
                        <div key={event.id} className={styles.card}>
                            <div className={styles.cardTop}>
                                <span className={styles.badge}>{event.type}</span>
                                <span className={styles.location}>📍 {event.hostingLC}</span>
                            </div>
                            <h2 className={styles.eventTitle}>{event.title}</h2>
                            <p className={styles.description}>{event.description}</p>
                            <div className={styles.time}>
                                <span>🕘</span>
                                <span>
                                    {new Date(event.startTime).toLocaleString()} →{' '}
                                    {new Date(event.endTime).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    )
}
