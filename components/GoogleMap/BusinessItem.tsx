import { useStateContext } from '@/context/stateContext';
import Image from 'next/image';
import React from 'react'

interface BusinessItemProps {
    id: string;
    name: string;
    image: string;
    distance: number;
};

const BusinessItem = ({ name, image, id, distance }: BusinessItemProps) => {
    const { setSelectedBusiness } = useStateContext();

    // Convert distance to a readable format (meters or kilometers)
    const formattedDistance = distance >= 1000 ? `${(distance / 1000).toFixed(1)} km` : `${distance.toFixed(1)} m`;

    return (
        <div className='w-[100px] flex-shrink-0 flex flex-col items-center' onClick={() => setSelectedBusiness(id)}>
            <Image
                src={image}
                alt=''
                width={180}
                height={180}
                className='w-[50px] h-[50px] object-cover rounded-full cursor-pointer'
            />
            <p className='text-[10px] mt-3 line-clamp-1'>{name}</p>
            <p className='text-[10px] line-clamp-1 text-black/50'>{formattedDistance}</p>
        </div>
    )
}

export default BusinessItem;
