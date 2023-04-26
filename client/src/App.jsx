import { useState } from 'react'
import './assets/styles/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './views/Login';
import Home from './views/Home';
import Mensualidad from './views/Mensualidad'
import LibroContable from './views/LibroContable'
import Reportes from './views/Reportes';
import Rep1 from './views/reportes/rep1';
import Rep2 from './views/reportes/rep2';
import Rep4 from './views/reportes/rep4';
import Rep5 from './views/reportes/rep5';
import Rep6 from './views/reportes/rep6';
import Rep7 from './views/reportes/rep7';
import Rep8 from './views/reportes/rep8';
import Rep9 from './views/reportes/rep9';
import Rep3 from './views/reportes/rep3';
import Usuarios from './views/Usuarios';
import CancelacionMatricula from './views/CancelacionMatricula';
import Cuentas from './views/cuentas';
import { Alumnos } from './views/Alumnos';
import Deudas from './views/deudas'

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
        <Route path="/mensualidad" element = {<Mensualidad />} />
        <Route path="/cancelacion" element = {<CancelacionMatricula />} />
        <Route path="/alumnos" element = {<Alumnos/>} />
        <Route path="/usuarios" element = {<Usuarios />} />
        <Route path="/reportes" element = {<Reportes />} />
        <Route path="/reportes/rep1" element = {<Rep1 />} />
        <Route path="/reportes/rep2" element = {<Rep2 />} />
        <Route path="/reportes/rep3" element = {<Rep3 />} />
        <Route path="/reportes/rep4" element = {<Rep4 />} />
        <Route path="/reportes/rep5" element = {<Rep5 />} />
        <Route path="/reportes/rep6" element = {<Rep6 />} />
        <Route path="/reportes/rep7" element = {<Rep7 />} />
        <Route path="/reportes/rep8" element = {<Rep8 />} />
        <Route path="/reportes/rep9" element = {<Rep9 />} />
        <Route path="/cuentas" element = {<Cuentas />} />
        <Route path="/deudas" element = {<Deudas />} />
      </Routes>
    </Router>
  )
}

export default App
