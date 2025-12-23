"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration Failed");
            }
            console.log(data);
            router.push("/login");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=''>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className=''>

                    <input className='input input-accent ' type="email" placeholder='Enter your email max-w-xs' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input className='input input-accent max-w-xs' type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <input className='input input-accent max-w-xs' type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <button className='btn' type='submit'>Register</button>
            </form>
            <div>
                <p>
                    Already have an account?
                    <a href="/login">Login</a>
                </p>
            </div>
        </div>
    )
}

export default page