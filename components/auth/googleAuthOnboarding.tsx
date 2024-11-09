"use client";
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { UploadButton } from '@/lib/uploadthing';
import Image from 'next/image';
import { Loader, X } from 'lucide-react';
import axios from 'axios';
import { useStateContext } from '@/context/stateContext';
import { useRouter } from 'next/navigation';

type AuthFormData = {
    username: string;
    email: string;
    profile: string;
};

const GoogleOnboarding = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState('');

    const { user } = useStateContext();
    const router = useRouter();
    useEffect(() => {
        if (user?.username) {
            router.push("/");
        };
    }, [user, router]);

    const onSubmit = async (data: AuthFormData) => {
        try {
            setError('');
            setSuccess('');
            setLoading(true);
            data.profile = imageUrl;
            data.email = (user as IUser).email;
            const response = await axios.post("/api/user/google-auth-update", data);
            if (response.data.error) {
                setError(response.data.error);
                setLoading(false);
                return;
            };
            if (response.data.message) {
                setLoading(false);
                window.location.replace("/");
            };
        } catch (error) {
            setError("Something went wrong while registering");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full md:w-[600px] bg-white mx-auto rounded-md my-5 shadow-lg mt-10'>
            <div className='py-10 px-2 md:px-10 lg:px-20 space-y-8 w-full'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <h2 className='font-bold'>Complete Your Login</h2>
                    <p className='text-black/50 text-sm'>One more step to complete</p>
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
                    </div>


                    {error && <p className="bg-red-700/15 text-red-700 p-2 text-sm">{error}</p>}
                    {success && <p className="bg-green-700/15 text-green-700 p-2 text-sm">{success}</p>}
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-sm bg-black text-white p-2 rounded-xl hover:bg-indigo-600 transition duration-300"
                    >
                        {loading ? <Loader className='animate-spin mx-auto' /> : "Update"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default GoogleOnboarding;
