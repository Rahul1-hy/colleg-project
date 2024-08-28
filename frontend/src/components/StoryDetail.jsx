import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShimmerEffectProfile from './ShimmerEffectProfile'; // Import the ShimmerEffect component

function StoryDetail() {
  const { id } = useParams();  // Get id from the URL params
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchStory = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/stories/${id}/`);
          if (!response.ok) {
            throw new Error('Story not found');
          }
          const data = await response.json();
          setStory(data);
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchStory();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-10">
      {!story ? (
        <ShimmerEffectProfile /> // Show shimmer effect while data is loading
      ) : (
        <div className="max-w-full sm:max-w-3xl mx-auto bg-gray-800 p-4 sm:p-8 rounded-lg shadow-lg">
          <img 
            src={story.image} 
            alt={story.title} 
            className="w-full h-auto mb-4 sm:mb-6 rounded-lg shadow-md"
          />
          <h1 className="text-3xl sm:text-5xl font-bold text-[#D388F8] mb-4">{story.title}</h1>
          <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">{story.description}</p>
          <div className="text-sm text-gray-400 mt-4 sm:mt-6">
            <p>Written by: <span className="font-semibold">{story.created_by.username}</span></p>
            <p>Published on: <span className="font-semibold">{formatDate(story.created_at)}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryDetail;
