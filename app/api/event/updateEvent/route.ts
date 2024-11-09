import { Event } from "@/lib/models/event";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { userId = "670ca96875cdc8716ddd3828", title, images, description, videoUrl, location, type, date, subServices, eventId } = await req.json();

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

        eventExist.name = title || eventExist.name;
        eventExist.images = images || eventExist.images;
        eventExist.date = date || eventExist.date;
        eventExist.type = type || eventExist.type;
        eventExist.description = description || eventExist.description;
        eventExist.location = location || eventExist.location;
        eventExist.videoUrl = videoUrl || eventExist.videoUrl;

        if (subServices?.length) {
            eventExist.subServices = subServices.map((newSubService: any, index: number) => {
                const existingSubService = eventExist.subServices[index];
                return {
                    name: newSubService.name || existingSubService?.name,
                    photo: newSubService.photo?.length ? newSubService.photo : existingSubService?.photo,
                    description: newSubService.description || existingSubService?.description,
                };
            });
        }

        await eventExist.save();

        return NextResponse.json({ message: "Event updated" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}
