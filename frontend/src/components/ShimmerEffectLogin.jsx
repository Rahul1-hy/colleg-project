import React from 'react';

const ShimmerEffectLogin = () => (
  <div className="w-full min-h-screen bg-black flex flex-col items-center justify-start">
    {/* Shimmer Navbar */}
    <div className="w-full bg-gray-800 p-4 shadow-custom-light animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-32 h-8 bg-gray-700 rounded"></div>
        <div className="flex space-x-4">
          <div className="w-20 h-6 bg-gray-700 rounded"></div>
          <div className="w-20 h-6 bg-gray-700 rounded"></div>
          <div className="w-20 h-6 bg-gray-700 rounded"></div>
        </div>
        <div className="w-20 h-8 bg-gray-700 rounded"></div>
      </div>
    </div>

    {/* Main Shimmer Content */}
    <div className="flex-grow w-full flex items-center justify-center">
      <div className="w-full max-w-[1200px] bg-gray-800 rounded-lg p-6">
        <div className="flex h-[350px] flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 flex flex-col mb-6 md:mb-0">
            <div className="w-full h-8 bg-gray-700 mb-4 animate-pulse"></div>
            <div className="w-full h-6 bg-gray-700 mb-4 animate-pulse"></div>
            <div className="w-full h-6 bg-gray-700 mb-4 animate-pulse"></div>
            <div className="w-full h-10 bg-gray-700 animate-pulse"></div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-[370px] h-[300px] bg-gray-600 overflow-hidden rounded-lg flex items-center justify-center relative">
              <div className="w-full h-full bg-gray-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ShimmerEffectLogin;
