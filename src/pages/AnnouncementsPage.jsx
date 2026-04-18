import { useState } from 'react'
import { useAnnouncements, useCreateAnnouncement } from '../hooks/useAnnouncements'
import styles from './AnnouncementsPage.module.css'
import { useDismissed } from "../hooks/useDismissed.js";


const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH']

const PRIORITY_STYLES = {
    HIGH:   { label: 'High',   className: 'badgeHigh' },
    MEDIUM: { label: 'Medium', className: 'badgeMedium' },
    LOW:    { label: 'Low',    className: 'badgeLow' },
}

export default function AnnouncementsPage() {
    const { data: announcements, isLoading } = useAnnouncements()
    const { mutate: create, isPending, isError, error } = useCreateAnnouncement()
    const { dismiss, isVisible } = useDismissed()

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ title: '', content: '', priority: 'HIGH' })

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        create(form, {
            onSuccess: () => {
                setForm({ title: '', content: '', priority: 'HIGH' })
                setShowForm(false)
            }
        })
    }

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Announcements</h1>
                    <p className={styles.subtitle}>Board-wide notices and updates</p>
                </div>
                <button className={styles.createBtn} onClick={() => setShowForm(v => !v)}>
                    {showForm ? 'Cancel' : '+ New Announcement'}
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
                                    placeholder="Announcement title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Priority</label>
                                <select className={styles.select} name="priority" value={form.priority} onChange={handleChange}>
                                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Content</label>
                            <textarea
                                className={styles.textarea}
                                name="content"
                                placeholder="Write your announcement..."
                                value={form.content}
                                onChange={handleChange}
                                rows={4}
                                required
                            />
                        </div>
                        <div className={styles.formFooter}>
                            {isError && <span className={styles.error}>{error?.response?.data || 'Something went wrong'}</span>}
                            <button type="submit" className={styles.submitBtn} disabled={isPending}>
                                {isPending ? 'Posting...' : 'Post Announcement'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.list}>
                {isLoading && <p className={styles.state}>Loading announcements...</p>}
                {!isLoading && announcements?.filter(a => isVisible(a.Id)).length === 0 && (
                    <p className={styles.state}>No announcements yet.</p>
                )}
                {announcements?.filter(a => isVisible(a.Id)).map(a => (
                    <div key={a.Id} className={styles.card}>
                        <div className={styles.cardTop}>
                            <span className={`${styles.badge} ${styles[PRIORITY_STYLES[a.priority]?.className]}`}>
                                {PRIORITY_STYLES[a.priority]?.label}
                            </span>
                            <div className={styles.cardActions}>
                                {a.createdAt && (
                                    <span className={styles.date}>{new Date(a.createdAt).toLocaleDateString()}</span>
                                )}
                                <button className={styles.dismissBtn} onClick={() => dismiss(a.Id)}>✕</button>
                            </div>
                        </div>
                        <h2 className={styles.cardTitle}>{a.title}</h2>
                        <p className={styles.cardContent}>{a.content}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}