import React, { useState, useEffect } from 'react';
import StoryCard from './StoryCard'; // Ensure the path is correct
import ShimmerEffectStoriesList from './ShimmerEffectStoriesList'; // Import the ShimmerEffectStoriesList component

function AllStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/stories/');
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Sort stories by creation date (newest first)
        const sortedStories = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setStories(sortedStories);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <ShimmerEffectStoriesList />; // Show shimmer effect while loading
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="bg-gray-900 text-white min-h-screen py-8">
      <div className="container mx-auto px-6">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#D388F8] mb-2">All Stories</h2>
          <p className="text-lg text-gray-300">Explore our entire collection of enthralling stories and let your imagination soar!</p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.length > 0 ? (
            stories.map((story) => (
              <div key={story.id} className="p-6 rounded-lg">
                <StoryCard
                  id={story.id}
                  image={story.image || 'default-image.jpg'}
                  title={story.title}
                  excerpt={story.description.substring(0, 100) + '...'}
                  fullStory={story.description}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No stories available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllStories;
