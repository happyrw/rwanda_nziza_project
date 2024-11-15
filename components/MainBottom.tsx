"use client";
import { places } from '@/constant';
import Image from 'next/image';
import { useRef } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";

const MainBottom = () => {
    const elementRef = useRef(null);

    const slideRight = (elementRef: any) => {
        elementRef.scrollLeft += 500;
    };

    const slideLeft = (elementRef: any) => {
        elementRef.scrollLeft -= 500;
    };
    return (
        <div className='relative pb-32 pt-32 -bottom-10'>
            <Image src="https://images.pexels.com/photos/7316957/pexels-photo-7316957.jpeg" alt="" fill className='object-cover' />

            <div className="lakeKivuLarge items-center md:px-2 lg:px-20">
                <div className='absolute md:w-[760px] lg:w-[900px] no-scrollbar mt-32 z-10'>
                    <div className='md:w-[760px] lg:w-[900px] flex items-center gap-2 overflow-x-auto no-scrollbar p-2 scroll-smooth' ref={elementRef}>
                        {places.map((place, index) => (
                            <div key={index} className="relative min-w-[200px] h-[120px] rounded-md cursor-pointer shadow-lg">
                                <Image
                                    width={200}
                                    height={100}
                                    className="w-[200px] h-full object-cover rounded-md"
                                    src={place.image}
                                    alt="Image"
                                />
                                <div className='absolute bottom-0 flex flex-col items-center justify-center w-full gap-1 text-black rounded-lg mt-2 py-2'>
                                    <h3 className='text-sm font-bold text-white'>{place.name}</h3>
                                    <div className='flex items-center gap-1'>
                                        {Array(5).fill(null).map((_, index) => (
                                            <AiFillStar key={index} className='text-yellow-500' />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex'>
                        <div className="ml-auto flex items-center gap-2 mt-2">
                            <CiCircleChevLeft className='text-2xl cursor-pointer' onClick={() => slideLeft(elementRef.current)} />
                            <CiCircleChevRight className='text-2xl cursor-pointer' onClick={() => slideRight(elementRef.current)} />
                            <br />
                            <button className='bg-blue-400 text-white px-2'>See More</button>
                        </div>
                    </div>
                </div>
                <div className='relative w-[400px] h-[350px] ml-auto bg-white -top-5'>
                    <h2 className='text-2xl font-bold py-5 text-center'>LAKE KIVU</h2>
                    <p className='text-md font-semibold p-2 text-center text-black/50'>Discover the tranquil lakes in this region, offering peaceful water, scenic views, and a refreshing escape into nature&apos;s calm beauty.</p>
                </div>
            </div>

            <div className='lakeKivuSmall w-full items-center gap-2 overflow-x-auto no-scrollbar p-2'>
                {places.map((place, index) => (
                    <div key={index} className="relative min-w-[150px] h-[120px] rounded-md cursor-pointer shadow-lg lg:mt-9">
                        <Image
                            width={200}
                            height={100}
                            className="w-[200px] h-full object-cover rounded-md"
                            src={place.image}
                            alt="Image"
                        />
                        <div className='absolute bottom-0 flex flex-col items-center justify-center w-full gap-1 text-black rounded-lg mt-2 py-2'>
                            <h3 className='text-sm font-bold text-white'>{place.name}</h3>
                            <div className='flex items-center gap-1'>
                                {Array(5).fill(null).map((_, index) => (
                                    <AiFillStar key={index} className='text-yellow-500' />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainBottom;
