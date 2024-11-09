import { Province } from "@/lib/models/province";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { userId = "670ca96875cdc8716ddd3828", title, images, description, videoUrl, location, subServices } = await req.json();

    try {
        const provinceExist = await Province.findOne({ title });
        if (provinceExist) {
            return NextResponse.json({ error: "Province already exist" });
        };

        const checkUser = await User.findOne({ _id: userId });
        if (!checkUser || checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        };

        const province = await Province.create({
            userId,
            name: title,
            images,
            description,
            videoUrl,
            location,
            subServices,
        });

        return NextResponse.json({ message: "Province created", province })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
};