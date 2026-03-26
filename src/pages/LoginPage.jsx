import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../services/authStore'
import styles from './LoginPage.module.css'
import eesteclogo from '../assets/eestec.logo.png'

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
                        <img />
                    </div>
                    <h1 className={styles.title}>EESTEC</h1>
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