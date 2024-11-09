import { District } from "@/lib/models/district";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { userId = "670ca96875cdc8716ddd3828", title, images, description, districtId, videoUrl, location, subServices } = await req.json();

    try {
        const checkUser = await User.findById(userId);
        if (checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        };

        const checkDistrict = await District.findById(districtId);
        if (!checkDistrict) {
            return NextResponse.json({ error: "District doesn't exist." });
        };

        if (checkDistrict.userId.toString() !== userId) {
            return NextResponse.json({ error: "Not your post." });
        };

        checkDistrict.name = title || checkDistrict.name;
        checkDistrict.images = images || checkDistrict.images;
        checkDistrict.description = description || checkDistrict.description;
        checkDistrict.location = location || checkDistrict.location;
        checkDistrict.videoUrl = videoUrl || checkDistrict.videoUrl;

        if (subServices?.length) {
            checkDistrict.subServices = subServices.map((newSubService: any, index: number) => {
                const existingSubService = checkDistrict.subServices[index];
                return {
                    name: newSubService.name || existingSubService?.name,
                    photo: newSubService.photo?.length ? newSubService.photo : existingSubService?.photo,
                    description: newSubService.description || existingSubService?.description,
                };
            });
        }

        const updated = await checkDistrict.save();

        return NextResponse.json({ message: "District updated", updated });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
};