import { Navigate, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import { ToastContainer } from 'react-toastify'
import { createContext, useState } from 'react'
import Food from './pages/Food'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProvider from './provider/AuthProvider'

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} >
            <Route path='' element={<Food />} />
            <Route path='cart' element={<Cart />} />
            <Route path='profile' element={<Profile />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
