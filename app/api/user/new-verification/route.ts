import { fetchVerificationTokenByToken } from "@/lib/data";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    try {
        const { token } = await req.json();
        if (!token) {
            return NextResponse.json({ error: "No token provided" });
        };

        const databaseToken = await fetchVerificationTokenByToken(token);
        if (!databaseToken) {
            return NextResponse.json({ error: "Database token not found" });
        };

        const userToVerify = await User.findOne({ email: databaseToken.email });
        if (!userToVerify) {
            return NextResponse.json({ error: "User not found" });
        };

        if (userToVerify.emailVerified) {
            return NextResponse.json({ error: "Email already verified" })
        }

        // Update user verification status
        userToVerify.emailVerified = true;
        await userToVerify.save();

        return NextResponse.json({ message: "OK" });
    } catch (error) {
        console.error("Error verifying token:", error);
        return NextResponse.json({ error: "Invalid or expired token" });
    }
}
