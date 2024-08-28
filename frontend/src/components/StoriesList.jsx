import React, { useState, useEffect } from 'react';
import StoryCard from './StoryCard'; // Ensure the path is correct
import ShimmerEffectStoriesList from './ShimmerEffectStoriesList'; // Import the ShimmerEffectStoriesList component
import { Link } from 'react-router-dom';

function StoriesList() {
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
        
        // Get only the top 6 stories
        const latestStories = sortedStories.slice(0, 6);

        setStories(latestStories);
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
    <div className="bg-gray-200 py-8">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-purple-600">Explore Our Stories</h2>
          <p className="text-lg text-gray-600 mt-2">Dive into our collection of captivating stories and enjoy the adventure!</p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.length > 0 ? (
            stories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id} // Pass the id here
                image={story.image || 'default-image.jpg'}
                title={story.title}
                excerpt={story.description.substring(0, 100) + '...'}
                fullStory={story.description}
              />
            ))
          ) : (
            <p>No stories available</p>
          )}
        </div>

        {/* Button to See All Stories */}
        <div className="text-center mt-8">
          <Link to="/allstory" className="bg-purple-500 text-black py-2 px-6 rounded-lg font-semibold hover:bg-purple-600">
            See All Stories
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StoriesList;
