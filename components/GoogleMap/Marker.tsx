"use client";

import { useStateContext } from '@/context/stateContext';
import { MarkerF, OverlayView } from '@react-google-maps/api';
import Image from 'next/image';
import React, { useEffect } from 'react';

const Marker = () => {
  const { selectedBusiness, businessLocation, setSelectedBusiness, userLocation, businessItem, setBusinessItem } = useStateContext();

  useEffect(() => {
    // Update businessItem based on selectedBusiness
    const selected = businessLocation?.find((item: any) => item.id === selectedBusiness);
    setBusinessItem(selected);

    //eslint-disable-next-line
  }, [selectedBusiness, businessLocation]);

  const onDirectionClick = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation?.lat},${userLocation?.lng}&destination=${businessItem?.lat},${businessItem?.lng}&travelmode=driving`
    );
  };

  const formattedDistance = businessItem?.distance >= 1000 ? `${(businessItem?.distance / 1000).toFixed(1)} km` : `${businessItem?.distance.toFixed(2)} m`;

  return (
    <div>
      {businessLocation?.map((item: any) => (
        <div key={item.id}>
          <MarkerF
            position={{ lat: item.lat, lng: item.lng }}
            onClick={() => setSelectedBusiness(item.id)}
            icon={{
              url: "/circle.png",
              scaledSize: {
                width: 10,
                height: 10
              } as any
            }}
          >
            {selectedBusiness === item.id && (
              <OverlayView
                position={{ lat: item.lat, lng: item.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className='w-[100px] flex-shrink-0 flex flex-col items-center animate-bounce hover:animate-none -ml-12 -mt-14'>
                  <Image
                    src={item.image}
                    alt=''
                    width={180}
                    height={180}
                    className='w-[50px] h-[50px] object-cover rounded-full cursor-pointer'
                  />
                  <p className='text-[10px] mt-3 line-clamp-1 text-white'>{item.name}</p>
                  <div className='flex gap-2 items-center pl-2 bg-white rounded-lg mt-2'>
                    <p className='text-nowrap'>{formattedDistance}</p>
                    <button className='p-2 rounded-lg bg-[#0075ff] text-white' onClick={onDirectionClick}>
                      Direction
                    </button>
                  </div>
                </div>
              </OverlayView>
            )}
          </MarkerF>
        </div>
      ))}
    </div>
  );
};

export default Marker;
