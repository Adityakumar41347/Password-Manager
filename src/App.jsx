import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Manager from './components/Manager'
import Footer from './components/Footer'

import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <Navbar/>
    <div className='min-h-[85vh]'><Manager/></div>
    <Footer/>
    </>
  )
}

export default App
