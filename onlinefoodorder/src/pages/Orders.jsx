import { toast } from "react-toastify"
import { getOrders } from "../services/order"
import { useState, useEffect } from "react"

function Orders() {
    const [orders, setOrders] = useState([])

    const getAllOrders = async () => {
        const token = window.sessionStorage.getItem('token')
        const response = await getOrders(token)
        if (response.status == 'success') {
            setOrders(response.data)
        } else {
            toast.error(response.error)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <div style={{ background: '#111', minHeight: '100vh', padding: '2rem' }}>
            <div style={{ maxWidth: 780, margin: '0 auto' }}>

                <h5 style={{ color: '#f5f0e8', fontWeight: 500, marginBottom: '1.5rem', fontSize: 20 }}>
                    Your Orders
                </h5>

                {orders.length === 0 ? (
                    <div style={{
                        textAlign: 'center', color: '#888',
                        marginTop: '5rem', fontSize: 15
                    }}>
                        No orders placed yet
                    </div>
                ) : (
                    <div style={{
                        background: '#1a1a1a',
                        border: '0.5px solid #2e2e2e',
                        borderRadius: 14,
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                    }}>
                        {/* Table header */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr 1fr',
                            padding: '12px 20px',
                            borderBottom: '0.5px solid #2e2e2e',
                            background: '#222'
                        }}>
                            <span style={{ fontSize: 12, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}>Order ID</span>
                            <span style={{ fontSize: 12, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}>Date</span>
                            <span style={{ fontSize: 12, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}>Total</span>
                        </div>

                        {/* Rows */}
                        {orders.map((o, index) => (
                            <div
                                key={o.oid}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 2fr 1fr',
                                    padding: '14px 20px',
                                    alignItems: 'center',
                                    borderBottom: index !== orders.length - 1 ? '0.5px solid #2e2e2e' : 'none',
                                    background: index % 2 === 0 ? '#1a1a1a' : '#1e1e1e'
                                }}
                            >
                                <span style={{
                                    fontSize: 13, color: '#e8a045',
                                    fontWeight: 500
                                }}>
                                    #{o.oid}
                                </span>
                                <span style={{ fontSize: 13, color: '#888' }}>
                                    {new Date(o.odate).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </span>
                                <span style={{ fontSize: 14, color: '#f5f0e8', fontWeight: 500 }}>
                                    ₹{o.total}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders