import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Banner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Example: Check login status from local storage or context
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // Set isLoggedIn based on token presence
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/newstory'); // Redirect to new story page
    } else {
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <div className="bg-black pb-10">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between p-6 md:p-12">
        <div className="text-left md:w-1/2 w-full mb-6 md:mb-0 sm:mt-0 mt-5">
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold mb-4 text-[#D388F8]">
            Create Stories Together
          </h1>
          <p className="text-lg text-white sm:text-xl mb-6">
            Collaborate with others to craft imaginative tales. Share your creativity and watch your story evolve with each contribution. Begin your storytelling adventure today!
          </p>
          
          <button
            onClick={handleClick}
            className="bg-[#FFEF20] text-black py-1 sm:py-2 px-4 sm:px-4 rounded text-base sm:text-lg font-semibold hover:bg-[#E86B00]"
          >
            Get Started
          </button>

          <p className="mt-4 text-base sm:text-lg text-white">
            ⭐⭐⭐⭐⭐ 4.5 / 5 (<span className='text-[#D388F8]'>Join the storytelling community today</span>)
          </p>
        </div>

        <div className="md:w-1/2 w-full flex justify-center">
          <div className="w-full max-w-[500px] h-[250px] sm:h-[300px] md:h-[350px] bg-gray-300 overflow-hidden rounded-lg flex items-center justify-center relative">
            <img src="./ban.png" className="w-full h-full" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
