import { useState } from 'react'
import Icon from '../../../components/ui/Icon'
import styles from './OpenPoll.module.css'

export default function OpenPoll({ poll }) {
    const [selected, setSelected] = useState(null)

    return (
        <div className={styles.poll}>
            <div className={styles.header}>
                <p className={styles.question}>{poll.question}</p>
                <span className={styles.statusOpen}>● Open</span>
            </div>
            <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Icon name="users" size={11} /> {poll.voted} / {poll.total} voted
        </span>
                <span className={styles.metaItem}>
          <Icon name="clock" size={11} /> Closes {poll.closesDate}
        </span>
            </div>
            <div className={styles.options}>
                {poll.options.map(opt => (
                    <button
                        key={opt}
                        onClick={e => { e.stopPropagation(); setSelected(opt) }}
                        className={`${styles.option} ${selected === opt ? styles.optionSelected : ''}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    )
}