import mongoose, { Schema } from "mongoose";

const SubServiceSchema = new Schema({
    name: { type: String, required: true },
    photo: { type: [String], default: [] },
    description: { type: String, required: true },
})

const EconomicActivitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    videoUrl: { type: String, default: "" },
    subServices: [SubServiceSchema],
    districtId: { type: Schema.Types.ObjectId, ref: "District", required: true },
});

const EconomicActivity = mongoose.models?.EconomicActivity || mongoose.model("EconomicActivity", EconomicActivitySchema);
export { EconomicActivity };

{/*

Hotel
Restaurant
Genocide Memorial site
Education
Park
Churches

*/}