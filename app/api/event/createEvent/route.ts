import { District } from "@/lib/models/district";
import { Event } from "@/lib/models/event";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { userId = "670ca96875cdc8716ddd3828", title, images, date, event, description, location, subServices, videoUrl, districtId } = await req.json();
    try {
        const checkUser = await User.findById(userId);
        if (!checkUser || checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        };

        const districtExist = await District.findById(districtId);
        if (!districtExist) {
            return NextResponse.json({ error: "District not found" });
        }

        const newEvent = await Event.create({
            userId: checkUser._id,
            name: title,
            images,
            date,
            type: event,
            description,
            location,
            subServices,
            videoUrl,
            districtId,
        });

        const updated = await District.findByIdAndUpdate(districtId,
            { $push: { eventId: newEvent._id } },
            { new: true }
        );


        return NextResponse.json({ message: "Event created and linked to District", updated });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}
