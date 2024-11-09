"use client";
import { useEffect, useState } from "react";
import { useUserLocation } from "./useuserLocation";

const secret_key = process.env.OPENCAGE_API_KEY;

const RealTimeLocationComponent = () => {
    const userLocation = useUserLocation();
    const [currentLocation, setCurrentLocation] = useState<string | null>(null);
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        const fetchLocation = async () => {
            if (userLocation) {
                const mockLocation = process.env.NEXT_PUBLIC_USE_MOCK_LOCATION === "true";

                const lat = mockLocation ? parseFloat(process.env.NEXT_PUBLIC_MOCK_LAT!) : userLocation?.lat;
                const lng = mockLocation ? parseFloat(process.env.NEXT_PUBLIC_MOCK_LNG!) : userLocation?.lng;

                // const { lat, lng } = userLocation;
                setLatitude(lat as any)
                setLongitude(lng as any)
                try {
                    const response = await fetch(
                        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${secret_key}`
                    );
                    const data = await response.json();


                    if (data.results.length > 0) {
                        const locationInfo = data.results[0].components;
                        // Set district name as 'county' and fallback to other fields if unavailable
                        const districtName = locationInfo.county || locationInfo.city || locationInfo.village;
                        const provinceName = locationInfo.state;
                        setCurrentLocation(`You are in ${districtName}, ${provinceName}`);
                    } else {
                        setCurrentLocation("Location not recognized");
                    }
                } catch (error) {
                    console.error("Error fetching location:", error);
                    setCurrentLocation("Error fetching location data");
                }
            }
        };

        fetchLocation();
    }, [userLocation]);

    return (
        <div>
            <h2>Real-Time Location Updates</h2>
            {currentLocation ? (
                <>
                    <p>{currentLocation}</p>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                </>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
};

export default RealTimeLocationComponent;

