"use client"
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useStateContext } from '@/context/stateContext';
import Marker from './Marker';

const GoogleMapView = () => {
    const [target, setTarget] = useState<any | undefined>();
    const { userLocation, selectedBusiness, businessItem } = useStateContext();

    const containerStyle = {
        width: '100%',
        height: '400px',
    };

    useEffect(() => {
        if (selectedBusiness && businessItem) {
            setTarget({ lat: businessItem.lat, lng: businessItem.lng });
        } else {
            setTarget(null);
        }
    }, [selectedBusiness, businessItem]);

    const mapCenter = target || userLocation;

    return (
        <div className='flex flex-col'>
            <div className='ml-auto w-full lg:w-[400px]'>
                <LoadScript
                    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
                    mapIds={['e7cb091d37acc104']}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={mapCenter}
                        zoom={10}
                    >
                        <MarkerF
                            position={userLocation as any}
                            icon={{
                                url: "/user-location.png",
                                scaledSize: {
                                    width: 70,
                                    height: 70
                                } as any
                            }}
                        />
                        <Marker />
                    </GoogleMap>
                </LoadScript>
            </div>
            <p>{userLocation?.lat}</p>
            <p>{userLocation?.lng}</p>
        </div>
    )
}

export default GoogleMapView;


