"use client";
import { categoryData } from '@/constant';
import { useStateContext } from '@/context/stateContext';
import { getGooglePlaces } from '@/lib/data/GlobalApis';
import React, { useEffect, useState } from 'react'

import BusinessItem from './BusinessItem';

const GlobalApis = () => {
    const [category, setCategory] = useState<any>();
    const [location, setLocation] = useState<{ lat: any, lng: any }>();
    const [businessList, setBusinessList] = useState<any>();

    const { userLocation, setBusinessLocation } = useStateContext();

    const getGooglePlace = (Category: any, Location: any) => {
        getGooglePlaces(Category, Location).then((response) => {
            setBusinessList(response);
            setBusinessLocation(response);
        })
    };

    useEffect(() => {
        if (category && location?.lat && location?.lng) {
            getGooglePlace(category, location);
        }

        //eslint-disable-next-line
    }, [category, location]);

    return (
        <div>
            <h2 className='mt-3'>Select a Category and Location</h2>
            <div className='flex items-center gap-4 my-5 overflow-x-auto no-scrollbar pr-2'>
                {categoryData.map((item, index) => {
                    const isActive = category === item.category;
                    return (
                        <div key={index}>
                            <button
                                onClick={() => {
                                    setCategory(item.category);
                                    setLocation({ lat: userLocation?.lat, lng: userLocation?.lng });
                                }}
                                className={`capitalize text-nowrap px-4 py-[5px] rounded-lg ${isActive ? "border-[1px] border-black" : "bg-blue-400 text-white"}`}
                            >
                                {item.category}
                            </button>
                        </div>
                    )
                })}
            </div>

            <div className='flex justify-center gap-4 mb-5 overflow-x-auto no-scrollbar'>
                {businessList?.map((item: any) => (
                    <BusinessItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        distance={item.distance}
                    />
                ))}
            </div>
        </div>
    )
}

export default GlobalApis;
