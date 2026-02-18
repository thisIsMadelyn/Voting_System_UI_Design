import Icon from '../../../components/ui/Icon'
import styles from './EventsItem.module.css'

const tagStyles = {
    council: styles.tagCouncil,
    urgent: styles.tagUrgent,
    social: styles.tagSocial,
    general: styles.tagGeneral,
}

const tagLabels = {
    council: 'Council',
    urgent: 'Mandatory',
    social: 'Social',
    general: 'General',
}

export default function EventItem({ event }) {
    return (
        <div className={styles.item}>
            <div className={styles.dateBlock}>
                <p className={styles.month}>{event.month}</p>
                <p className={styles.day}>{event.day}</p>
            </div>
            <div className={styles.body}>
                <p className={styles.title}>{event.title}</p>
                <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Icon name="clock" size={10} /> {event.time}
          </span>
                    <span className={styles.metaItem}>
            <Icon name="mapPin" size={10} /> {event.location}
          </span>
                </div>
            </div>
            <span className={`${styles.tag} ${tagStyles[event.tag]}`}>
        {tagLabels[event.tag]}
      </span>
        </div>
    )
}