import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ShimmerEffectProfile from './ShimmerEffectProfile';
import LoadingSpinner from './LoadingSpinner';

function ProfilePage() {
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [storiesCount, setStoriesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        // Fetch profile data
        const profileResponse = await axios.get('http://127.0.0.1:8000/api/user-profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProfileData(profileResponse.data);

        // Fetch all stories
        const storiesResponse = await axios.get('http://127.0.0.1:8000/api/stories/');
        const stories = storiesResponse.data;

        // Calculate the number of stories created by the user
        const userStoriesCount = stories.filter(story => story.created_by.username === profileResponse.data.username).length;
        setStoriesCount(userStoriesCount);
        

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = (e) => {
    if (isEditing) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true); // Show the updating modal

      const formData = new FormData();
      formData.append('full_name', profileData.full_name);
      formData.append('comp_name', profileData.comp_name);
      formData.append('bio', profileData.bio);
      if (profileImage) {
        formData.append('image', fileInputRef.current.files[0]);
      }

      const accessToken = localStorage.getItem('accessToken');

      await axios.put('http://127.0.0.1:8000/api/user-profile/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const profileResponse = await axios.get('http://127.0.0.1:8000/api/user-profile/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProfileData(profileResponse.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
    } finally {
      setIsUpdating(false); // Hide the updating modal
    }
  };

  if (loading) {
    return <ShimmerEffectProfile />;
  }

  if (error) {
    navigate('/login');
    return null;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="relative max-w-5xl mx-auto">
        <button
          className="absolute top-4 right-4 text-blue-500"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaEdit className="text-2xl" />
          )}
        </button>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 text-center">
          <div
            className={`w-32 h-32 mx-auto rounded-full bg-gray-700 cursor-pointer relative ${isEditing ? 'border-2 border-blue-500' : ''}`}
            onClick={handleImageClick}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : profileData?.image ? (
              <img
                src={`http://127.0.0.1:8000${profileData.image}`}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <img
                src="./profile.jpg"
                alt="Default Logo"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
          {isEditing && (
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          )}

          {isEditing ? (
            <form onSubmit={handleProfileUpdate} className="mt-4">
              <input
                type="text"
                value={profileData.full_name || ''}
                onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                placeholder="Full Name"
                className="border border-gray-700 p-2 rounded mb-2 w-full bg-gray-900 text-white"
              />
              <input
                type="text"
                value={profileData.comp_name || ''}
                onChange={(e) => setProfileData({ ...profileData, comp_name: e.target.value })}
                placeholder="Company Name"
                className="border border-gray-700 p-2 rounded mb-2 w-full bg-gray-900 text-white"
              />
              <textarea
                value={profileData.bio || ''}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Bio"
                className="border border-gray-700 p-2 rounded mb-2 w-full bg-gray-900 text-white"
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Profile</button>
            </form>
          ) : (
            <>
              <h1 className="text-3xl font-bold mt-4">{profileData.full_name || 'John Doe'}</h1>
              <p className="text-xl text-[#D388F8]">{profileData.comp_name || 'TalesTogether Inc.'}</p>
              <p className="text-md mb-4">{profileData.bio || 'Creative writer, passionate about collaborative storytelling!'}</p>
            </>
          )}
        </div>

        <section className="bg-gray-900 text-white py-2 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#D388F8] mb-6">Your Contributions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 bg-opacity-80">
                <h3 className="text-2xl font-semibold text-[#FFEF20] mb-2">Stories Created</h3>
                <p className="text-4xl font-bold text-[#FFEF20] mb-1">{storiesCount}</p>
                <p className="text-lg text-white">stories have been created by you!</p>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 bg-opacity-80">
                <h3 className="text-2xl font-semibold text-[#FFEF20] mb-4">Stories Contributed To</h3>
                <p className="text-md text-gray-400">
                  We are currently working on enhancing this feature. Stay tuned for updates, as this functionality will be available soon to display the stories you have contributed to.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Start Your Story Section */}
        <section className="bg-gray-800 text-white py-10 px-6 mt-10 rounded-lg shadow-lg text-center">
          <h2 className="text-4xl font-bold text-[#D388F8] mb-6">Start Your Own Story</h2>
          <p className="text-lg text-gray-300 mb-6">
            Every story begins with a single step. Share your creative thoughts, collaborate with others, or build your own masterpiece. Ready to begin?
          </p>
          <button
            onClick={() => navigate('/newstory')}
            className="bg-[#FFEF20] text-black py-2 px-6 rounded-full text-lg font-bold hover:bg-[#ffb8ff] transition-all duration-300"
          >
            Upload Your Story
          </button>
        </section>
      </div>

      {/* Modal for image preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative w-4/5 h-4/5 bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center bg-opacity-85">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-white"
              onClick={closeModal}
            >
              <FaTimes size={24} />
            </button>
            <img
              src={profileImage || `http://127.0.0.1:8000${profileData.image}`}
              alt="Profile Preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Loading spinner during profile update */}
      {isUpdating && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 text-black p-8 rounded-lg shadow-lg flex flex-col items-center">
            <LoadingSpinner />
            <p className="text-lg mt-4 text-[#FFEF20]">Profile is updating...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
