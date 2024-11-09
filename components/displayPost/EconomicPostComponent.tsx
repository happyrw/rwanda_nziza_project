import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
    image: string;
    id: string;
    name: string;
}

const EconomicPostComponent = ({
    image,
    id,
    name
}: Props) => {
    const postType = "Economic";
    return (
        <Link href={`/createProvince?id=${id}&postType=${postType}`} className=''>
            <div className='relative aspect-video p-2'>
                <Image src={image} alt="" fill className='absolute object-cover' />
            </div>
            <p className='bg-black p-5 text-white'>{name}</p>
        </Link>
    )
}

export default EconomicPostComponent;
