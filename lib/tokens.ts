import { fetchVerificationTokenByEmail } from "./data";
import { Verification } from "./models/emailVerification";

import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
    try {
        const token = uuidv4();
        const expires = new Date(new Date().getTime() + 3600 * 1000);

        const existingToken = await fetchVerificationTokenByEmail(email);
        if (existingToken) {
            await Verification.findOneAndDelete({ email });
        };

        const newToken = await Verification.create({
            token,
            email,
            expires,
        });

        return newToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}