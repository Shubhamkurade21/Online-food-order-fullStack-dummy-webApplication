import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCartAction } from '../slices/CartSlice'
import { config } from '../services/config'

function FoodCard({ food }) {
    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(addToCartAction(food))
    }

    return (
        <div className='col-3' style={{ display: 'flex', padding: '0.5rem' }}>
            <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                background: '#1a1a1a',
                border: '0.5px solid #2e2e2e',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.6)'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'
                }}
            >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                        src={config.BASE_URL_IMAGE + food.image}
                        alt={food.name}
                        style={{
                            width: '100%', height: 190, objectFit: 'cover',
                            display: 'block', transition: 'transform 0.3s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {/* Gradient overlay */}
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        height: 60,
                        background: 'linear-gradient(to top, #1a1a1a, transparent)'
                    }} />
                    {/* Price badge */}
                    <span style={{
                        position: 'absolute', top: 12, right: 12,
                        background: 'rgba(26,26,26,0.85)',
                        backdropFilter: 'blur(6px)',
                        color: '#e8a045',
                        fontSize: 13, fontWeight: 600,
                        padding: '4px 12px', borderRadius: 20,
                        border: '0.5px solid #3a3a3a'
                    }}>
                        ₹{food.price}
                    </span>
                </div>

                {/* Body */}
                <div style={{
                    padding: '1rem 1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    gap: 8
                }}>
                    <h5 style={{
                        color: '#f5f0e8', fontSize: 15,
                        fontWeight: 600, margin: 0, letterSpacing: 0.2
                    }}>
                        {food.name}
                    </h5>

                    <p style={{
                        color: '#666', fontSize: 12.5, lineHeight: 1.7,
                        margin: 0, flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {food.description}
                    </p>

                    <button
                        onClick={addToCart}
                        style={{
                            width: '100%', textAlign: 'center',
                            background: 'transparent',
                            border: '0.5px solid #e8a045',
                            color: '#e8a045', borderRadius: 8, fontSize: 13.5,
                            fontWeight: 500,
                            padding: '9px 0', cursor: 'pointer',
                            marginTop: 4,
                            transition: 'background 0.2s, color 0.2s',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: 6
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = '#e8a045'
                            e.currentTarget.style.color = '#1a1a1a'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.color = '#e8a045'
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FoodCard