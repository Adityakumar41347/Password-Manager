"use client"
import React, { useLayoutEffect } from 'react'
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { updatePasswordsInDB } from '@/actions/useractions';
import { getPasswordsFromDB } from '@/actions/useractions';


import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const { data: session } = useSession()
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        const loadPasswords = async () => {
            if (session?.user?.email) {
                try {
                    const res = await fetch('/api/getpassword', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: session.user.email }),
                    });
                    const data = await res.json();
                    setpasswordArray(data.passwords || []);
                } catch (error) {
                    console.error('Failed to load passwords from DB:', error);
                }
            } else {
                const local = localStorage.getItem('passwords');
                if (local) {
                    setpasswordArray(JSON.parse(local));
                }
            }
        };

        loadPasswords();
    }, [session]);


    const showpass = (e) => {

        if (ref.current.src.includes("close.png")) {
            ref.current.src = "open.png"
            passwordref.current.type = "password"
        }
        else {
            ref.current.src = "close.png"
            passwordref.current.type = "text"
        }
    }

    const savepassword = async (e) => {
        if (form.password.length > 3 && form.username.length > 3 && form.site.length > 3) {
            toast('🦄 Wow password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light"
            });

            const updated = [...passwordArray, { ...form, id: uuidv4() }];
            setpasswordArray(updated);

            if (!session) {
                localStorage.setItem("passwords", JSON.stringify(updated));
            } else {
                await fetch('/api/updatepassword', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        passwordArray: updated,
                        email: session.user.email,
                    }),
                });
            }

            setform({ username: '', password: '', site: '' });
        } else {
            toast('Oops invalid user', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light"
            });
        }
    };
    const deletepassword = async (passwordId) => {
        try {
            const res = await fetch('/api/passwords/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: session?.user?.email, // from NextAuth
                    passwordId,
                }),
            });

            if (!res.ok) throw new Error('Failed to delete password');

            toast('🦄 password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            const updated = passwordArray.filter(item => item.id !== passwordId);
            setpasswordArray(updated);

        } catch (err) {
            toast.error('❌ Failed to delete password');
            console.error(err);
        }
    };

    const handlechange = (e) => {
        console.log(e.target.name)
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copytext = (text) => {
        toast('🦄 Wow text copied!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });


        navigator.clipboard.writeText(text)

    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 left-0 z-[-2] h-screen w-full overflow-hidden rotate-180 transform   from-white via-[#CFFFE1] to-[#1E293B]"></div>
            <div className="md:mycontainer  px-4 py-6">
                <h1 className='text-5xl font-extrabold text-center tracking-tight'>
                    <span className='text-[#00C896]'>&lt;</span>
                    <span className='text-slate-800'>Pass</span>
                    <span className='text-[#00C896]'>Op/&gt;</span>
                </h1>
                <p className='text-slate-600 text-xl text-center mt-2'>Your personal password vault</p>
                <div className='flex flex-col items-center gap-6 p-4 text-black'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter website URL' className='rounded-xl border border-slate-300 focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896] transition-all shadow-sm px-4 py-2 w-full' type="text" name='site' />
                    <div className="flex flex-col md:flex-row gap-5 w-full">
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='rounded-xl border border-slate-300 focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896] transition-all shadow-sm px-4 py-2 w-full md:w-[70%]' type="text" name='username' />
                        <div className="relative w-full">
                            <input ref={passwordref} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-xl border border-slate-300 focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896] transition-all shadow-sm px-4 py-2 w-full' type="password" name='password' />
                            <span className='absolute right-3 top-2'><img ref={ref} className='cursor-pointer w-6' src="open.png" alt="" onClick={showpass} /></span>
                        </div>
                    </div>
                    <button onClick={savepassword} className="flex justify-center items-center gap-2 bg-[#00C896] hover:bg-[#00b386] text-white px-6 py-3 rounded-full shadow-md transition-all">
                        <lord-icon src="https://cdn.lordicon.com/vjgknpfx.json" trigger="hover" />
                        <span className='font-semibold'>Add</span>
                    </button>
                </div>

                <div className="passwords mt-8">
                    <h2 className='font-bold text-2xl text-slate-800 px-2'>Your passwords</h2>
                    {passwordArray.length === 0 && <div className='text-slate-600 px-3'>No password to show</div>}
                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full rounded-xl overflow-hidden shadow-md mt-4">
                            <thead className='bg-[#00C896] text-white'>
                                <tr>
                                    <th className='p-3'>Sites</th>
                                    <th className='p-3'>Usernames</th>
                                    <th className='p-3'>Passwords</th>
                                    <th className='p-3'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-slate-200'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='py-2 px-4 text-center text-slate-700'>
                                            <div className='flex justify-between items-center'>
                                                <a className='text-blue-600 hover:underline' href={item.site} target='_blank'>{item.site}</a>
                                                <img className='w-5 cursor-pointer' onClick={() => copytext(item.site)} src="copy2.png" alt="" />
                                            </div>
                                        </td>
                                        <td className='py-2 px-4 text-center text-slate-700'>
                                            <div className='flex justify-between items-center'>
                                                <span>{item.username}</span>
                                                <img className='w-5 cursor-pointer' onClick={() => copytext(item.username)} src="copy2.png" alt="" />
                                            </div>
                                        </td>
                                        <td className='py-2 px-4 text-center text-slate-700'>
                                            <div className='flex justify-between items-center'>
                                                <span>{item.password}</span>
                                                <img className='w-5 cursor-pointer' onClick={() => copytext(item.password)} src="copy2.png" alt="" />
                                            </div>
                                        </td>
                                        <td className='py-2 px-4 text-center text-slate-700'>
                                            <div className='flex justify-center gap-4'>
                                                <span onClick={() => editpassword(item.id)}><img className='w-6' src="edit.png" alt="" /></span>
                                                <span onClick={() => deletepassword(item.id)}><img className='w-6' src="delete.png" alt="" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    )
}

export default Manager
