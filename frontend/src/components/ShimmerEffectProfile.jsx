import React from 'react';

const ShimmerEffectProfile = () => (
  <div className="bg-gray-900 text-white min-h-screen p-8">
    <div className="relative max-w-5xl mx-auto">
      {/* Shimmer Edit Button */}
      <div className="absolute top-4 right-4">
        <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
      </div>

      {/* Shimmer Profile Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 text-center">
        <div className="w-32 h-32 mx-auto rounded-full bg-gray-700 animate-pulse"></div>
        <div className="mt-4">
          <div className="w-40 h-6 bg-gray-700 mx-auto rounded mb-2 animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-700 mx-auto rounded mb-2 animate-pulse"></div>
          <div className="w-60 h-4 bg-gray-700 mx-auto rounded animate-pulse"></div>
        </div>
      </div>

      {/* Shimmer Contributions Section */}
      <section className="bg-gray-900 text-white py-2 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-64 h-8 bg-gray-700 mx-auto rounded mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 bg-opacity-80">
              <div className="w-48 h-6 bg-gray-700 mx-auto rounded mb-4 animate-pulse"></div>
              <div className="w-24 h-10 bg-gray-700 mx-auto rounded mb-2 animate-pulse"></div>
              <div className="w-60 h-4 bg-gray-700 mx-auto rounded animate-pulse"></div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 bg-opacity-80">
              <div className="w-48 h-6 bg-gray-700 mx-auto rounded mb-4 animate-pulse"></div>
              <div className="w-full h-4 bg-gray-700 mx-auto rounded mb-2 animate-pulse"></div>
              <div className="w-full h-4 bg-gray-700 mx-auto rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Shimmer Create/Upload Story Section */}
      <section className="bg-gray-900 text-white py-4 px-6 mb-2">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-64 h-8 bg-gray-700 mx-auto rounded mb-6 animate-pulse"></div>
          <div className="w-80 h-4 bg-gray-700 mx-auto rounded mb-6 animate-pulse"></div>
          <div className="w-40 h-10 bg-gray-700 mx-auto rounded animate-pulse"></div>
        </div>
      </section>
    </div>
  </div>
);

export default ShimmerEffectProfile;
