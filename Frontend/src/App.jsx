import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Routes,Route } from 'react-router-dom'
import Auth from './pages/Auth.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import HomePage from './pages/Home.jsx'
import AuthProvider from './context/authcontext.jsx'
import './index.css'


function App() {
  

  return (
    <>
    <AuthProvider>
      <Header />
      
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      
      <Footer/>
    </AuthProvider>
    </>
  )
}

export default App
