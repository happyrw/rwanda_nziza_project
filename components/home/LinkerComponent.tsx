"use client";
import { events, journey } from "@/constant";
import Image from "next/image";
import React, { useRef } from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const LinkerComponent = () => {

  const elementRef = useRef(null);

  const slideRight = (element: any) => {
    element.scrollLeft += 500;
  };

  const slideLeft = (element: any) => {
    element.scrollLeft -= 500;
  };

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
    </div>
  );
};

export default LinkerComponent;
