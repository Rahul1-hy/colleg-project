import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { ReviewData } from '../utils/constant';

function Review() {
  useEffect(() => {
    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
  }, []);

  return (
    <section className="p-10 bg-gray-100 cursor-pointer no-select">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
        Voices from Our Creative Network
        </h2>
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {ReviewData.map((review, index) => (
              <div key={index} className="swiper-slide p-6 bg-white shadow-xl rounded-lg flex flex-col items-center">
                <img 
                  src={review.img} 
                  alt={`Review by ${review.name}`} 
                  className="w-24 h-24 object-cover rounded-full mb-4" 
                />
                <p className="text-sm text-gray-700 mb-4 text-center">{review.text}</p>
                <h5 className="text-[#d683ff] font-semibold mb-1">{review.name}</h5>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}

export default Review;
