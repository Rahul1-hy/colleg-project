import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function StoryCard({
  id,
  image,
  title,
  excerpt,
  fullStory,
  bgColor = '#FFFFFF',
  headcolor = '#1F2937',
  paracolor = '#4B5563',
  buttoncolor = '#FFEF20',
  hoverColor = '#F59E0B'
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // For handling hover state

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

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

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4" style={{ backgroundColor: bgColor }}>
        <h3 className="text-lg font-bold" style={{ color: headcolor }}>
          {title}
        </h3>
        <p className="mt-2 mb-3" style={{ color: paracolor }}>
          {isExpanded ? fullStory : excerpt}
        </p>
        <Link
          to={`/story/${id}`}
          className="text-black rounded p-1 px-2 mt-5"
          style={{
            backgroundColor: isHovered ? hoverColor : buttoncolor,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default StoryCard;
