import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center px-5">
          {/* Contact Information */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2 text-[#D388F8]">TalesTogether</h2>
            <p className="mb-2">Dwark, Delhi, India - Pincode 110043</p>
            <p className="mb-2">Email: rahulkumar1813111034@gmail.com</p>
            <p>Phone: (123) 456-7890</p> {/* Placeholder phone number */}
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2 text-[#D388F8]">Quick Links</h2>
            <ul className='space-y-2'>
              <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
              <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
              <li><Link to="/privacypolicy" className="hover:text-gray-400">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2 text-[#D388F8]">Follow Us</h2>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D388F8] transition duration-300">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D388F8] transition duration-300">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D388F8] transition duration-300">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D388F8] transition duration-300">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center mt-4">
        <p className="text-sm text-[#D388F8]">&copy; {new Date().getFullYear()} TalesTogether. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
