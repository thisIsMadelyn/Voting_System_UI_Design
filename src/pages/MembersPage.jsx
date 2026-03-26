import { useState } from 'react'
import { useMemberships, useCommittees } from '../services/useMembers'
import styles from './membersPage.module.css'

export default function MembersPage() {
    const { data: memberships, isLoading: loadingMembers } = useMemberships()
    const { data: committees, isLoading: loadingCommittees } = useCommittees()
    const [activeCommittee, setActiveCommittee] = useState('All')

    const isLoading = loadingMembers || loadingCommittees

    const filtered = activeCommittee === 'All'
        ? memberships
        : memberships?.filter(m => m.committeeName === activeCommittee)

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Members</h1>
                    <p className={styles.subtitle}>Browse members by committee</p>
                </div>
            </div>

            <div className={styles.filters}>
                <button
                    className={`${styles.filterBtn} ${activeCommittee === 'All' ? styles.filterActive : ''}`}
                    onClick={() => setActiveCommittee('All')}
                >
                    All
                </button>
                {committees?.map(c => (
                    <button
                        key={c.committeeName}
                        className={`${styles.filterBtn} ${activeCommittee === c.committeeName ? styles.filterActive : ''}`}
                        onClick={() => setActiveCommittee(c.committeeName)}
                    >
                        {c.committeeName}
                    </button>
                ))}
            </div>

            {activeCommittee !== 'All' && (
                <div className={styles.mandateCard}>
                    <span className={styles.mandateLabel}>Mandate</span>
                    <p className={styles.mandateText}>
                        {committees?.find(c => c.committeeName === activeCommittee)?.mandate}
                    </p>
                </div>
            )}

            <div className={styles.grid}>
                {isLoading && <p className={styles.state}>Loading members...</p>}
                {!isLoading && filtered?.length === 0 && (
                    <p className={styles.state}>No members in this committee.</p>
                )}
                {filtered?.map(m => (
                    <div key={m.membershipId} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.avatar}>
                                {m.firstName?.charAt(0).toUpperCase()}
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{m.firstName}</h3>
                                <p className={styles.username}>@{m.username}</p>
                            </div>
                            <span className={styles.badge}>{m.committeeName}</span>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.cardFooter}>
                            <div className={styles.footerItem}>
                                <span className={styles.footerLabel}>Role</span>
                                <span className={styles.footerValue}>{m.roleTitle}</span>
                            </div>
                            {m.discordTag && (
                                <div className={styles.footerItem}>
                                    <span className={styles.footerLabel}>Discord</span>
                                    <span className={styles.footerValue}>{m.discordTag}</span>
                                </div>
                            )}
                            <div className={styles.footerItem}>
                                <span className={styles.footerLabel}>Since</span>
                                <span className={styles.footerValue}>{new Date(m.startDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}