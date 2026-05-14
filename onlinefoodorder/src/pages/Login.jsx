import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { loginUser } from "../services/user"
import { toast } from "react-toastify"
import { useAuthContext } from "../provider/AuthProvider"

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111',
        fontFamily: 'sans-serif',
    },
    card: {
        background: '#1a1a1a',
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        border: '0.5px solid #2e2e2e',
        padding: '2.5rem 2rem',
        width: '100%',
        maxWidth: '420px',
    },
    heading: {
        fontWeight: 600,
        fontSize: '1.6rem',
        marginBottom: '0.25rem',
        color: '#f5f0e8',
        letterSpacing: '-0.5px',
    },
    subtext: {
        color: '#666',
        fontSize: '0.9rem',
        marginBottom: '1.75rem',
    },
    label: {
        fontWeight: 500,
        fontSize: '0.82rem',
        color: '#888',
        marginBottom: '0.3rem',
        display: 'block',
        letterSpacing: '0.3px',
    },
    input: {
        width: '100%',
        padding: '0.65rem 0.9rem',
        borderRadius: 8,
        border: '0.5px solid #3a3a3a',
        background: '#222',
        color: '#f5f0e8',
        fontSize: '0.95rem',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
    },
    registerRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.88rem',
        color: '#666',
        marginBottom: '1.25rem',
    },
    link: {
        color: '#e8a045',
        fontWeight: 500,
        textDecoration: 'none',
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        background: '#e8a045',
        color: '#1a1a1a',
        border: 'none',
        borderRadius: 8,
        fontSize: '0.95rem',
        fontWeight: 700,
        cursor: 'pointer',
        letterSpacing: '0.3px',
        transition: 'opacity 0.2s',
    },
}

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setuser } = useAuthContext()
    const navigate = useNavigate()

    const handleSigninClick = async () => {
        try {
            const response = await loginUser(email, password)
            if (response.status == 'success') {
                toast.success('Login successful')
                setuser({ phone: response.data.phone })
                window.sessionStorage.setItem('token', response.data.token)
                navigate('/home/')
            } else
                toast.error(response.error)
        } catch (error) {
            window.alert(error)
        }
    }

    return (
        <div style={styles.page}>
            <div style={styles.card}>

                {/* Header */}
                <h2 style={styles.heading}>Welcome back</h2>
                <p style={styles.subtext}>Sign in to your account</p>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        style={styles.input}
                        placeholder="Enter your email"
                        onChange={e => setEmail(e.target.value)}
                        onFocus={e => e.target.style.borderColor = '#e8a045'}
                        onBlur={e => e.target.style.borderColor = '#3a3a3a'}
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        style={styles.input}
                        placeholder="Enter your password"
                        onChange={e => setPassword(e.target.value)}
                        onFocus={e => e.target.style.borderColor = '#e8a045'}
                        onBlur={e => e.target.style.borderColor = '#3a3a3a'}
                    />
                </div>

                {/* Register link */}
                <div style={styles.registerRow} className="mb-3">
                    <span>Don't have an account?</span>
                    <Link to='/register' style={styles.link}>Register here</Link>
                </div>

                {/* Submit */}
                <button
                    style={styles.button}
                    onClick={handleSigninClick}
                    onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default Login