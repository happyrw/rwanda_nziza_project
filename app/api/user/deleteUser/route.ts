import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email } = await req.json();
    await connectDB();

    try {
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            return NextResponse.json({ error: "User doesn't exist" });
        };

        await User.findOneAndDelete({ email: isUserExist.email });

        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}
