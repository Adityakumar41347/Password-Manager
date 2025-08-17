import React, { useLayoutEffect } from 'react'
import { useEffect, useRef, useState } from 'react';

const Manager = () => {
    const ref = useRef()
    const passwordref=useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")

        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }



    }, [])

    const showpass = (e) => {
         
        if (ref.current.src.includes("close.png")) {
            ref.current.src = "open.png"
            passwordref.current.type="password"
        }
        else {
            ref.current.src = "close.png"
            passwordref.current.type="text"
        }
    }
    const savepassword = (e) => {

        setpasswordArray([...passwordArray, form]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])
    }
    const handlechange = (e) => {
        console.log(e.target.name)
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copytext=(text) => {
        alert("copy to clipbord")
        navigator.clipboard.writeText(text)
      
    }
    


    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
            <div className="   mycontainer">
                <h1 className='text-4xl font-bold text-center'><span className='text-green-500'>
                    &lt;
                </span>
                    Pass
                    <span className='text-green-500'>Op/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own password manage </p>
                <div className=' flex flex-col items-center gap-8 p-4 text-black'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter website url' className='bg-white rounded-full border border-green-600 w-full p-4 py-1' type="text" name='site' id='' />
                    <div className="flex gap-5 w-full">
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='bg-white rounded-full border border-green-600 w-[70%] p-4 py-1' type="text" name='username' id='' />
                        <div className="relative">

                            <input ref={passwordref} value={form.password} onChange={handlechange} placeholder='Enter Password' className='bg-white rounded-full border border-green-600 w-full p-4 py-1' type="password" name='password' id='' />
                            <span className='absolute right-2 py-1'><img ref={ref} className='cursor-pointer' src="open.png" alt="" onClick={showpass} />
                            </span>
                        </div>


                    </div>
                    <button onClick={savepassword} className="border:none; background:none; cursor:pointer; flex justify-center w-fit items-center bg-green-200 hover:bg-green-300 hover:cursor-pointer px-6 py-3 rounded-full">
                        <lord-icon className='text-3xl font-bold'
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"

                        >
                        </lord-icon>
                        <span className=''>Add</span>
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
                    {passwordArray.length === 0 && <div>no password to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className=' bg-green-800 text-white'>
                            <tr>
                                <th className='p-3'>Sites</th>
                                <th className='p-3'>Usernames</th>
                                <th className='p-3'>Passwords</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item,index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center  w-32'><div className='flex w-full justify-between'><a className='px-4' href="item.site" target='_blank'>{item.site}</a><img className='px-4 cursor-pointer' onClick={()=>{copytext(item.site)}} src="copy2.png" alt="" /></div></td>
                                    <td className='py-2 border border-white text-center w-32'><div className='flex w-full justify-between px-4'><div>{item.username}</div><img  className='px-4 cursor-pointer' onClick={()=>{copytext(item.username)}} src="copy2.png"  alt="" /></div></td>
                                    <td className='py-2 border border-white text-center w-32'><div className='flex w-full justify-between px-4'><div>{item.password}</div><img className='px-4 cursor-pointer' onClick={()=>{copytext(item.password)}} src="copy2.png"  alt="" /></div></td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>

            </div>
            
        </>
    )
}

export default Manager
