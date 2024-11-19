"use client";
import { places } from '@/constant';
import { useStateContext } from '@/context/stateContext';
import Image from 'next/image';
import React from 'react'

const Hero = () => {
    const { setSearchedTerm, handleSearch, searchedTerm } = useStateContext();

    return (
        <div className='relative p-5 pt-32 -top-20 bg-[url(https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg)] bg-cover'>
            <form className='m-auto bg-white flex items-center w-full lg:w-[800px] h-14 lg:h-20 px-5 py-2 gap-4 rounded-md' onSubmit={handleSearch}>
                <Image src='/search.svg' alt='search-icon' width={250} height={250} className='w-7 h-7' />
                <input type="text" className='w-full h-full shadow-sm border-none outline-none py-2 px-4' value={searchedTerm} onChange={(e) => setSearchedTerm(e.target.value)} />
            </form>

            <div className='flex items-center md:justify-center my-10 md:my-20 gap-4 w-full overflow-x-auto no-scrollbar'>
                {places.map((place, index) => (
                    <div key={index} className='flex flex-col items-center'>
                        <p className='bg-white py-2 px-4 rounded-full text-[7px] md:text-sm text-nowrap'>{place.name}</p>
                        <Image
                            width={150}
                            height={150}
                            alt=''
                            className='w-9 h-9 object-cover rounded-full -mt-4'
                            src='/back.svg'
                        />
                        <Image
                            width={150}
                            height={150}
                            alt=''
                            className='w-[50px] md:w-[90px] h-[50px] md:h-[90px] object-cover rounded-full md:mt-2'
                            src={place.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Hero;