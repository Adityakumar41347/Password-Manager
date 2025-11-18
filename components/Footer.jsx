"use client"
import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-slate-700 text-white p-1 '>
            <div>
                <div className="logo font-bold text-2xl">
                    <span className='text-green-500'>
                        &lt;
                    </span>
                    Pass
                    <span className='text-green-500'>Op/&gt;</span>
                </div>
            </div>
            <div className='flex text-white text-xl'>Created with  <img className='w-5 mix-blend-multiply' src="heart.gif" alt="" /> </div>

        </div>
    )
}

export default Footer
