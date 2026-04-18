import Card from '../../../components/ui/Card'
import OpenPoll from './OpenPoll'
import ClosedPoll from './ClosedPoll'
import styles from './PollCard.module.css'

export default function PollsCard({ polls }) {
    return (
        <Card title="Polls" subtitle="Open votes & latest closed results" action="+ New poll" animDelay={280}>
            <div className={styles.list}>
                {polls.map(poll => (
                    poll.status === 'open'
                        ? <OpenPoll key={poll.id} poll={poll} />
                        : <ClosedPoll key={poll.id} poll={poll} />
                ))}
            </div>
        </Card>
    )
}