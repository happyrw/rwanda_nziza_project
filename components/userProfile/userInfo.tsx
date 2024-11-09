"use client";

import { useStateContext } from "@/context/stateContext";
import Image from "next/image";

export const UserInfo = () => {
    const { user } = useStateContext();
    return (
        <div className="flex items-center justify-center w-full flex-col">
            {user?.profile && <Image
                src={user?.profile}
                alt="User avatar"
                width={50}
                height={50}
                className="w-20 h-20 rounded-full mx-auto object-cover"
            />}
            <h2 className="text-xl font-medium text-gray-800">@{user?.username}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <span className="text-sm text-gray-500 font-medium uppercase">Role: {user?.role}</span>
        </div>
    )
}