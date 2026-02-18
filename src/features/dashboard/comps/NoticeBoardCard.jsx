import Card from '../../../components/ui/Card'
import NoticeItem from './NoticeItem'
import styles from './NoticedBoardCard.module.css'

export default function NoticeBoardCard({ notices }) {
    return (
        <Card title="Notice Board" subtitle="Latest announcements" action="Post" animDelay={430}>
            <div className={styles.list}>
                {notices.map(notice => (
                    <NoticeItem key={notice.id} notice={notice} />
                ))}
            </div>
        </Card>
    )
}