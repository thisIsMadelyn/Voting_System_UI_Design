import Icon from './Icon'
import styles from './SearchBar.module.css'

export default function SearchBar({ placeholder = 'Search…' }) {
    return (
        <div className={styles.search}>
            <Icon name="search" size={13} className={styles.icon} />
            <input type="text" placeholder={placeholder} className={styles.input} />
        </div>
    )
}