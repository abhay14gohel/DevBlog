import { useState } from 'react'
import logo from './assets/devblog_logo.png'

import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './Components/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' min-h-screen '>
    
   <Navbar />
    </div>
  )
}

export default App
