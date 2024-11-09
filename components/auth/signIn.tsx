"use client";
// import Image from 'next/image';
import React from 'react'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Loader } from 'lucide-react';
// import axios from 'axios';
// import { GoogleLogin, } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc"
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';

type LoginFormData = {
    email: string;
    password: string;
};

const SignIn = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError('');
            setSuccess('');
            setLoading(true);
            const response = await signIn('credentials', { email: data.email, password: data.password, redirect: false, });
            if (response?.ok) {
                setSuccess("Welcome back!")
                toast.success("Welcome!");
                setTimeout(() => {
                    window.location.replace("/");
                }, 3000);
            } else if (response?.status === 403) {
                toast.error("Email verification is required")
                setSuccess("Please, verify your email address");
                setLoading(false);
            } else if (response?.status === 401) {
                setError("Invalid credentials");
                setLoading(false);
            } else if (response?.error) {
                setError(response.error);
                setLoading(false);
            } else {
                setError("Something went wrong");
                setLoading(false);
            }

        } catch (error) {
            setError("Something went wrong while logging in");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleProvider = (event: React.MouseEvent<HTMLButtonElement>, value: "google") => {
        event.preventDefault();
        signIn(value, { callbackUrl: "/" });
    }

    return (
        <div className='w-full max-w-[600px] md:max-w-full md:w-full bg-white mx-auto md:p-2 rounded-md grid grid-cols-1 md:grid-cols-2 gap-5 my-5'>
            <div className='relative hideThisOne w-full rounded-xl md:flex flex-col items-center justify-center'>
                <Image src="/imag.jpg" alt="" fill className='rounded-xl' />
                <div className='bg-black/50 absolute top-0 left-0 right-0 bottom-0 z-20 rounded-xl' />
                <div className='bg-black/50 absolute top-0 left-0 right-0 bottom-0 z-30 rounded-xl p-5 flex flex-col justify-between'>
                    <div className='flex items-end gap-5'>
                        <h1 className='text-white text-md uppercase'>rwanda nziza</h1>
                        <div className='bg-white w-[200px] h-[1px] rounded-xl relative -top-2' />
                    </div>
                    <div>
                        <p className='text-gray-300 text-sm'>
                            <span className='text-white text-4xl capitalize'>We&apos;re <br /> excited to <br /> have you here.</span> <br /> <br /> <br /> Log in to explore and manage your account, and stay connected with everything you love. If you&apos;re new, join us and become part of a vibrant community!
                        </p>
                    </div>
                </div>
            </div>

            <div className='py-10 px-2 md:px-10 lg:px-20 space-y-8 w-full'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <h2 className='font-bold'>Welcome back</h2>
                    <p className='text-black/50 text-sm'>Enter your email and password to access your account</p>
                </div>
                <div className='flex w-full items-center justify-center'>
                    <Button onClick={(e) => handleProvider(e, "google")} className='border-[1px] border-black/15 w-full text-md'><FcGoogle className='text-xl mr-5' />Google</Button>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-black/15 w-full h-[1px]' />
                    <p>or</p>
                    <div className='bg-black/15 w-full h-[1px]' />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            className={`w-full text-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-100 ${errors.email && 'border-red-500'}`}
                            {...register('email', { required: 'email is required' })}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            id="password"
                            type="password"
                            className={`w-full text-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-100 ${errors.password && 'border-red-500'}`}
                            {...register('password', { required: 'Password is required' })}
                        />
                    </div>
                    <div className='w-full flex justify-end'>
                        <Link href="/forgot-password">
                            <p className='text-sm text-gray-500 hover:text-gray-800'>Forgot Password?</p>
                        </Link>
                    </div>
                    {error && <p className="font-bold bg-red-700/15 text-red-700 p-2 text-[9px] rounded-md">{error}</p>}
                    {success && <p className="font-bold bg-green-700/15 text-green-700 p-2 rounded-md">{success}</p>}
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-sm font-bold bg-black text-white p-2 rounded-xl hover:bg-indigo-600 transition duration-300"
                    >
                        {loading ? <Loader className='animate-spin mx-auto' /> : "Log in"}
                    </button>
                </form>
                <p className='text-sm text-center relative -top-3'>Already have an account? <Link className='font-bold underline underline-offset-4 hover:no-underline' href="/sign-up">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default SignIn;
