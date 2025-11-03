

import Manager from '@/components/Manager'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
function App() {
  

  return (
    <div className='scroll-smooth'>
     
    <Navbar/>
    <div className='min-h-[85vh]'><Manager/></div>
    <Footer/>
    </div>
  )
}

export default App