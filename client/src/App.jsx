import { useState } from 'react'
import './assets/styles/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login />
    </>
  )
}

export default App
