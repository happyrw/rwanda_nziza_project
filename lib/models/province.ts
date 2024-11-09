import mongoose, { Schema } from "mongoose";

const SubServiceSchema = new Schema({
    name: { type: String, default: '' },
    photo: { type: [String], default: [] },
    description: { type: String, default: '' },
});

const ProvinceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    videoUrl: { type: String, default: '' },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    subServices: [SubServiceSchema],
    districtId: [{ type: Schema.Types.ObjectId, ref: 'District' }]
});

const Province = mongoose.models.Province || mongoose.model("Province", ProvinceSchema);
export { Province }; 