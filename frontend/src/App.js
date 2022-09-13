import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from "./Components/Home"
import Redirect from "./Components/Redirect"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/:linkId" element={<Redirect />} /> 
      </Routes>
    </Router>
  )
}

export default App
