"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            console.log(result.error);
        }
        else {
            router.push("/");
        }
    }
    return (
        <div className='min-h-screen flex flex-col justify-center '>

            <div className='min-h-[50vh] container lg:max-w-md flex flex-col items-center justify-center mx-auto border-3 border-purple-300'>
                <h1 className='font-bold text-3xl text-center'>Log in</h1>
                <form onSubmit={handleSubmit}>
                    <div className='my-2 flex flex-col '>
                        <input className='m-2 py-2 px-4 max-w-lg mx-auto border border-pink-600' type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />

                        <input className='m-2 py-2 px-4 max-w-lg mx-auto border border-pink-600' type="password" value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />

                        <button type='submit' className=' bg-pink-400 rounded-xl w-[50%] mx-auto py-1 mt-2 cursor-pointer hover:brightness-85'>Login</button>
                    </div>
                </form>
                <div className='text-center '>
                    Don't have an account?
                    <button className='text-purple-600 hover:underline cursor-pointer' onClick={() => router.push('/register')}> &nbsp; Register</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage