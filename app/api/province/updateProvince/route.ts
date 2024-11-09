import { Province } from "@/lib/models/province";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { provinceId, userId = "670ca96875cdc8716ddd3828", title, images, description, videoUrl, location, subServices } = await req.json();

    try {
        const checkUser = await User.findOne({ _id: userId });
        if (!checkUser || checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        };

        const checkProvince = await Province.findById(provinceId);
        if (!checkProvince) {
            return NextResponse.json({ error: "Province not found." });
        };

        if (checkProvince.userId.toString() !== userId) {
            return NextResponse.json({ error: "Not your post." });
        };



        checkProvince.name = title || checkProvince.name;
        checkProvince.images = images || checkProvince.images;
        checkProvince.description = description || checkProvince.description;
        checkProvince.location = location || checkProvince.location;
        checkProvince.videoUrl = videoUrl || checkProvince.videoUrl;

        if (subServices?.length) {
            checkProvince.subServices = subServices.map((newSubService: any, index: number) => {
                const existingSubService = checkProvince.subServices[index];
                return {
                    name: newSubService.name || existingSubService?.name,
                    photo: newSubService.photo?.length ? newSubService.photo : existingSubService?.photo,
                    description: newSubService.description || existingSubService?.description,
                };
            });
        }

        const updated = await checkProvince.save();

        return NextResponse.json({ message: "Province updated", updated });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    };
};