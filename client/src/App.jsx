import { useState } from 'react'
import './assets/styles/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login />
    <h1>fsds</h1>
    </>
  )
}

export default App
