"use client";
import { slides } from '@/constant';
import React, { useEffect, useState } from 'react'

const MucyoComponent = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to go to the next slide
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // Function to go to the previous slide
    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [currentIndex]);

    return (
        <div>
            <div className='my-10 px-2 md:px-5'>
                <div className="relative w-full h-[500px]  mx-auto overflow-hidden rounded-lg shadow-lg mt-4">
                    {/* Slides */}

                    <div className="overflow-hidden relative w-full">
                        {/* Outer container with overflow hidden */}
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {slides.map((slide, index) => (
                                <div
                                    key={index}
                                    className="w-full h-[500px] flex-shrink-0 flex flex-col items-center justify-center text-white text-center bg-cover bg-center relative"
                                    style={{ backgroundImage: `url(${slide.src})` }}
                                >
                                    {/* Text content with tagline */}
                                    <div className="bg-black bg-opacity-50 p-6 rounded-lg w-4/5 max-w-xl text-center">
                                        <div className="w-36 h-2 bg-[#2E2BDF]" />
                                        <h2 className="text-xl md:text-3xl font-bold mb-2">{slide.text}</h2>
                                        <p className="text-sm md:text-lg mb-4">{slide.tagline}</p>
                                        <button className="bg-[#2E2BDF] text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-700 transition-all">
                                            Explore
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <button
                        onClick={goToPrev}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black hover:text-white p-2 rounded-full hover:bg-gray-800 w-8 h-8 flex items-center justify-center"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black hover:text-white p-2 rounded-full hover:bg-gray-800 w-8 h-8 flex items-center justify-center"
                    >
                        &#8594;
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"
                                    }`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                {/* testimony */}
                <p>Mucyo two</p>
            </div>
        </div>
    )
}

export default MucyoComponent