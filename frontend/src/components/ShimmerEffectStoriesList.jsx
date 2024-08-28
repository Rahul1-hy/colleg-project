import React from 'react';

const ShimmerEffectStoriesList = () => {
  return (
    <div className="bg-gray-200 p-4">
      <div className="flex flex-wrap">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-2">
            <div className="bg-gray-300 h-60 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-4 mt-2 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-4 mt-2 rounded-md animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerEffectStoriesList;