import { District } from "@/lib/models/district";
import { EconomicActivity } from "@/lib/models/economiActivity";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const { userId, economicActivityId } = await req.json();

    try {
        const checkUser = await User.findOne({ _id: userId });
        if (!checkUser || checkUser.role !== "Admin") {
            return NextResponse.json({ error: "You don't have permission." });
        };

        const economicActivityExist = await EconomicActivity.findById({ _id: economicActivityId });
        if (!economicActivityExist) {
            return NextResponse.json({ error: "Economic activity not found." });
        };
        if (economicActivityExist.userId.toString() !== userId) {
            return NextResponse.json({ error: "Not your post." });
        }

        const districtUpdated = await District.findOneAndUpdate(
            { economicActivityId: economicActivityId },
            { $pull: { economicActivityId: economicActivityId } },
            { new: true }
        );

        await EconomicActivity.findByIdAndDelete(economicActivityExist._id);

        return NextResponse.json({ message: "Economic activity deleted and removed from District", districtUpdated });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" });
    }
}