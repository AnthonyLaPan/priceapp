'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { email, password };

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (response.ok) {
                router.push("/dashboard");
            }
            else {
                const data = await response.json();
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
            setErrorMessage("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                        <div className="text-red-500 text-center">{errorMessage}</div>
                    )}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500, text-gray-700"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500, text-gray-700"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember" className="text-gray-600">Remember me</label>
                        </div>
                        <a href="#" className="text-blue-500 text-sm">Forgot Password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Log In
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">Don't have an account? <a href="#" className="text-blue-500">Sign up</a></p>
                </div>
            </div>
        </div>
    );
}
