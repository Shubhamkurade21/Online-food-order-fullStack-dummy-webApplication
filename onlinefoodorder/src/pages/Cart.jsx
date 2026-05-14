import { useDispatch, useSelector } from "react-redux"
import { config } from "../services/config"
import { decrementQtyAction, emptyCartAction, incrementQtyAction } from "../slices/CartSlice"
import { useEffect, useState } from "react"
import { placeOrder } from "../services/order"
import { toast } from "react-toastify"

function Cart() {
    const cart = useSelector(store => store.cartReducer.cart)
    const [qty, setQty] = useState(0)
    const [totalBill, setTotalBill] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        let totalqty = 0
        let total = 0
        for (let c of cart) {
            totalqty += c.qty
            total += (c.price * c.qty)
        }
        setQty(totalqty)
        setTotalBill(total)
    }, [cart])

    const handlePlaceOrderClick = async () => {
        const token = window.sessionStorage.getItem('token')
        const orderdetails = { total: totalBill, items: cart }
        try {
            const response = await placeOrder(token, orderdetails)
            if (response.status == 'success') {
                toast.success('Order placed successfully')
                dispatch(emptyCartAction())
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div style={{ background: '#111', minHeight: '100vh', padding: '2rem' }}>
            {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#888', marginTop: '5rem', fontSize: 16 }}>
                    Your cart is empty
                </div>
            ) : (
                <div className="row">
                    {/* Cart Items */}
                    <div className="col-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {cart.map(c => (
                            <div key={c.fid} style={{
                                display: 'flex',
                                gap: 16,
                                background: '#1a1a1a',
                                border: '0.5px solid #2e2e2e',
                                borderRadius: 12,
                                overflow: 'hidden',
                                padding: 12,
                                alignItems: 'center'
                            }}>
                                <img
                                    src={config.BASE_URL_IMAGE + c.image}
                                    alt={c.name}
                                    style={{ width: 110, height: 90, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h5 style={{ color: '#f5f0e8', margin: '0 0 4px', fontSize: 16 }}>{c.name}</h5>
                                    <p style={{ color: '#e8a045', margin: '0 0 12px', fontSize: 14 }}>₹{c.price}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <button
                                            onClick={() => dispatch(decrementQtyAction(c.fid))}
                                            style={qtyBtnStyle}
                                        >−</button>
                                        <span style={{ color: '#f5f0e8', fontSize: 15, minWidth: 20, textAlign: 'center' }}>{c.qty}</span>
                                        <button
                                            onClick={() => dispatch(incrementQtyAction(c.fid))}
                                            style={qtyBtnStyle}
                                        >+</button>
                                    </div>
                                </div>
                                <div style={{ color: '#f5f0e8', fontWeight: 500, fontSize: 15, paddingRight: 8 }}>
                                    ₹{c.price * c.qty}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="col-4">
                        <div style={{
                            background: '#1a1a1a',
                            border: '0.5px solid #2e2e2e',
                            borderRadius: 12,
                            padding: '1.5rem',
                            position: 'sticky',
                            top: 80
                        }}>
                            <h5 style={{ color: '#f5f0e8', marginBottom: 20, fontSize: 18 }}>Order Summary</h5>

                            <div style={summaryRowStyle}>
                                <span style={{ color: '#888' }}>Items</span>
                                <span style={{ color: '#f5f0e8' }}>{cart.length}</span>
                            </div>
                            <div style={summaryRowStyle}>
                                <span style={{ color: '#888' }}>Quantity</span>
                                <span style={{ color: '#f5f0e8' }}>{qty}</span>
                            </div>
                            <div style={{ ...summaryRowStyle, borderTop: '0.5px solid #2e2e2e', paddingTop: 14, marginTop: 4 }}>
                                <span style={{ color: '#f5f0e8', fontWeight: 500 }}>Total</span>
                                <span style={{ color: '#e8a045', fontWeight: 600, fontSize: 16 }}>₹{totalBill}</span>
                            </div>

                            <button
                                onClick={handlePlaceOrderClick}
                                style={{
                                    marginTop: 20,
                                    width: '100%',
                                    background: '#e8a045',
                                    color: '#1a1a1a',
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '10px 0',
                                    fontWeight: 600,
                                    fontSize: 15,
                                    cursor: 'pointer'
                                }}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const qtyBtnStyle = {
    width: 28, height: 28,
    background: 'transparent',
    border: '0.5px solid #3a3a3a',
    color: '#e8a045',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const summaryRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 12,
    fontSize: 14
}

export default Cart