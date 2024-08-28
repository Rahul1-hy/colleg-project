import React from 'react';

const ShimmerEffectStory = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-10">
      <div className="max-w-full sm:max-w-3xl mx-auto bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg">
        <div className="w-full h-60 bg-gray-700 rounded-lg shimmer mb-6"></div>
        <div className="w-3/4 h-8 bg-gray-700 rounded-lg shimmer mb-4"></div>
        <div className="w-full h-4 bg-gray-700 rounded-lg shimmer mb-4"></div>
        <div className="w-1/2 h-4 bg-gray-700 rounded-lg shimmer mb-4"></div>
        <div className="w-full h-4 bg-gray-700 rounded-lg shimmer"></div>
      </div>
    </div>
  );
};

export default ShimmerEffectStory;