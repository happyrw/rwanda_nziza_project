import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema<IUser>({
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    profile: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["Admin", "Visitor"],
        default: "Visitor"
    }
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export { User };
