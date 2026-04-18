import { useState, useCallback } from 'react'
import { searchByDiscordTag } from '../services/dashboardApi'
import styles from './DiscordSearch.module.css'

export default function DiscordSearch() {
    const [query, setQuery]   = useState('')
    const [result, setResult] = useState(undefined) // undefined=idle, null=not found
    const [loading, setLoading] = useState(false)

    const handleSearch = useCallback(async () => {
        if (!query.trim()) return
        setLoading(true)
        try {
            const data = await searchByDiscordTag(query.trim())
            setResult(data)
        } catch {
            setResult(null)
        } finally {
            setLoading(false)
        }
    }, [query])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputRow}>
                <span className={styles.icon}>🔍</span>
                <input
                    className={styles.input}
                    placeholder="Search by Discord tag…"
                    value={query}
                    onChange={e => { setQuery(e.target.value); setResult(undefined) }}
                    onKeyDown={handleKeyDown}
                />
                {loading && <span className={styles.spinner} />}
            </div>

            {result === null && (
                <div className={styles.popover}>
                    <p className={styles.notFound}>No user found for "{query}"</p>
                </div>
            )}

            {result && (
                <div className={styles.popover}>
                    <p className={styles.name}>{result.username}</p>
                    <div className={styles.rows}>
                        <Row label="Discord"  value={result.discordTag} />
                        <Row label="Phone"    value={result.phone} />
                        <Row label="Status"   value={result.status} />
                        <Row label="Role"     value={result.role} />
                    </div>
                </div>
            )}
        </div>
    )
}

function Row({ label, value }) {
    return (
        <div className={styles.row}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
        </div>
    )
}