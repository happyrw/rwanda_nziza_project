import mongoose, { Schema } from "mongoose";

const SubServiceSchema = new Schema({
    name: { type: String, default: '' },
    photo: { type: [String], default: [] },
    description: { type: String, default: '' },
});

const DistrictSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    images: [{ type: String, required: true }],
    description: String,
    videoUrl: { type: String, default: '' },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    subServices: [SubServiceSchema],
    provinceId: { type: Schema.Types.ObjectId, ref: 'Province', required: true },
    economicActivityId: [{ type: Schema.Types.ObjectId, ref: 'EconomicActivity' }],
    eventId: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

const District = mongoose.models.District || mongoose.model("District", DistrictSchema);
export { District };
