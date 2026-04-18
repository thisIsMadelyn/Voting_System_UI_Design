import Icon from '../../../components/ui/Icon'
import styles from './EventItem.module.css'

const typeStyles = {
    ADVANCED_SKILLS_WORKSHOP: styles.typeWorkshop,
    CONGRESS: styles.typeCongress,
    EXCHANGE: styles.typeExchange,
    HOBOM: styles.typeHobom,
    IMW: styles.typeImw,
    LRM: styles.typeLrm,
    OPERATIONAL: styles.typeOperational,
    SUBOM: styles.typeSubom,
    WIBOM: styles.typeWibom,
    WORKSHOP: styles.typeWorkshop,
}

const typeLabels = {
    ADVANCED_SKILLS_WORKSHOP: 'Advanced Workshop',
    CONGRESS: 'Congress',
    EXCHANGE: 'Exchange',
    HOBOM: 'HOBOM',
    IMW: 'IMW',
    LRM: 'LRM',
    OPERATIONAL: 'Operational',
    SUBOM: 'SUBOM',
    WIBOM: 'WIBOM',
    WORKSHOP: 'Workshop',
}

export default function EventItem({ event }) {
    // Extract date components from startTime
    const startDate = new Date(event.startTime)
    const month = startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    const day = startDate.getDate()
    const time = startDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })

    return (
        <div className={styles.item}>
            <div className={styles.dateBlock}>
                <p className={styles.month}>{month}</p>
                <p className={styles.day}>{day}</p>
            </div>
            <div className={styles.body}>
                <p className={styles.title}>{event.title}</p>
                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        <Icon name="clock" size={10} /> {time}
                    </span>
                    <span className={styles.metaItem}>
                        <Icon name="mapPin" size={10} /> {event.hostingLC}
                    </span>
                </div>
            </div>
            <span className={`${styles.tag} ${typeStyles[event.type]}`}>
                {typeLabels[event.type]}
            </span>
        </div>
    )
}