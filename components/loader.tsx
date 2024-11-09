"use client";

import React from 'react'
import { BallTriangle } from 'react-loader-spinner';

const LoaderComponent = () => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-white z-10 flex items-center justify-center'>
            <BallTriangle
                height={70}
                width={70}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default LoaderComponent;
