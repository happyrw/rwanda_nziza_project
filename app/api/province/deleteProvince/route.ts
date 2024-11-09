import { District } from "@/lib/models/district";
import { EconomicActivity } from "@/lib/models/economiActivity";
import { Event } from "@/lib/models/event";
import { Province } from "@/lib/models/province";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { provinceId, userId } = await req.json();

    try {
        const checkUser = await User.findOne({ _id: userId });
        if (checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        };

        const checkProvince = await Province.findOne({ _id: provinceId });
        if (!checkProvince) {
            return NextResponse.json({ error: "Province not found." });
        };

        if (checkProvince.userId.toString() !== userId) {
            return NextResponse.json({ error: "Not your post." });
        };

        // Retrieve all districts in the province
        const districts = await District.find({ provinceId: provinceId });

        // Loop through each district to delete associated events and economic activities
        for (const district of districts) {
            // Delete all events linked to the district
            await Event.deleteMany({ _id: { $in: district.eventId } });

            // Delete all economic activities linked to the district
            await EconomicActivity.deleteMany({ _id: { $in: district.economicActivityId } });
        }

        // Delete all districts associated with the province
        await District.deleteMany({ provinceId: provinceId });

        // Finally, delete the province itself
        await Province.findByIdAndDelete(provinceId);

        return NextResponse.json({ message: "Province and all associated data deleted" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
};