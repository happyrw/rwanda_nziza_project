import { EconomicActivity } from "@/lib/models/economiActivity";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { userId = "670ca96875cdc8716ddd3828", title, images, description, videoUrl, location, subServices, economicActivityId } = await req.json();

    try {
        const checkUser = await User.findById(userId);
        if (!checkUser || checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        };

        const economicActivityExist = await EconomicActivity.findById(economicActivityId);
        if (!economicActivityExist) {
            return NextResponse.json({ error: "Economic activity not found." });
        };
        if (economicActivityExist.userId.toString() !== userId) {
            return NextResponse.json({ error: "Not your post." });
        }

        economicActivityExist.name = title || economicActivityExist.name;
        economicActivityExist.images = images || economicActivityExist.images;
        economicActivityExist.description = description || economicActivityExist.description;
        economicActivityExist.location = location || economicActivityExist.location;
        economicActivityExist.videoUrl = videoUrl || economicActivityExist.videoUrl;

        if (subServices?.length) {
            economicActivityExist.subServices = subServices.map((newSubService: any, index: number) => {
                const existingSubService = economicActivityExist.subServices[index];
                return {
                    name: newSubService.name || existingSubService?.name,
                    photo: newSubService.photo?.length ? newSubService.photo : existingSubService?.photo,
                    description: newSubService.description || existingSubService?.description,
                };
            });
        }

        const updated = await economicActivityExist.save();

        return NextResponse.json({ message: "Economic activity updated", updated });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}