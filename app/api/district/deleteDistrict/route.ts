import { District } from "@/lib/models/district";
import { EconomicActivity } from "@/lib/models/economiActivity";
import { Event } from "@/lib/models/event";
import { Province } from "@/lib/models/province";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { userId, districtId } = await req.json();

    try {
        const checkUser = await User.findById(userId);
        if (checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        };

        const checkDistrict = await District.findById(districtId);
        if (!checkDistrict) {
            return NextResponse.json({ error: "District doesn't exist.", districtId });
        };
        if (checkDistrict.userId.toString() !== userId) {
            return NextResponse.json({ error: "Not your post." });
        };

        // Delete all events associated with the district
        await Event.deleteMany({ _id: { $in: checkDistrict.eventId } });


        // Delete all economic activities associated with the district
        await EconomicActivity.deleteMany({ _id: { $in: checkDistrict.economicActivityId } });

        await Province.findOneAndUpdate(
            { districtId: districtId },
            { $pull: { districtId: districtId } },
            { new: true }
        );

        await District.findByIdAndDelete(districtId);

        return NextResponse.json({ message: "District Deleted" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    };
};