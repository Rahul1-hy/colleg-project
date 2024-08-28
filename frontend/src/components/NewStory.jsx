import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NewStory = () => {
  const [photo, setPhoto] = useState(null);
  const [heading, setHeading] = useState('');
  const [story, setStory] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility
  const [popupMessage, setPopupMessage] = useState(''); // State for pop-up message
  const [storyId, setStoryId] = useState(null); // State for uploaded story ID

  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', heading);
    formData.append('description', story);
    if (photo) {
      formData.append('image', photo);
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setPopupMessage('Please log in to upload a story.'); // Update message for the pop-up
        setShowPopup(true); // Show pop-up if not logged in
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/stories/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setStoryId(response.data.id); // Set story ID from response
      setSuccess('Story uploaded successfully!');
      setError(null); // Clear any previous errors
      setPopupMessage('Your story has been uploaded successfully!');
      setShowPopup(true); // Show success pop-up
    } catch (err) {
      setPopupMessage('Failed to upload story. Please try again.'); // Update message for the pop-up
      setShowPopup(true); // Show pop-up on error
      setSuccess(null); // Clear any previous success messages
      console.error('Error response:', err.response ? err.response.data : err.message);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (success && storyId) {
      navigate(`/story/${storyId}`); // Redirect to StoryDetail page with the uploaded story ID
    }
  };

  return (
    <section className="bg-gray-900 text-white min-h-screen p-10">
      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-700">
          {/* Photo Upload Section */}
          <div className="mb-6">
            <div className="relative w-full">
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <img
                src={photo ? URL.createObjectURL(photo) : 'https://via.placeholder.com/800x400.png?text=Your+Story+Image'}
                alt="Story preview"
                className="w-full h-60 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col">
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="heading">
                Heading
              </label>
              <input
                type="text"
                id="heading"
                className="border border-gray-500 p-3 w-full rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D388F8] transition duration-300"
                placeholder="Enter story heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="story">
                Your Story
              </label>
              <textarea
                id="story"
                className="border border-gray-500 p-3 w-full h-48 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D388F8] transition duration-300"
                placeholder="Write your story here..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#D388F8] text-black py-2 px-6 rounded-lg hover:bg-[#a565d1] transition duration-300 shadow-md"
              >
                Upload
              </button>
            </div>
          </div>
        </form>
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}

        {/* Pop-Up Modal */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg relative max-w-md mx-auto">
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 text-black text-3xl font-bold rounded-full w-10 h-10 flex items-center justify-center"
                title="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">{popupMessage}</h2>
              {success && (
                <button
                  onClick={handleClosePopup}
                  className="bg-[#D388F8] text-black py-2 px-4 rounded-lg font-semibold hover:bg-[#a565d1]"
                >
                  Read Your Story
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewStory;
