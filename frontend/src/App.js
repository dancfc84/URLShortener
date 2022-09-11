import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from "./Components/Home"
import EditLinks from "./Components/EditLinks"
import Redirect from "./Components/Redirect"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/editlinks" element={<EditLinks />} />
        <Route path="/:linkId" element={<Redirect />} /> 
      </Routes>
    </Router>
  )
}

export default App
