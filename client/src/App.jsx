import { useState } from 'react'
import './assets/styles/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './views/Login';
import Home from './views/Home';

function App() {

  return (
    <Router>
      <Routes>
      {/* <Route
          path="/"
          element={isLogged ? <Home token={local_token} /> : <Login />}
      /> */}
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
