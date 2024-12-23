"use client";
import { slides, Testimonial } from "@/constant";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
      <div className="my-10 px-2 md:px-5">
        <div className="relative w-full h-[500px] mx-auto overflow-hidden rounded-lg shadow-lg mt-4">
          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  currentIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url(${slide.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Text content with tagline */}
                <div
                  className={`bg-black bg-opacity-50 p-6 rounded-lg w-4/5 max-w-xl text-center mx-auto relative top-1/2 transform -translate-y-1/2 ${
                    currentIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="w-36 h-2 bg-[#2E2BDF]" />
                  <h2 className="text-xl md:text-3xl font-bold mb-2 text-white">
                    {slide.text}
                  </h2>
                  <p className="text-sm md:text-lg mb-4 text-white">
                    {slide.tagline}
                  </p>
                  <button className="bg-[#2E2BDF] text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-700 transition-all">
                    Explore
                  </button>
                </div>
              </div>
            ))}
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
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-white" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
      {/* Testimony */}
      <div className="my-10 px-2 md:px-5 ">
        <div className="flex justify-center items-center">
          <h1 className="font-sans font-bold text-2xl text-[#2E2BDF]">
            Testimonial
          </h1>
        </div>

        <div className="flex flex-wrap pt-10 gap-10 justify-center items-center">
          {Testimonial.map((post, index) => (
            <div
              key={index}
              className={`flex items-start w-[500px] h-[300px] text-white rounded-md shadow-lg bg-[#4442d3] ${
                index >= 2 ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Image */}
              <div className="w-[200px] h-full bg-slate-300 overflow-hidden rounded-sm">
                <Image
                  src={post.image}
                  alt={post.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col justify-center">
                <h1 className="text-center font-bold text-[#FAD201]">
                  {post.name}
                </h1>
                <p className="max-w-[250px] text-[12px] mt-4 font-light text-center">
                  {post.testimonial}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MucyoComponent;
