import React, { useContext, useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ThreeDots } from 'react-loader-spinner'
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import useAllCat from '../../CustomHooks/useAllCat';
import { mywishlistContext } from '../../Contexts/WishlistContext';

export default function Home() {
  const {data, isError, isLoading, error} = useAllCat()
  const {getWishlist} = useContext(mywishlistContext);
  useEffect(()=>{
    getWishlist();
  },[])
  if (isError) {
    return <>
      <div className='flex justify-center items-center'>
        <h1>Error displaying data</h1>
        <h3>{error.message}</h3>
      </div>
    </>
  }
  if (isLoading) {
    return <>
      <div className='flex justify-center'>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  }
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  }
  return (
    <div className='px-9 py-14 flex flex-col justify-center'>
      <div className='flex justify-center h-[300px]'>
        <div className='w-2/3'>
          <img src={img1} className='w-full h-full' alt="freshCart" />
        </div>
        <div className='w-1/3'>
          <div className='h-[50%]'><img src={img2} className='w-full h-full' alt="freshCArt" /></div>
          <div className='h-[50%]'><img src={img3} className='w-full h-full' alt="freshCArt" /></div>
        </div>
      </div>
      <div className="slider-container w-full mt-3">
        <Slider {...settings}>
          {data.data.data.map((cat) => {
            return <div className='px-3'>
              <div key={cat._id} className=''>
                <div className=' h-1/4'>
                  <img src={cat.image} className='w-full h-64' alt={cat.name} />
                </div>
                <h3 className='text-center font-semibold text-lg'>{cat.name}</h3>
              </div>
            </div>
          })}
        </Slider>
      </div>
    </div>
  );
}
