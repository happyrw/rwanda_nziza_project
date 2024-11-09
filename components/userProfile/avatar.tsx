"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Image from "next/image";

interface UserInfos {
    image: string;
    user: string;
}

export const UserAvatar = ({ image, user }: UserInfos) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="w-[45px] h-[45px] rounded-full">
                    <Image src={image} alt="" width={250} height={250} className="w-[45px] h-[45px] rounded-full object-cover" />
                    <AvatarFallback className="bg-white rounded-full font-bold">{user.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-0 shadow-md w-[200px]">
                <DropdownMenuLabel className="text-center capitalize">{user}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/15" />
            </DropdownMenuContent>
        </DropdownMenu>


    )
}