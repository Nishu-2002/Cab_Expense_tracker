import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CoffeeSnacks from './pages/CoffeeSnacks'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/coffee" element={<CoffeeSnacks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
