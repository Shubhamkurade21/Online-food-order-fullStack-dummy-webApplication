import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { useAuthContext } from '../provider/AuthProvider'

function ProtectedRoute({ children }) {
    // const { user } = useContext(AuthContext)
    const { user } = useAuthContext() // custom hook
    return user ? children : <Navigate to='/' />
}

export default ProtectedRoute
