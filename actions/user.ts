"use server";

import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import { generateVerificationToken } from "@/lib/tokens";

export async function LoginUser(data: any) {
    await connectDB();

    try {
        const isUserExist = await User.findOne({ email: data.email });
        if (!isUserExist) {
            return null;
        };

        const verifyPassword = await bcrypt.compare(data.password, isUserExist.password);
        if (!verifyPassword) {
            return null;
        };

        // For unverified users
        if (!isUserExist.emailVerified) {
            const generatedToken = await generateVerificationToken(data.email);
            const verificationLink = `http://localhost:3000/verify-email?token=${generatedToken.token}`;
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.APP_EMAIL, pass: process.env.APP_PASSWORD },
            });

            await transporter.sendMail({
                from: `Rwanda Nziza <${process.env.APP_EMAIL}>`,
                to: data.email,
                subject: "Welcome to Rwanda Nziza! Please Verify Your Email",
                html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <div style="text-align: center; padding: 10px;">
                        <h1 style="color: #1E90FF; font-size: 24px;">Welcome to Rwanda Nziza!</h1>
                    </div>
                    <p style="font-size: 16px; line-height: 1.6;">
                        Dear ${isUserExist.username},
                    </p>
                    <p style="font-size: 16px; line-height: 1.6;">
                        Thank you for joining <strong>Rwanda Nziza</strong>! We’re thrilled to have you on board. To get started, we need you to verify your email address to complete your registration. Please confirm your email to activate your account.
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${verificationLink}" style="background-color: #1E90FF; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 18px;">Verify My Email</a>
                    </div>
                    <p style="font-size: 16px; line-height: 1.6;">
                        By verifying, you’ll have full access to explore all the features and resources Rwanda Nziza has to offer. We're committed to bringing you the best experience possible.
                    </p>
                    <hr style="border: 1px solid #ddd; margin: 20px 0;">
                    <p style="font-size: 14px; color: #555;">
                        <strong>Why verify your email?</strong><br>
                        Verifying your email helps us ensure that your account is secure and that you can reset your password if needed. It’s a key step to keep your account safe.
                    </p>
                    <p style="font-size: 14px; color: #555;">
                        If you didn’t sign up for an account with us, you can ignore this email. The verification link will expire after 24 hours for security purposes.
                    </p>
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="font-size: 14px; color: #777;">&copy; ${new Date().getFullYear()} Rwanda Nziza. All Rights Reserved.</p>
                    </div>
                </div>
                `,
            });

            return isUserExist;
        };

        return isUserExist;
    } catch (error) {
        console.log("Login error:", error);
        throw new Error('Something went wrong')
    }
}


