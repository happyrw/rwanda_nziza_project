"use client";
import { events, journey,slides } from "@/constant";
import Image from "next/image";
import React, { useRef,useState, useEffect } from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const LinkerComponent = () => {

  const elementRef = useRef(null);

  const slideRight = (element: any) => {
    element.scrollLeft += 500;
  };

  const slideLeft = (element: any) => {
    element.scrollLeft -= 500;
  };
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
      <div>
        {/* city Highlights */}
        <div className=" flex flex-col justify-center items-center m-auto ">
          <p className="text-center font-bold text-xl">City Highlights&Events</p>
          <div className="w-40 h-1 bg-[#2E2BDF]" />
        </div>
        {/* cards */}

        <div className="flex items-center justify-center my-10">
          {/* <FaLessThan className="" /> */}
          <CiCircleChevLeft className="rounded-full w-8 h-8 absolute left-2 cursor-pointer bg-white" onClick={() => slideLeft(elementRef.current)} />
          <div className="flex items-center gap-5 max-w-5xl overflow-y-auto no-scrollbar scroll-smooth" ref={elementRef}>
            {events.map((post, index) => (
              <div key={index} className="flex flex-col gap-2  flex-grow min-w-[300px] shadow-lg py-5 px-2">
                <div className='bg-gradient-to-r from-white to-[#2E2BDF] p-6" w-32 h-4' />
                <Image
                  width={250}
                  height={250}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  src={post.Image}
                  alt="Image"
                />
                <div className=" mb-2 text-sm font-medium">
                  <p>{post.Action}</p>
                  <h3>{post.Date}</h3>
                  <h3>{post.location} </h3>
                  <p>{post.partipants}</p>
                  <p>{post.Entrance}</p>
                </div>
                <button className="bg-[#2E2BDF] rounded-lg m-auto p-2 mb-2 font-bold text-white w-full">
                  Read More
                </button>
              </div>
            ))}
          </div>
          <CiCircleChevRight className="rounded-full w-8 h-8 absolute right-2 cursor-pointer bg-white" onClick={() => slideRight(elementRef.current)} />
        </div>
      </div>

      <div>
        {/* journey through */}
        <div className=" flex flex-col justify-center items-center m-auto ">
          <p className="text-center font-bold text-xl">Journey Through Rwanda</p>
          <div className="w-40 h-1 bg-[#2E2BDF]" />
        </div>
        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-10 mt-10 px-5">
          {journey.map((post, index) => (
            <div key={index} className="flex flex-col gap-2 text-center">
              <div className='bg-gradient-to-r from-[#2E2BDF] to-white p-6" w-32 h-4' />
              <h3 className="text-xl font-bold mb-2">{post.title} </h3>
              <Image
                width={250}
                height={250}
                className="w-full h-80 md:h-48 object-cover rounded-lg mb-4"
                src={post.Image}
                alt="Image"
              />

              <p className="mb-2 mx-1 overflow-y-scroll max-h-15 text-sm font-medium no-scrollbar">
                {post.content}
              </p>
              <button className="bg-[#2E2BDF] rounded-lg m-auto p-2 font-bold text-white w-full">
                View More
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Mucyo work */}
      <div>
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
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
      >
        &#8592;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
      >
        &#8594;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
            </div>
    </div>
  );
};

export default LinkerComponent;
