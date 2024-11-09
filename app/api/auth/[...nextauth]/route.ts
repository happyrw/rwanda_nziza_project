import { LoginUser } from "@/actions/user";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials) {
                try {
                    const user = await LoginUser(credentials);
                    if (!user) return null;
                    return user;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ account, profile, credentials }: { account: any, profile: any, credentials: any }) {

            if (account.provider === "credentials") {
                await connectDB();
                const credentialUser = await User.findOne({ email: credentials.email });
                if (!credentialUser.emailVerified) {
                    return false;
                }
            };

            if (account.provider === "google") {
                await connectDB();
                const existingUser = await User.findOne({ email: profile.email });
                if (existingUser && existingUser.password) {
                    return false;
                }
                if (!existingUser) {
                    const user = await User.create({
                        email: profile.email,
                        profile: profile.picture,
                        emailVerified: true,
                    });

                    const users = await User.find();
                    user.role = users.length <= 5 ? "Admin" : "Visitor";
                    await user.save();
                };
            };
            return true;
        },
        async jwt({ token, user }: { token: any, user: any }) {
            if (user && user.emailVerified) {
                token.id = user.id;
                token.email = user.email;
            };
            return token;
        },
        async session({ token, session }: { token: any, session: any }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                }
            };
            return session;
        },
    },
    pages: {
        signIn: "/sign-in",
        error: "/auth/error"
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions as AuthOptions) as never;
export { handler as GET, handler as POST }