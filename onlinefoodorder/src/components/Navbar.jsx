import { Link, useNavigate } from "react-router"
import logo from '../assets/logo.svg'
import { useAuthContext } from "../provider/AuthProvider"
import { useSelector } from "react-redux"

function Navbar() {
    const navigate = useNavigate()
    const { setuser } = useAuthContext()
    const cart = useSelector(store => store.cartReducer.cart)

    return (
        <nav style={{
            background: '#1a1a1a',
            borderBottom: '0.5px solid #2e2e2e',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            {/* Logo */}
            <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <img
                    src={logo}
                    alt="BiteBay"
                    style={{
                        height: 56,
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                    }}
                />
            </Link>

            {/* Nav links */}
            <ul style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
            }}>
                <li>
                    <Link to="/home/cart" style={linkStyle}>
                        <CartIcon />
                        <span>Cart</span>
                        {cart.length > 0 && (
                            <span style={badgeStyle}>{cart.length}</span>
                        )}
                    </Link>
                </li>
                <li>
                    <Link to="/home/orders" style={linkStyle}>Orders</Link>
                </li>
                <li>
                    <Link to="/home/profile" style={linkStyle}>Profile</Link>
                </li>
                <li>
                    <button
                        onClick={() => {
                            setuser(null)
                            window.sessionStorage.removeItem('token')
                            navigate('/')
                        }}
                        style={logoutStyle}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    )
}

const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: '#ccc',
    textDecoration: 'none',
    fontSize: 14,
    padding: '6px 12px',
    borderRadius: 8,
    position: 'relative',
}

const badgeStyle = {
    background: '#e8a045',
    color: '#1a1a1a',
    fontSize: 11,
    fontWeight: 500,
    borderRadius: 10,
    padding: '1px 6px',
    minWidth: 18,
    textAlign: 'center',
}

const logoutStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'transparent',
    border: '0.5px solid #3a3a3a',
    cursor: 'pointer',
    color: '#e8a045',
    fontSize: 14,
    padding: '6px 14px',
    borderRadius: 8,
}

function CartIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
    )
}

export default Navbar