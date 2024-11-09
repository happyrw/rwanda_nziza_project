"use client"
import { attractions, eventsInRwanda, postToCreateTypes } from '@/lib/constant';
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
    postType: string,
    setPostType: Dispatch<SetStateAction<string>>,
    setShowActivity: Dispatch<SetStateAction<boolean>>,
    event: string,
    setEvent: Dispatch<SetStateAction<string>>,
    setCategory: Dispatch<SetStateAction<string>>,
    Category: string
}

const CategoryComponent = ({
    postType,
    setPostType,
    setShowActivity,
    event,
    setEvent,
    setCategory,
    Category,
}: Props) => {

    return (
        <div className='fixed top-0 z-20 right-0 left-0 bottom-0 bg-black/15 px-3 h-screen overflow-y-auto'>
            <div className='relative bg-slate-200 shadow-md shadow-black w-full md:w-[800px] p-4 rounded-lg mx-auto mt-10 md:mt-20'>
                {!postType &&
                    <div>
                        <h1 className='text-sm my-3'>Please select a topic to start creating.</h1>
                        <div className='flex items-center flex-wrap justify-start md:justify-center gap-3 mt-10 pb-10'>
                            {postToCreateTypes.map((postToCreateType, index) => {
                                const isActive = postType === postToCreateType.value;
                                return (
                                    <p onClick={() => {
                                        setPostType(postToCreateType.name);
                                        if (postToCreateType.name === "Event" || postToCreateType.name === "Economic Activity") {
                                            setShowActivity(true);
                                        } else {
                                            setShowActivity(false);
                                        }
                                    }} key={index} className={`text-sm border-[1px] border-black/15 px-4 py-2 rounded-xl text-nowrap cursor-pointer hover:bg-black/15  hover:scale-105 transition-transform duration-300 ease-linear ${isActive && "bg-black/10"}`}>
                                        {postToCreateType.name}
                                    </p>
                                )
                            })}
                        </div>
                    </div>}

                {postType === "Event" && <div>
                    <h1 className='text-sm my-3'>Choose an event type from the options below.</h1>
                    <div className='flex items-center flex-wrap justify-start md:justify-center gap-3 mt-10 pb-10'>
                        {eventsInRwanda.map((eventInRwanda, index) => {
                            const isActive = event === eventInRwanda.value;
                            return (
                                <p onClick={() => {
                                    setEvent(eventInRwanda.name);
                                    setShowActivity(false);
                                }} key={index} className={`text-sm border-[1px] border-black/15 px-4 py-2 rounded-xl text-nowrap cursor-pointer hover:bg-black/15  hover:scale-105 transition-transform duration-300 ease-linear ${isActive && "bg-black/10"}`}>
                                    {eventInRwanda.name}
                                </p>
                            )
                        })}
                    </div>
                </div>}

                {postType === "Economic Activity" &&
                    <div>
                        <h1 className='text-sm my-3'>Select a category below.</h1>
                        <div className='flex items-center flex-wrap justify-start md:justify-center gap-3 mt-10 pb-10'>
                            {attractions.map((attraction, index) => {
                                const isActive = Category === attraction.value;
                                return (
                                    <p onClick={() => {
                                        setCategory(attraction.name); // Set the category first
                                        setShowActivity(false); // Then hide the activity section
                                    }} key={index} className={`text-sm border-[1px] border-black/15 px-4 py-2 rounded-xl text-nowrap cursor-pointer hover:bg-black/15  hover:scale-105 transition-transform duration-300 ease-linear ${isActive && "bg-black/10"}`}>
                                        {attraction.name}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CategoryComponent;
