import styles from './NoticeIten.module.css'

export default function NoticeItem({ notice }) {
    // Split text to bold the first part
    const parts = notice.text.split(notice.bold)

    return (
        <div className={styles.item}>
            <div className={styles.dot} style={{ background: notice.color }} />
            <div>
                <div className={styles.text}>
                    {parts[0] && parts[0]}
                    <strong>{notice.bold}</strong>
                    {parts[1] && parts[1]}
                </div>
                <div className={styles.time}>
                    {notice.time} · {notice.author}
                </div>
            </div>
        </div>
    )
}