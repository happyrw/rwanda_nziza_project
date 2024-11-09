import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {

    const verificationLink = 'http://localhost:3000/verify-email';

    try {
        const { email } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD,
            },
        });

        const userMailOptions = {
            from: `Rwanda Nziza <${process.env.APP_EMAIL}>`,
            to: email,
            subject: "Email Verification",
            html: `
                <h1>Welcome to Rwanda Nziza !</h1>
                <p>To complete your registration, please verify your email address by clicking the link below:</p>
                <p><a href="${verificationLink}" target="_blank">Verify Email</a></p>
                <p>If you did not sign up for an account, please ignore this email.</p>
                <p>Best regards,<br />RWANDA NZIZA service Team</p>
            `,
        };

        // Send email to the user
        await transporter.sendMail(userMailOptions);

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error.toString() }, { status: 500 });
    }
}
