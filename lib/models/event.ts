import mongoose, { Schema } from "mongoose";

// Define the subService schema
const SubServiceSchema = new Schema({
    name: { type: String, default: '' },
    photo: { type: [String], default: [] },
    description: { type: String, default: '' },
});

const EventSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: [{ type: String, required: true }],
    date: { type: String, required: true },
    videoUrl: { type: String, default: '' },
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    subServices: [SubServiceSchema],
    districtId: { type: Schema.Types.ObjectId, ref: "District", required: true },
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export { Event };

{/* 

Hotel
Restaurant
Genocide Memorial site
Education
Park
Churches

*/}