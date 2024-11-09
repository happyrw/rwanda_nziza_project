"use client";
import React from 'react'
// import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { UploadButton } from '@/lib/uploadthing';
import Image from 'next/image';
import { Loader, X } from 'lucide-react';
// import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
// googleLogout, useGoogleLogin

type LoginFormData = {
    username: string;
    email: string;
    password: string;
    profile: string;
};

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState('');

    const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError('');
            setSuccess('');
            setLoading(true);
            data.profile = imageUrl;
            const response = await axios.post("/api/user/createUser", data);
            if (response.data.error) {
                setError(response.data.error);
                setLoading(false);
                return;
            };
            if (response.data.message) {
                setSuccess(response.data.message);
                setLoading(false);
                return;
            };
        } catch (error) {
            setError("Something went wrong while registering");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleProvider = (event: React.MouseEvent<HTMLButtonElement>, value: "google") => {
        event.preventDefault();
        signIn(value, { callbackUrl: "/" });
    };

    const { data: Session } = useSession();
    if (Session?.user) {
        router.push("/");
    }

    return (
        <div className='w-full max-w-[600px] md:max-w-full md:w-full bg-white mx-auto md:p-2 rounded-md grid grid-cols-1 md:grid-cols-2 gap-5 my-5'>
            <div className='hiddeThisOne w-full rounded-xl md:flex flex-col items-center justify-center'>
                <div className='space-y-4 text-center'>
                    <h3 className='text-white text-3xl'>Get Started With Us</h3>
                    <p className='text-white/50'>Complete these easy steps to register <br /> your account</p>
                    <div className='flex flex-col gap-2'>
                        <button className='bg-white text-black w-[300px] flex items-center justify-start gap-3 px-4 py-2 rounded-md'><span className='bg-black/50 text-black/50 p-2 rounded-full w-5 h-5 flex items-center justify-center'>1</span>Sign up your account</button>
                        <button className='bg-black/50 text-white/50 w-[300px] flex items-center justify-start gap-3 px-4 py-2 rounded-md'><span className='bg-black/50 text-white/50 p-2 rounded-full w-5 h-5 flex items-center justify-center'>2</span>Interact with our app</button>
                        <button className='bg-black/50 text-white/50 w-[300px] flex items-center justify-start gap-3 px-4 py-2 rounded-md'><span className='bg-black/50 text-white/50 p-2 rounded-full w-5 h-5 flex items-center justify-center'>3</span>Leave us a like</button>
                    </div>
                </div>
            </div>
            <div className='py-10 px-2 md:px-10 lg:px-20 space-y-8 w-full'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <h2 className='font-bold'>Sign Up Account</h2>
                    <p className='text-black/50 text-sm'>Enter your personal data to create your account</p>
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
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Profile</label>
                        {imageUrl ? (
                            <div className='relative w-[70px] h-[70px]'>
                                <Image src={imageUrl} alt="profile" width="300" height="300" className="w-[70px] h-[70px]  rounded-full border-[1px] border-black object-cover" />
                                <button
                                    type="button"
                                    className="absolute bg-red-500 text-white rounded-full -right-[2px] -top-[2px] p-[2px] cursor-pointer"
                                    onClick={() => {
                                        setImageUrl("");
                                    }}
                                >
                                    <X className="text-white w-4 h-4 font-bold" />
                                </button>
                            </div>
                        ) : (
                            <UploadButton
                                endpoint="profileUploader"
                                onClientUploadComplete={(res) => {
                                    const uploadedFiles = res[0]?.url;;
                                    setImageUrl(uploadedFiles as any);
                                }}
                                onUploadError={(error) => {
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                        )}
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input
                            id="username"
                            type="text"
                            className={`w-full text-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-100 ${errors.username && 'border-red-500'}`}
                            {...register('username', { required: 'Username is required' })}
                        />
                        {/* {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>} */}
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            className={`w-full text-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-100 ${errors.email && 'border-red-500'}`}
                            {...register('email', { required: 'email is required' })}
                        />
                        {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>} */}
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
                    {error && <p className="bg-red-700/15 text-red-700 p-2 text-sm">{error}</p>}
                    {success && <p className="bg-green-700/15 text-green-700 p-2 text-sm">{success}</p>}
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-sm bg-black text-white p-2 rounded-xl hover:bg-indigo-600 transition duration-300"
                    >
                        {loading ? <Loader className='animate-spin mx-auto' /> : "Register Now"}
                    </button>
                </form>
                <p className='text-sm text-center relative -top-3'>Already have an account? <Link className='font-bold underline underline-offset-4 hover:no-underline' href="/sign-in">Log in</Link></p>
            </div>
        </div>
    )
}

export default SignUp;
