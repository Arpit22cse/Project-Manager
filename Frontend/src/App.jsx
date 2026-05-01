import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Routes,Route } from 'react-router-dom'
import Auth from './pages/Auth.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import HomePage from './pages/Home.jsx'
import AuthProvider from './context/authcontext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './index.css'


function App() {
  

  return (
    <>
    <AuthProvider>
      <Header />
      
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
        </Routes>
      
      <Footer/>
    </AuthProvider>
    </>
  )
}

export default App
