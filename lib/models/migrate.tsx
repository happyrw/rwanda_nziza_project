import mongoose from "mongoose";
import { Province } from "./province";
import { connectDB } from "../mongoose";

export async function migrateMapCoordinatesByAddingToDocument() {
    await connectDB();

    try {
        // Fetch all provinces with existing mapCoordinates field
        const provinces = await Province.find({});

        for (const province of provinces) {
            let latitude = 0;
            let longitude = 0;

            // If mapCoordinates exists, split and convert it to latitude and longitude
            if (province.mapCoordinates) {
                [latitude, longitude] = province.mapCoordinates.split(",").map((coord: any) => parseFloat(coord.trim()));
            }

            // Update document with new mapCoordinate object and remove mapCoordinates
            const updated = await Province.updateOne(
                { _id: province._id },
                {
                    $set: { mapCoordinate: { latitude, longitude } },
                    $unset: { mapCoordinates: "" }
                },
                { strict: false } // Allows update flexibility
            );

            console.log(`Updated Province: ${province._id}`, updated);
        }

        console.log("Migration completed successfully.");
    } catch (error) {
        console.error("Error during migration:", error);
    } finally {
        mongoose.connection.close();
    }
}

export async function migrateMapCoordinatesByRemovingToDocument() {
    await connectDB();

    try {
        // Fetch all provinces with the old mapCoordinates field
        const provinces = await Province.find({ mapCoordinates: { $exists: true } });

        for (const province of provinces) {
            const [latitude, longitude] = province.mapCoordinates.split(",").map((coord: any) => parseFloat(coord.trim()));

            // Directly update the document to bypass validation
            await Province.updateOne(
                { _id: province._id },
                {
                    $unset: { mapCoordinates: "" },
                    $set: { mapCoordinate: { latitude, longitude } }
                }
            );

            console.log(`Updated Province: ${province._id}`);
        }

        console.log("Migration completed successfully.");
    } catch (error) {
        console.error("Error during migration:", error);
    } finally {
        mongoose.connection.close();
    }
}

