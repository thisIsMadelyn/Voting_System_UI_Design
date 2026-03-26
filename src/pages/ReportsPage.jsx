import { useState } from 'react'
import { useInbox, useSent, useCreateReport } from '../services/useReports'
import { useDismissed } from '../hooks/useDismissed'
import useAuthStore from '../services/AuthStore'
import styles from './ReportPages.module.css'

export default function ReportsPage() {
    const { user } = useAuthStore()
    const { data: inbox, isLoading: loadingInbox } = useInbox(user?.userId)
    const { data: sent, isLoading: loadingSent } = useSent(user?.userId)
    const { mutate: createReport, isPending, isError, error } = useCreateReport()
    const { dismiss, isVisible } = useDismissed()

    const [tab, setTab] = useState('inbox')
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ receiverUsername: '', title: '', content: '' })

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        createReport({
            senderId: user.userId,
            ...form,
        }, {
            onSuccess: () => {
                setForm({ receiverUsername: '', title: '', content: '' })
                setShowForm(false)
            }
        })
    }

    const isLoading = tab === 'inbox' ? loadingInbox : loadingSent
    const messages = tab === 'inbox' ? inbox : sent

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Reports</h1>
                    <p className={styles.subtitle}>Internal messages between moderators and admins</p>
                </div>
                <button className={styles.createBtn} onClick={() => setShowForm(v => !v)}>
                    {showForm ? 'Cancel' : '+ New Report'}
                </button>
            </div>

            {showForm && (
                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Recipient Username</label>
                                <input
                                    className={styles.input}
                                    name="receiverUsername"
                                    placeholder="e.g. maria_p"
                                    value={form.receiverUsername}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Title</label>
                                <input
                                    className={styles.input}
                                    name="title"
                                    placeholder="Report title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Content</label>
                            <textarea
                                className={styles.textarea}
                                name="content"
                                placeholder="Write your report..."
                                value={form.content}
                                onChange={handleChange}
                                rows={4}
                                required
                            />
                        </div>
                        <div className={styles.formFooter}>
                            {isError && <span className={styles.error}>{error?.response?.data || 'Something went wrong'}</span>}
                            <button type="submit" className={styles.submitBtn} disabled={isPending}>
                                {isPending ? 'Sending...' : 'Send Report'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${tab === 'inbox' ? styles.tabActive : ''}`}
                    onClick={() => setTab('inbox')}
                >
                    Inbox
                </button>
                <button
                    className={`${styles.tab} ${tab === 'sent' ? styles.tabActive : ''}`}
                    onClick={() => setTab('sent')}
                >
                    Sent
                </button>
            </div>

            <div className={styles.list}>
                {isLoading && <p className={styles.state}>Loading...</p>}
                {!isLoading && messages?.filter(m => isVisible(m.id)).length === 0 && (
                    <p className={styles.state}>No reports yet.</p>
                )}
                {messages?.filter(m => isVisible(m.id)).map(m => (
                    <div key={m.id} className={styles.card}>
                        <div className={styles.cardTop}>
                            <div className={styles.cardMeta}>
                                <span className={styles.badge}>
                                    {tab === 'inbox' ? `From: ${m.senderUsername}` : `To: ${m.receiverUsername}`}
                                </span>
                                <span className={styles.date}>
                                    {new Date(m.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <button className={styles.dismissBtn} onClick={() => dismiss(m.id)}>✕</button>
                        </div>
                        <h2 className={styles.cardTitle}>{m.title}</h2>
                        <p className={styles.cardContent}>{m.content}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}