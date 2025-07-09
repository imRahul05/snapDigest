import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AdaptiveNewsReader from './components/AdaptiveNewsReader'
import About from './Pages/About'
import Navbar from './components/Navbar'
import './styles/styles.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<AdaptiveNewsReader />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App