import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    await connectDB();

    try {
        const { email, picture, username } = await req.json();

        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            return NextResponse.json({ error: "User not found" });
        };

        isUserExist.username = username;
        isUserExist.profile = isUserExist.profile || picture;

        await isUserExist.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.APP_EMAIL, pass: process.env.APP_PASSWORD },
        });

        await transporter.sendMail({
            from: `Rwanda Nziza <${process.env.APP_EMAIL}>`,
            to: email,
            subject: "Welcome to Rwanda Nziza!",
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <div style="text-align: center; padding: 10px;">
                    <h1 style="color: #1E90FF; font-size: 24px;">Welcome to Rwanda Nziza!</h1>
                </div>
                <p style="font-size: 16px; line-height: 1.6;">
                    Dear ${username},
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                    Thank you for joining <strong>Rwanda Nziza</strong>! We’re thrilled to have you on board. With Google Authentication, you are all set to explore our platform. No additional verification is needed.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                    We hope you enjoy the features and resources Rwanda Nziza has to offer. Should you have any questions, feel free to reach out to our support team.
                </p>
                <hr style="border: 1px solid #ddd; margin: 20px 0;">
                <p style="font-size: 14px; color: #555;">
                    If you didn’t sign up for an account with us, please disregard this email.
                </p>
                <div style="text-align: center; margin-top: 20px;">
                    <p style="font-size: 14px; color: #777;">&copy; ${new Date().getFullYear()} Rwanda Nziza. All Rights Reserved.</p>
                </div>
            </div>
            `,
        });

        return NextResponse.json({ message: 'OK' });
    } catch (error) {
        console.log("Login error:", error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}
