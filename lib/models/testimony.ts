import mongoose, { Schema } from "mongoose";

const TestimonySchema = new Schema<ITestimony>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: [{ type: String, required: true }],
    text: { type: String, required: true },
    visitedPlaces: [{ type: String, required: true }]
});

const Testimony = mongoose.models.Testimony || mongoose.model<ITestimony>("Testimony", TestimonySchema);
export { Testimony };