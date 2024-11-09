import { NextResponse } from "next/server";

// const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const BASE_URL = "https://api.opencagedata.com/geocode/v1/json";
// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const secret_key = process.env.OPENCAGE_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    // const category = searchParams.get("category");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    // const res = await fetch(BASE_URL + "/textsearch/json?query=" + category + "&location=" + lat + "," + lng + '&key=' + GOOGLE_API_KEY, {
    const res = await fetch(`${BASE_URL}?q=${lat}+${lng}&key=${secret_key}`, {
        headers: {
            "Content-Type": "application/json",
        }
    });

    const product = await res.json();

    return NextResponse.json({ product });
};

// https://console.cloud.google.com/project/_/billing/enable
// http://localhost:3000/api/google-place?query=restaurants&location=39.6344775,-80.564748