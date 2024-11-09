import { District } from "@/lib/models/district";
import { Event } from "@/lib/models/event";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { userId, eventId } = await req.json();

    try {
        const checkUser = await User.findById(userId);
        if (!checkUser || checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        }

        const eventExist = await Event.findById(eventId);
        if (!eventExist) {
            return NextResponse.json({ error: "Event not found." });
        };
        if (eventExist.userId.toString() !== userId) {
            return NextResponse.json({ error: "Not your post." });
        }

        // Remove the event reference from the associated district
        await District.findOneAndUpdate(
            { eventId: eventId },
            { $pull: { eventId: eventId } },
            { new: true }
        );

        // Delete the event
        await Event.findByIdAndDelete(eventExist._id);

        return NextResponse.json({ message: "Event deleted and removed from District" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}