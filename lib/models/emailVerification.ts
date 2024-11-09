import mongoose, { Schema } from "mongoose";

const verificationSchema = new Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
});

const Verification = mongoose.models.Verification || mongoose.model("Verification", verificationSchema);
export { Verification };