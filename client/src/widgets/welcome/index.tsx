'use client';

import WelcomeImage from "../../../public/assets/clothers-home.png"
import Image from 'next/image';
import React from 'react';

const Welcome = () => {

  return (
    <div className='min-h-[calc(100vh-67px)] bg-gray-100'>
      <div className='custom-container flex items-center gap-5'>
        <div className='flex-1 flex flex-col items-start gap-5'>
          <h1 className='text-8xl font-bold'>FIND CLOSERS THAT MATCHES YOUR STYLE</h1>
          <p className='w-[600px] text-gray-500'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <button className='py-3 px-10 bg-black cursor-pointer text-white rounded-full'>Shop Now</button>

          <div className='w-full flex items-center justify-between mt-3'>
            <div>
              <h1 className='font-bold text-2xl'>200+</h1>
              <p>Internatinal Brands</p>
            </div>

            <div className='w-[2px] h-16 bg-gray-500'></div>

            <div>
              <h1 className='font-bold text-2xl'>2000+</h1>
              <p>High Quality Products</p>
            </div>

            <div className='w-[2px] h-16 bg-gray-500'></div>

            <div>
              <h1 className='font-bold text-2xl'>30.000+</h1>
              <p>Happy Customers</p>
            </div>

          </div>
        </div>
        <div className='relative h-[calc(100vh-177px)] w-[50%]'>
          <Image src={WelcomeImage.src} className='object-contain' fill alt='Welcome Image' />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
