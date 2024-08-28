import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Contact() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success pop-up visibility
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State for login pop-up visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setShowLoginPopup(true); // Show login pop-up if not logged in
        return;
      }

      await axios.post(
        'http://127.0.0.1:8000/api/contact/', 
        { subject, message },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFeedback('Your message has been sent successfully!');
      setShowSuccessPopup(true); // Show success pop-up
    } catch (error) {
      setFeedback('An error occurred. Please try again.');
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setShowLoginPopup(false);
  };

  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#D388F8]">Contact Us</h1>
          <p className="text-lg text-gray-400 mt-2 italic">
            "You have the right to perform your duty, but you are not entitled to the fruits of your actions."
          </p>
          <p className="text-lg text-gray-400 mt-2 italic">
            – Lord Krishna
          </p>
          <p className="text-lg text-gray-400 mt-4">
            Reach out with any inquiries, and we’ll get back to you promptly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-300 text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-300 text-sm font-semibold mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white h-32"
            ></textarea>
          </div>
          {/* {feedback && <p className="text-sm text-[#D388F8] mb-4">{feedback}</p>} */}
          <button type="submit" className="bg-[#FFEF20] text-black py-2 px-6 rounded-lg font-semibold hover:bg-[#E86B00]">
            Send Message
          </button>
        </form>

        <div className="text-center mt-12">
          <Link to="/" className="bg-[#FFEF20] text-black py-2 px-6 rounded-lg font-semibold hover:bg-[#E86B00]">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Success Pop-Up Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg relative max-w-md mx-auto">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-black text-3xl font-bold rounded-full w-10 h-10 flex items-center justify-center"
              title="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Success!</h2>
            <p className="mb-4 text-center">Your message has been sent successfully.</p>
            <div className="text-center">
              <Link
                to="/"
                className="bg-[#FFEF20] text-black py-2 px-4 rounded-lg font-semibold hover:bg-[#E86B00]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Login Pop-Up Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg relative max-w-md mx-auto">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-black text-3xl font-bold rounded-full w-10 h-10 flex items-center justify-center"
              title="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
            <p className="mb-4">You are not logged in. Please log in to send a message.</p>
            <Link to="/login" className="bg-[#D388F8] text-black py-2 px-4 rounded-lg font-semibold hover:bg-[#a565d1]">
              Go to Login
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;
