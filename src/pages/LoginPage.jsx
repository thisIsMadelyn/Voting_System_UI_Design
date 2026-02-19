import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../services/authStore'
import styles from './LoginPage.module.css'

export default function LoginPage() {
    const navigate = useNavigate()
    const { login, isLoading, error, clearError } = useAuthStore()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        clearError()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(formData)
            navigate('/') // Redirect to dashboard on success
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            // Error is handled by the store
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6BAE78" strokeWidth="1.8">
                            <path d="M12 2L3 7l9 5 9-5-9-5z"/>
                            <path d="M3 12l9 5 9-5"/>
                            <path d="M3 17l9 5 9-5"/>
                        </svg>
                    </div>
                    <h1 className={styles.title}>Student Council</h1>
                    <p className={styles.subtitle}>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}

                    <div className={styles.field}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={styles.button}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    )
}