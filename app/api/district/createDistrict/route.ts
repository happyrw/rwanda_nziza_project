import { District } from "@/lib/models/district";
import { Province } from "@/lib/models/province";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { userId = "670ca96875cdc8716ddd3828", title, images, description, videoUrl, location, subServices, provinceId } = await req.json();
    try {
        const checkUser = await User.findById(userId);
        if (!checkUser || checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        };

        const name = title.split(" ")[0];

        const districtExist = await District.findOne({ name });
        if (districtExist) {
            return NextResponse.json({ error: "District already exist" });
        };

        const provinceExist = await Province.findOne({ _id: provinceId });
        if (!provinceExist) {
            return NextResponse.json({ error: "Province is missing." });
        };

        const newDistrict = await District.create({
            userId,
            name: title,
            images,
            description,
            videoUrl,
            location,
            subServices,
            provinceId: provinceExist._id
        });

        if (provinceId) {
            await Province.findByIdAndUpdate(provinceId,
                {
                    $push: { districtId: newDistrict._id }
                },
                { new: true }
            );
        };

        return NextResponse.json({ message: "District created", newDistrict })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}