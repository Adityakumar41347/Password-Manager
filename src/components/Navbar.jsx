import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer  flex  justify-between items-center h-14 py-5 px-4">

        <div className="logo font-bold text-2xl">
          <span className='text-green-500'>
            &lt;
          </span>
          Pass
          <span className='text-green-500'>Op/&gt;</span>
        </div>
        
        <button className='flex text-white bg-green-800 my-5 rounded-full justify-between items-center'>
          <img className='invert w-10 p-1' src="github.png" alt="github" />
          <div className='font-bold px-2'>Github</div>
        </button>
 
      </div>
    </nav>
  )
}

export default Navbar
