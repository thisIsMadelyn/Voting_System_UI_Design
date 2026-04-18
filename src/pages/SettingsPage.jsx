import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import {
    fetchUserById,
    searchByDiscordTag,
    updateProfile,
    changePassword,
    updateUserRole,
} from '../services/dashboardApi'
import styles from './SettingsPage.module.css'

export default function SettingsPage() {
    const { user, isPrivileged, isAdmin } = useAuth()

    if (!user) return <p className={styles.empty}>Not logged in.</p>

    const initials = user.username.slice(0, 2).toUpperCase()

    return (
        <main className={styles.page}>
            <h1 className={styles.heading}>Settings</h1>

            <Section title="Account" subtitle="Profile & contact info">
                <div className={styles.avatarRow}>
                    <div className={styles.avatar}>{initials}</div>
                    <div>
                        <div className={styles.avatarName}>
                            {user.username}
                            <span className={`${styles.badge} ${styles[user.role?.toLowerCase()]}`}>
                                {user.role}
                            </span>
                        </div>
                        <div className={styles.avatarRole}>ID #{user.userId}</div>
                    </div>
                </div>
                <ProfileForm userId={user.userId} />
            </Section>

            <Section title="Security" subtitle="Change your password">
                <PasswordForm userId={user.userId} />
            </Section>

            {isPrivileged && (
                <Section title="Role Management" subtitle="Moderators & admins only">
                    <RoleManagement adminId={user.userId} isAdmin={isAdmin} />
                </Section>
            )}
        </main>
    )
}

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({ title, subtitle, children }) {
    return (
        <section className={styles.section}>
            <div className={styles.secHeader}>
                <div className={styles.secTitle}>{title}</div>
                {subtitle && <div className={styles.secSub}>{subtitle}</div>}
            </div>
            <div className={styles.secBody}>{children}</div>
        </section>
    )
}

// ─── Profile form ─────────────────────────────────────────────────────────────

function ProfileForm({ userId }) {
    const [form, setForm] = useState({
        username: '', email: '', discordTag: '', phone: ''
    })
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUserById(userId)
            .then(data => setForm({
                username:   data.username   ?? '',
                email:      data.email      ?? '',
                discordTag: data.discordTag ?? '',
                phone:      data.phone      ?? '',
            }))
            .catch(() => setStatus('Failed to load profile.'))
            .finally(() => setLoading(false))
    }, [userId])

    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

    const handleSave = async () => {
        setStatus(null)
        try {
            await updateProfile(userId, form)
            setStatus('Saved successfully.')
        } catch {
            setStatus('Failed to save changes.')
        }
    }

    if (loading) return <p className={styles.hint}>Loading profile…</p>

    return (
        <>
            <div className={styles.grid}>
                <Field label="Username"    value={form.username}   onChange={set('username')} />
                <Field label="Email"       value={form.email}      onChange={set('email')}      type="email" />
                <Field label="Discord Tag" value={form.discordTag} onChange={set('discordTag')} />
                <Field label="Phone"       value={form.phone}      onChange={set('phone')}      type="tel" />
            </div>
            {status && <p className={status.includes('Saved') ? styles.success : styles.error}>{status}</p>}
            <div className={styles.btnRow}>
                <button className={`${styles.btn} ${styles.primary}`} onClick={handleSave}>
                    Save changes
                </button>
            </div>
        </>
    )
}

// ─── Password form ────────────────────────────────────────────────────────────

function PasswordForm({ userId }) {
    const [form, setForm] = useState({ current: '', next: '', confirm: '' })
    const [status, setStatus] = useState(null)

    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))
    const mismatch = form.next && form.confirm && form.next !== form.confirm

    const handleUpdate = async () => {
        if (mismatch) return
        setStatus(null)
        try {
            await changePassword(userId, form.current, form.next)
            setStatus('Password updated.')
            setForm({ current: '', next: '', confirm: '' })
        } catch (err) {
            setStatus(err.message ?? 'Failed to update password.')
        }
    }

    return (
        <>
            <div className={styles.grid}>
                <Field label="Current password" value={form.current} onChange={set('current')} type="password" full />
                <Field label="New password"     value={form.next}    onChange={set('next')}    type="password" />
                <Field label="Confirm password" value={form.confirm} onChange={set('confirm')} type="password" />
            </div>
            {mismatch && <p className={styles.error}>Passwords do not match.</p>}
            {status && <p className={status.includes('updated') ? styles.success : styles.error}>{status}</p>}
            <div className={styles.btnRow}>
                <button
                    className={`${styles.btn} ${styles.primary}`}
                    onClick={handleUpdate}
                    disabled={!!mismatch}
                >
                    Update password
                </button>
            </div>
        </>
    )
}

// ─── Role management ──────────────────────────────────────────────────────────

function RoleManagement({ adminId, isAdmin }) {
    const [tag, setTag]       = useState('')
    const [found, setFound]   = useState(undefined)
    const [role, setRole]     = useState('')
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)

    const handleSearch = async () => {
        if (!tag.trim()) return
        setLoading(true)
        setFound(undefined)
        setStatus(null)
        try {
            const data = await searchByDiscordTag(tag.trim())
            setFound(data)
            setRole(data?.role ?? 'USER')
        } catch {
            setFound(null)
        } finally {
            setLoading(false)
        }
    }

    const handleApply = async () => {
        if (!found || !isAdmin) return
        setStatus(null)
        try {
            await updateUserRole(found.id, role, adminId)
            setStatus(`Role updated to ${role}.`)
            setFound(f => ({ ...f, role }))
        } catch (err) {
            setStatus(err.message ?? 'Failed to update role.')
        }
    }

    return (
        <>
            <p className={styles.hint}>Search a member by Discord tag and update their role.</p>
            <div className={styles.searchRow}>
                <input
                    className={styles.input}
                    placeholder="Discord tag…"
                    value={tag}
                    onChange={e => { setTag(e.target.value); setFound(undefined); setStatus(null) }}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
                <button className={styles.btn} onClick={handleSearch} disabled={loading}>
                    {loading ? '…' : 'Search'}
                </button>
            </div>

            {found === null && <p className={styles.error}>No user found for "{tag}".</p>}

            {found && (
                <div className={styles.roleRow}>
                    <span className={styles.roleName}>{found.username}</span>
                    <span className={styles.roleTag}>{found.role}</span>
                    {isAdmin ? (
                        <>
                            <select
                                className={styles.select}
                                value={role}
                                onChange={e => setRole(e.target.value)}
                            >
                                <option value="USER">User</option>
                                <option value="MODERATOR">Moderator</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                            <button
                                className={`${styles.btn} ${styles.primary}`}
                                onClick={handleApply}
                            >
                                Apply
                            </button>
                        </>
                    ) : (
                        <span className={styles.hint}>View only — admin required to change roles.</span>
                    )}
                </div>
            )}

            {status && (
                <p className={status.includes('updated') ? styles.success : styles.error}>
                    {status}
                </p>
            )}
        </>
    )
}

// ─── Shared components ────────────────────────────────────────────────────────

function Field({ label, value, onChange, type = 'text', full }) {
    return (
        <div className={`${styles.field} ${full ? styles.full : ''}`}>
            <label className={styles.label}>{label}</label>
            <input className={styles.input} type={type} value={value} onChange={onChange} />
        </div>
    )
}