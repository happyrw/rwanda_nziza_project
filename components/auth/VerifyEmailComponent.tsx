"use client";

import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const VerifyEmailComponent = () => {
    const [user, setUser] = React.useState(null);
    const [message, setMessage] = React.useState("Verifying your email...");
    const [loading, setLoading] = React.useState(true);
    const [buttonText, setButtonText] = React.useState('');

    const searchparams = useSearchParams();
    const token = searchparams.get('token');

    const onSubmit = useCallback(async () => {
        try {
            const response = await axios.post("/api/user/new-verification", { token });
            const { data } = response;
            if (data.error) {
                setMessage(data.error);
                setLoading(false);
                setButtonText("Try to login to generate a new verification token.");
            } else {
                setMessage("Thank you for verifying your email!");
                setLoading(false);
                setUser(data.user);
            }
        } catch (error) {
            console.error("Verification error:", error);
            setMessage("An error occurred while verifying your email.");
            setButtonText("Try to login to generate a new verification token.");
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Email Verification</h1>
                <p className="text-gray-600 mb-6">{message}</p>
                {user && (
                    <p className="text-gray-500 mb-8">
                        Your email has been successfully verified! You can now explore our features.
                    </p>
                )}
                {loading || buttonText ? (
                    <Link href="/sign-in"
                        className="bg-gray-300 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 ease-in-out"
                    >
                        {loading ? "Loading..." : buttonText}
                    </Link>
                ) : (
                    <Link
                        href="/sign-in"
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 ease-in-out"
                    >
                        Log in
                    </Link>
                )}
            </div>
        </div>
    );
}

export default VerifyEmailComponent;
