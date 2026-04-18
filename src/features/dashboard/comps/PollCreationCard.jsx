import { useState } from 'react'
import { useCreatePoll } from '../../../hooks/usePolls'
import styles from './PollCreationCard.module.css'

const MAJORITY_TYPES = ['ABSOLUTE', 'TWO_THIRDS', 'RELATIVE']

export default function PollCreationCard({ moderatorId }) {
    const {mutate: createPoll, isPending, isSuccess, isError, error} = useCreatePoll()

    const [form, setForm] = useState({
        title: '',
        description: '',
        meetingId: '',
        majorityType: 'ABSOLUTE',
        electoralBodyCount: '',
        candidateNames: [''],
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleCandidateChange = (index, value) => {
        const updated = [...form.candidateNames]
        updated[index] = value
        setForm({...form, candidateNames: updated})
    }

    const addCandidate = () => {
        setForm({...form, candidateNames: [...form.candidateNames, '']})
    }

    const removeCandidate = (index) => {
        const updated = form.candidateNames.filter((_, i) => i !== index)
        setForm({...form, candidateNames: updated})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createPoll({
            moderatorId,
            pollData: {
                ...form,
                meetingId: Number(form.meetingId),
                electoralBodyCount: Number(form.electoralBodyCount),
                candidateNames: form.candidateNames.filter(name => name.trim() !== ''),
            }
        })
    }

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Polls</h1>
                    <p className={styles.subtitle}>Create a new poll for your meeting</p>
                </div>
            </div>

            <div className={styles.card}>
                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className={styles.label}>Title</label>
                            <input
                                className={styles.input}
                                name="title"
                                placeholder="Poll title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Meeting ID</label>
                            <input
                                className={styles.input}
                                name="meetingId"
                                type="number"
                                placeholder="e.g. 4"
                                value={form.meetingId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Description</label>
                        <input
                            className={styles.input}
                            name="description"
                            placeholder="What is this poll about?"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className={styles.label}>Majority Type</label>
                            <select
                                className={styles.select}
                                name="majorityType"
                                value={form.majorityType}
                                onChange={handleChange}
                            >
                                {MAJORITY_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Electoral Body Count</label>
                            <input
                                className={styles.input}
                                name="electoralBodyCount"
                                type="number"
                                placeholder="e.g. 20"
                                value={form.electoralBodyCount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Candidates</label>
                        <div className={styles.candidateList}>
                            {form.candidateNames.map((name, index) => (
                                <div key={index} className={styles.candidateRow}>
                                    <input
                                        className={styles.input}
                                        placeholder={`Candidate ${index + 1}`}
                                        value={name}
                                        onChange={(e) => handleCandidateChange(index, e.target.value)}
                                    />
                                    {form.candidateNames.length > 1 && (
                                        <button
                                            type="button"
                                            className={styles.removeBtn}
                                            onClick={() => removeCandidate(index)}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" className={styles.addBtn} onClick={addCandidate}>
                                + Add Candidate
                            </button>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        {isSuccess && <span className={styles.success}>Poll created successfully!</span>}
                        {isError &&
                            <span className={styles.error}>{error?.response?.data || 'Something went wrong'}</span>}
                        <button type="submit" className={styles.submitBtn} disabled={isPending}>
                            {isPending ? 'Creating...' : 'Create Poll'}
                        </button>
                    </div>

                </form>
            </div>
        </main>
    )
}