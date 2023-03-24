import { useState } from 'react'
import './assets/styles/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './views/Login';
import Home from './views/Home';
import LibroContable from './views/LibroContable'
import Reportes from './views/Reportes';
import Rep1 from './views/reportes/rep1';

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
        <Route path="/libroContable" element = {<LibroContable />} />
        <Route path="/reportes" element = {<Reportes />} />
        <Route path="/reportes/rep1" element = {<Rep1 />} />
      </Routes>
    </Router>
  )
}

export default App
