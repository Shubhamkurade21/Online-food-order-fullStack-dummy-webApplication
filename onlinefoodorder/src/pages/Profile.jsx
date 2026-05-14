import { toast } from "react-toastify"
import { getUser, updateUser } from "../services/user"
import { useEffect, useState } from "react"

function Profile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const getUserProfile = async () => {
        const token = window.sessionStorage.getItem('token')
        const response = await getUser(token)
        if (response.status == 'success') {
            setName(response.data.name)
            setEmail(response.data.email)
            setPhone(response.data.phone)
        } else {
            toast.error(response.error)
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    const handleUpdateClick = async () => {
        const token = window.sessionStorage.getItem('token')
        const response = await updateUser(token, phone)
        if (response.status == 'success')
            toast.success('Profile updated successfully')
        else
            toast.error(response.error)
    }

    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <div style={{ background: '#111', minHeight: '100vh', padding: '2rem' }}>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
                <div style={{
                    background: '#1a1a1a',
                    border: '0.5px solid #2e2e2e',
                    borderRadius: 14,
                    padding: '2rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        marginBottom: '2rem', paddingBottom: '1.5rem',
                        borderBottom: '0.5px solid #2e2e2e'
                    }}>
                        <div style={{
                            width: 52, height: 52, borderRadius: '50%',
                            background: '#2a2a2a', border: '0.5px solid #3a3a3a',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 500, fontSize: 18, color: '#e8a045', flexShrink: 0
                        }}>
                            {initials}
                        </div>
                        <div>
                            <p style={{ margin: 0, fontWeight: 500, fontSize: 18, color: '#f5f0e8' }}>
                                {name || 'Your Profile'}
                            </p>
                            <p style={{ margin: 0, fontSize: 13, color: '#888' }}>Account settings</p>
                        </div>
                    </div>

                    {/* Fields */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 13, fontWeight: 500, color: '#888' }}>
                                Name
                                <span style={{
                                    fontSize: 11, color: '#555', background: '#2a2a2a',
                                    borderRadius: 4, padding: '1px 6px', marginLeft: 6
                                }}>read only</span>
                            </label>
                            <div style={{
                                background: '#222', border: '0.5px solid #2e2e2e',
                                borderRadius: 8, padding: '9px 12px',
                                fontSize: 14, color: '#f5f0e8'
                            }}>
                                {name}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label style={{ fontSize: 13, fontWeight: 500, color: '#888' }}>
                                Email
                                <span style={{
                                    fontSize: 11, color: '#555', background: '#2a2a2a',
                                    borderRadius: 4, padding: '1px 6px', marginLeft: 6
                                }}>read only</span>
                            </label>
                            <div style={{
                                background: '#222', border: '0.5px solid #2e2e2e',
                                borderRadius: 8, padding: '9px 12px',
                                fontSize: 14, color: '#f5f0e8'
                            }}>
                                {email}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <label htmlFor="phone" style={{ fontSize: 13, fontWeight: 500, color: '#888' }}>
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                style={{
                                    background: '#222', border: '0.5px solid #3a3a3a',
                                    borderRadius: 8, padding: '9px 12px',
                                    fontSize: 14, color: '#f5f0e8',
                                    outline: 'none', width: '100%', boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button
                            onClick={handleUpdateClick}
                            style={{
                                background: '#e8a045', color: '#1a1a1a',
                                border: 'none', borderRadius: 8,
                                padding: '9px 20px', fontSize: 14,
                                fontWeight: 600, cursor: 'pointer'
                            }}
                        >
                            Update profile
                        </button>
                        <span style={{ fontSize: 13, color: '#555' }}>Only phone number can be changed.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile