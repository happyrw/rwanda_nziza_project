import { events, journey } from "@/constant";
import React from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const LinkerComponent = () => {
  return (
    <div>
      <div>
        {/* city Highlights */}
        <div className=" flex flex-col justify-center items-center m-auto ">
          <p className="text-center font-bold ">City Highlights&Events</p>
          <div className="w-40 h-1 bg-[#2E2BDF]" />
        </div>
        {/* cards */}

        <div className="flex flex-wrap items-center justify-center  gap-10 mt-8 ">
          <FaLessThan className="lg:w-10 lg:h-10  text-gray-500" />
          {events.map((post, index) => (
            <div
              key={index}
              className="relative  flex flex-col card border border-gray-400 w-60 rounded-lg shodow-md mb-3 h-[27rem] transform transition duration-300 hover:scale-105 "
            >
              <div className="flex flex-col gap-2  flex-grow">
                <div className='bg-gradient-to-r from-[#2E2BDF] to-white p-6" w-10 h-4 rounded-lg' />
                <div className="text-left m-auto mb-2 text-sm font-medium">
                  <p>{post.Action}</p>
                  <h3>{post.Date}</h3>
                  <h3>{post.location} </h3>
                  <p>{post.partipants}</p>
                  <p>{post.Entrance}</p>
                </div>

                <img
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  src={post.Image}
                  alt="Image"
                />
                <button className="bg-[#2E2BDF] rounded-lg m-auto p-2 mb-2 font-bold text-white">
                  Read More
                </button>
              </div>
            </div>
          ))}
          <FaGreaterThan className="lg:w-10 lg:h-10 text-gray-500" />
        </div>
      </div>

      <div>
        {/* journey through */}
        <div className=" flex flex-col justify-center items-center m-auto ">
          <p className="text-center font-bold ">Journey Through Rwanda</p>
          <div className="w-40 h-1 bg-[#2E2BDF]" />
        </div>
        {/* cards */}
        <div className="flex flex-wrap items-center justify-center gap-10 mt-10 ">
          {journey.map((post, index) => (
            <div
              key={index}
              className="relative  flex flex-col card border border-gray-400 w-60 rounded-lg shodow-md mb-3 h-[27rem] transform transition duration-300 hover:scale-105 "
            >
              <div className="flex flex-col gap-2 text-center flex-grow">
                <img
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  src={post.Image}
                  alt="Image"
                />
                <h3 className="text-xl font-bold mb-2">{post.title} </h3>
                <div className='bg-gradient-to-r from-[#2E2BDF] to-white p-6" w-10 h-4' />
                <p className="mb-2 mx-1 overflow-y-scroll max-h-15 text-sm font-medium">
                  {post.content}
                </p>
                <button className="bg-[#2E2BDF] rounded-lg m-auto p-2 mb-2 font-bold text-white">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkerComponent;
