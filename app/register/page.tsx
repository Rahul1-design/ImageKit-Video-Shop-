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
        <div className="container mx-auto px-4 py-10">
            <h1 className="font-bold text-3xl mb-6 text-center">Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="max-w-md mx-auto space-y-3">
                    <input
                        className="input input-accent w-full"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="input input-accent w-full"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        className="input input-accent w-full"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button className="btn btn-primary w-full">
                        Register
                    </button>
                </div>
            </form>

            <p className="text-center mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-primary font-semibold hover:underline">
                    Login
                </a>
            </p>
        </div>

    )
}

export default page