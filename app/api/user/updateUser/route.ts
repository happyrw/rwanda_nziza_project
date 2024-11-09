import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { username, profile, email } = await req.json();
    await connectDB();

    try {
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            return NextResponse.json({ error: "User doesn't exist" });
        };

        const userUpdated = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    username,
                    profile,
                }
            },
            { new: true }
        );

        return NextResponse.json({ message: "User updated successfully", userUpdated });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}
