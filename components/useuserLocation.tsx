"use client";
import { useEffect, useState } from "react";

const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location:", error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 1000, // Cache the position for 1 second
                    timeout: 5000,
                }
            );

            // Clean up on component unmount
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return userLocation;
};

export { useUserLocation };
