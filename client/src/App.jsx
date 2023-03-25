import { useState } from 'react'
import './assets/styles/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './views/Login';
import Home from './views/Home';
import LibroContable from './views/LibroContable'
import Reportes from './views/Reportes';
import Rep1 from './views/reportes/rep1';
import Rep2 from './views/reportes/rep2';
import Rep4 from './views/reportes/rep4';
import Rep5 from './views/reportes/rep5';
import Rep6 from './views/reportes/rep6';

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
        <Route path="/reportes/rep2" element = {<Rep2 />} />
        <Route path="/reportes/rep4" element = {<Rep4 />} />
        <Route path="/reportes/rep5" element = {<Rep5 />} />
        <Route path="/reportes/rep6" element = {<Rep6 />} />
      </Routes>
    </Router>
  )
}

export default App
