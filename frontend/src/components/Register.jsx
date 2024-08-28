import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post('http://localhost:8000/register/', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        password2: formData.password2,
      });
      setSuccess('Registration successful! Please log in.');
      setErrors(null);
      setShowSuccessPopup(true); // Show success popup
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ non_field_errors: 'An unexpected error occurred' });
      }
      setSuccess('');
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-black text-[#387F39] sticky top-0 z-10 shadow-custom-light">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-purple-500">TalesTogether</div>
          </div>

          <div className="hidden md:flex flex-grow justify-center space-x-10">
            <Link to="/" className="text-white hover:text-green-400">Home</Link>
            <Link to="/about" className="text-white hover:text-green-400">About</Link>
            <Link to="/contact" className="text-white hover:text-green-400">Contact</Link>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-black text-white p-4">
            <Link to="/" className="block py-2">Home</Link>
            <Link to="/about" className="block py-2">About</Link>
            <Link to="/contact" className="block py-2">Contact</Link>
          </div>
        )}
      </nav>

      <div className='flex items-center justify-center mt-6'>
        <section className="w-full sm:w-2/4 bg-gray-800 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img
                src="./log.jpeg"
                alt="register"
                className="w-full h-full object-cover rounded-t-lg md:rounded-tr-none md:rounded-l-lg"
              />
            </div>
            <div className="w-full md:w-1/2 p-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-[#D388F8]">Join Us!</h2>
                <p className="text-lg text-white mt-2">Create your TalesTogether account.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-white mb-1">Email address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-white mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                  />
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="password" className="block text-white mb-1">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[51px] transform -translate-y-1/2 text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="password2" className="block text-white mb-1">Confirm Password</label>
                  <input
                    type={showPassword2 ? 'text' : 'password'}
                    id="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[51px] transform -translate-y-1/2 text-white"
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors && (
                  <div className="mb-4 text-red-500">
                    {Object.values(errors).map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
                {success && (
                  <div className="mb-4 text-green-500">
                    {success}
                  </div>
                )}
                <div className="mb-4">
                  <button
                    type="submit"
                    className="w-full bg-[#FFEF20] text-black py-2 px-4 rounded-lg font-semibold hover:bg-[#E86B00]"
                  >
                    Register
                  </button>
                </div>
                <div className="text-center text-white">
                  <p>Already have an account? <Link to="/login" className="text-[#D388F8] hover:underline">Login Now</Link></p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 text-black p-8 rounded-lg shadow-lg flex flex-col items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-[#FFEF20] rounded-full" role="status">
            </div>
            <p className="text-lg mt-4 text-[#FFEF20]">Registration is ongoing...</p>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Registration Successful!</h3>
            <p className="mb-4">Your registration was successful. You can now log in to your account.</p>
            <Link
              to="/login"
              className="bg-[#FFEF20] text-black py-2 px-4 rounded-lg font-semibold hover:bg-[#E86B00]"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
