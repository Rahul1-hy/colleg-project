import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle mobile menu
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown
  };

  const fetchUserProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user-profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserProfile(response.data);
        setIsLoggedIn(true);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderProfilePicture = () => {
    if (userProfile && userProfile.image) {
      const imageUrl = userProfile.image.startsWith('http') ? userProfile.image : `http://127.0.0.1:8000${userProfile.image}`;
      return <img src={imageUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover" />;
    } else if (userProfile && userProfile.full_name) {
      return <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm">
        {userProfile.full_name.charAt(0)}
      </div>;
    } else {
      return <FaUserCircle size={32} />;
    }
  };

  return (
    <nav className="bg-black text-[#387F39] shadow-custom-light">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-purple-500">TalesTogether</div>
        </div>

        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <Link to="/" className="text-white hover:text-green-400">Home</Link>
          <Link to="/about" href="#about" className="text-white hover:text-green-400">About</Link>
          <Link to="/contact" className="text-white hover:text-green-400">Contact</Link>
        </div>

        <div className="hidden md:flex space-x-4 relative">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 relative focus:outline-none  px-3 py-2 rounded-lg  text-white hover:bg-gray-700 transition duration-200"
              >
                {renderProfilePicture()}
                
              </button>
              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg transition-opacity duration-300 z-20">
                  <Link to="/profile" className="block px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg w-full text-left">Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-[#C8A1E0] text-black py-2 px-4 rounded-lg hover:bg-purple-500 transition duration-200">
                Log in
              </button>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={handleClick} aria-label="Toggle menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black text-white p-4">
          <Link to="/" className="block py-2">Home</Link>
          <Link to="/about" href="#about" className="block py-2">About</Link>
          <Link to="/contact" className="block py-2">Contact</Link>
          <Link to="/profile" className="block py-2">Profile</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="block w-full bg-gray-400 text-black py-2 mt-2 rounded-lg hover:bg-gray-700 hover:text-white transition duration-200">Logout</button>
          ) : (
            <Link to="/login">
              <button className="block w-full bg-[#FFEF20] text-black py-2 mt-2 rounded-lg hover:bg-yellow-400 transition duration-200">Log in</button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;
