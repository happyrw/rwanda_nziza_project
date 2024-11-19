"use client";
import { useStateContext } from '@/context/stateContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import LoaderComponent from './loader';
import { UserAvatar } from './userProfile/avatar';
import { Button } from './ui/button';
import { Loader, LogOut } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useStateContext();
    const { status } = useSession();
    const [loadings, setLoadings] = useState(false);

    const handleLogout = async () => {
        setLoadings(true)
        await signOut({
            redirect: false,
        });
        window.location.reload();
    };

    const handleClick = () => {
        window.location.href = "/";
    };

    useEffect(() => {
        if (status === "authenticated" && user) {
            setLoading(false);
        } else if (status === "unauthenticated") {
            setLoading(false);
        }
    }, [status, user]);

    if (loading) {
        return <LoaderComponent />;
    };

    return (
        <div className='p-2 relative z-10'>
            <div className='bg-slate-300 p-2 flex rounded-xl'>
                <Image
                    src="/rwanda.png"
                    alt='logo'
                    width={250}
                    height={250}
                    className='w-[120px] object-cover -mt-2 cursor-pointer'
                    onClick={handleClick}
                />
                <div className='flex items-center ml-auto gap-3'>
                    {!user ? (
                        <>
                            <Link href="/sign-in" className='rounded-xl border-[1px] border-black px-4 py-2'>Sign in</Link>
                            <Link href="/sign-up" className='rounded-xl bg-black px-4 py-2 text-white'>Sign up</Link>
                        </>
                    ) : (
                        <>
                            <UserAvatar image={user.profile} user={user.username} />
                            <Button onClick={handleLogout} className="border-[1px] border-black w-full flex items-center gap-4">{loadings ? <Loader className="animate-spin" /> : (<LogOut />)} Logout</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
