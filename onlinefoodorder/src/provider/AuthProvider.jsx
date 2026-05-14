import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setuser] = useState(null)
    return (
        <AuthContext.Provider value={{ user, setuser }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider

export function useAuthContext() {
    return useContext(AuthContext)
}