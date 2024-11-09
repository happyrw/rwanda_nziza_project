import { District } from "@/lib/models/district";
import { EconomicActivity } from "@/lib/models/economiActivity";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { userId = "670ca96875cdc8716ddd3828", title, images, Category, description, location, videoUrl, subServices, districtId } = await req.json();

    try {
        const checkUser = await User.findById(userId);
        if (checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        };

        const newDistrict = await EconomicActivity.create({
            userId,
            name: title,
            images,
            type: Category,
            description,
            location,
            videoUrl,
            subServices,
            districtId
        });

        if (districtId) {
            await District.findByIdAndUpdate(districtId,
                {
                    $push: { economicActivityId: newDistrict._id }
                },
                { new: true }
            );
        }

        return NextResponse.json({ message: "Economic activity created and linked to District" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}