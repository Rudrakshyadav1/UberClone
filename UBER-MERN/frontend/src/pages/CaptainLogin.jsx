import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    const credentials = { email, password };
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + '/captain/login',
        credentials
      );
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.user);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setErrorMessage('Login failed. Please check your credentials.');
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 p-7 flex flex-col">
      <div className="mb-3 pt-6">
        <img
          className="w-24"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber logo"
        />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 rounded">
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold mb-2">What's your email?</h3>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <h3 className="text-xl font-semibold mb-2">Enter Password:</h3>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-black mb-4 text-white text-base font-medium rounded px-4 py-2 w-full hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          {/* Display error message */}
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2 text-center">
              {errorMessage}
            </div>
          )}

          <p className="text-center text-sm mt-4">
            New here?{' '}
            <Link to="/captain-signup" className="text-blue-600 hover:underline">
              Create New Account
            </Link>
          </p>
        </div>

        <Link
          to="/login"
          className="mt-6 bg-green-600 flex items-center justify-center text-white text-base font-medium rounded px-6 py-3 w-full max-w-md hover:bg-green-700 transition"
        >
          Sign in As User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;